export interface Comida {
    id?: string;
    nombre?: string;
    precio?: number;
    photoUrl?: string;
    disponibilidad?: boolean;
    cantidad?: number;
    ingredientes?: string[];
    carritoComidaId?: string;
}