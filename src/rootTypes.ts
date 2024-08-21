import { Appointment } from "./models/Appointment";
import { Consult } from "./models/Consult";
import { Patient } from "./models/Patient";

export type RootStackParamList = {
    Login: undefined;
    Menu: undefined;
    PatientsScreen: undefined;
    PatientFormScreen: { onSave: (newPatient: Patient) => void };
    AppointmentsScreen: undefined;
    AppointmentFormScreen: { onSave: (newAppointment: Appointment) => void };
    ConsultsScreen: undefined;
    ConsultFormScreen: { onSave: (newConsult: Consult) => void };
};