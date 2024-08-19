import { Patient } from "./Patient";

export type Appointment = {
    id: string;
    date: string;
    time: string;
    patient: string;
    doctor: string;
    status: string;
    observations: string;
};