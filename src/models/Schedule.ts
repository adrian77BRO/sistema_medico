export type Horario = {
    id_horario: number;
    dia: number;
    hora_inicio: string;
    hora_termino: string;
}

export type NuevoHorario = {
    dia: number;
    hora_inicio: string;
    hora_termino: string;
}