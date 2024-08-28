export type Historial = {
    id_historial_clinico: number;
    id_tipo_sangre: number;
    intervencion_quirurgica: number;
    transfucion_sanguinea: number;
    donacion_sanguinea: number;
    antecedentes_heredofamiliares: string;
    alergias: string;
    patologias: string;
    observaciones: string;
};

export type HistorialResponse = {
    id_historial_clinico: number;
    id_paciente: number;
    tipo_sangre: string;
    intervencion_quirurgica: number;
    transfucion_sanguinea: number;
    donacion_sanguinea: number;
    antecedentes_heredofamiliares: string;
    alergias: string;
    patologias: string;
    observaciones: string;
};

export type NuevoHistorial = {
    id_tipo_sangre: number;
    intervencion_quirurgica: number;
    transfucion_sanguinea: number;
    donacion_sanguinea: number;
    antecedentes_heredofamiliares: string;
    alergias: string;
    patologias: string;
    observaciones: string;
};