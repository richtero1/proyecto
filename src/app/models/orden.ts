import { Carrito } from "./carrito";

export interface Orden{
    id?: string;
    fecha?: string;
    carrito?: Carrito;
    
    nombre?: string;

}