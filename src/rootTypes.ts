import { Appointment } from "./models/Appointment";
import { Consult } from "./models/Consult";
import { Paciente } from "./models/Patient";

export type RootStackParamList = {
    Login: undefined;
    Menu: undefined;
    PatientsListScreen: undefined;
    PatientFormScreen: undefined;
    EditPatientScreen: { paciente: Paciente };
    AppointmentsScreen: undefined;
    AppointmentFormScreen: { onSave: (newAppointment: Appointment) => void };
    ConsultsScreen: undefined;
    ConsultFormScreen: { onSave: (newConsult: Consult) => void };
};