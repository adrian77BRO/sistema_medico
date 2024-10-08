export type Perfil = {
    municipio: string;
    estado: string;
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: string;
    cedula: string;
    cedula_especialidad: string;
    cedula_subespecialidad: string;
    especialidad: string;
    telefono_urgencias: string;
    whatsapp: string;
    direccion: string;
    facebook: string;
    twitter: string;
    instagram: string;
    web: string;
    sobre_mi: string;
    experiencia: string;
    foto: string;
};

export type NuevoPerfil = {
    correo: string;
    telefono: string;
    telefono_urgencias: string;
    whatsapp: string;
    direccion: string;
    facebook: string;
    twitter: string;
    instagram: string;
    web: string;
    sobre_mi: string;
    experiencia: string;
}