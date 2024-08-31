import { Cita } from "./models/Appointment";
import { Paciente } from "./models/Patient";

export type RootStackParamList = {
    Login: undefined;
    Menu: undefined;
    HomeScreen: undefined;
    CalendarScreen: undefined;
    PatientsListScreen: undefined;
    PatientFormScreen: undefined;
    EditPatientScreen: { paciente: Paciente };
    AppointmentsListScreen: undefined;
    AppointmentFormScreen: undefined;
    EditAppointmentScreen: { cita: Cita };
    ConsultsListScreen: undefined;
};