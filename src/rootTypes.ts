import { Cita } from "./models/Appointment";
import { Consult } from "./models/Consult";
import { Paciente } from "./models/Patient";

export type RootStackParamList = {
    Login: undefined;
    Menu: undefined;
    PatientsListScreen: undefined;
    PatientFormScreen: undefined;
    EditPatientScreen: { paciente: Paciente };
    AppointmentsListScreen: undefined;
    AppointmentFormScreen: undefined;
    EditAppointmentScreen: { cita: Cita };
    ConsultsScreen: undefined;
    ConsultFormScreen: { onSave: (newConsult: Consult) => void };
};