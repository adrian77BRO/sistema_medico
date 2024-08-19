import { Appointment } from "./models/Appointment";
import { Patient } from "./models/Patient";

export type RootStackParamList = {
    PatientsScreen: undefined;
    PatientFormScreen: { onSave: (newPatient: Patient) => void };
    AppointmentsScreen: undefined;
    AppointmentFormScreen: { onSave: (newAppointment: Appointment) => void };
};