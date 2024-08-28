export type Paciente = {
    id_paciente: number;
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: string;
    direccion: string;
    familiar_responsable: string;
    sexo: number;
    fecha_nacimiento: string;
};

export type NuevoPaciente = {
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: string;
    direccion: string;
    familiar_responsable: string;
    sexo: number;
    fecha_nacimiento: string;
};

export type PacienteInfo = {
    id_paciente: number;
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: string;
    sexo: number;
    fecha_nacimiento: string;
    tipo_sangre: string;
    patologias: string;
    alergias: string
    intervencion_quirurgica: number;
    transfucion_sanguinea: number;
    donacion_sanguinea: number;
}