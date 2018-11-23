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

  usuario: User;

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

  addUser(value){
  
     this.afAuth.auth.createUserWithEmailAndPassword(value.email , value.password)
     .then(user => {
       this.afs.collection("users").doc(user.user.uid).set({
         nombre: value.nombre,
         apellido: value.apellido,
         email: value.email,
         password: value.password,
         uid: user.user.uid,
         admin: false
       })

       this.afs.collection("carritos").doc(user.user.uid).set({

       })

       this.afs.collection("compras").doc(user.user.uid).set({

       })


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

  signIn(value){

    this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password).then((res)=>{
      this.router.navigateByUrl('/menu/home'); 
      
    }).catch(err=> console.error(err.message));
    
  }


}