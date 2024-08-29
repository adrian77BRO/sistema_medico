export type Cita = {
    id_cita: number;
    id_paciente: number;
    paciente: string;
    fecha: string;
    medico: string;
    estatus: number;
    observaciones: string;
};

export type NuevaCita = {
    id_paciente: number;
    fecha: string;
    observaciones: string;
};

export type EditarCita = {
    fecha: string;
    observaciones: string;
};