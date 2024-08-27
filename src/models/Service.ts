export type Servicio = {
    id_servicio: number;
    nombre: string;
    descripcion: string;
    orden: number;
    estatus: number;
    estatus_web: number;
    estatus_sistema: number;
    costo: number;
}

export type NuevoServicio = {
    nombre: string;
    descripcion: string;
    orden: number;
    estatus: number;
    estatus_web: number;
    estatus_sistema: number;
    costo: number;
}