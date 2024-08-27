export type Atencion = {
    id_atencion_medica: number;
    nombre: string;
    descripcion: string;
    sintomas: string;
    causas: string;
    estatus: number;
}

export type NuevaAtencion = {
    nombre: string;
    descripcion: string;
    sintomas: string;
    causas: string;
    estatus: number;
}