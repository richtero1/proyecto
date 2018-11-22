import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

import { User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class AuthService {

  user: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) { 
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      ); console.log(this.user);
    }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    
    return this.oAuthLogin(provider).then(response=>{
      this.router.navigate(['menu/home'])
    })
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }

    return userRef.set(data, { merge: true })

  }

  signOut() {
    this.afAuth.auth.signOut()
   
  }

  addUser(email: string, password: string, nombre: string){
  
     this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user=>{
       user.user.updateProfile({displayName: nombre, photoURL:"null"})
     }).catch(err=> console.log(err.message));

     this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) { 
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    ); console.log(this.user);
     
     
  }

  signIn(email: string, password: string){

    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((res)=>{
      this.router.navigateByUrl('/menu/home'); 
      
    }).catch(err=> console.error(err.message));
    
  }


    ///// Role-based Authorization //////


    canDelete(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }


    // determines if user has matching role
    private checkAuthorization(user: User, allowedRoles: string[]): boolean {
      if (!user) return false
      for (const role of allowedRoles) {
        if ( user.roles[role] ) { 
          return true
    }
  }
  return false
}


}