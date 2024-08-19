/*import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackParamList } from './src/rootTypes';

import { HomeScreen } from './src/screens/Home';
import { CalendarScreen } from './src/screens/Calendar';
import { AboutScreen } from './src/screens/About';
import { StackParamList } from './src/types';
import { PatientsScreen } from './src/screens/Patients';

const Drawer = createDrawerNavigator<StackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={HomeScreen} />
        <Drawer.Screen name="Calendario de citas" component={CalendarScreen} />
        <Stack.Screen name="PatientsScreen" component={PatientsScreen} options={{ title: 'Pacientes' }} />
        <Drawer.Screen name="Consultas médicas" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}*/

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StackParamList } from './src/types';
import { RootStackParamList } from './src/rootTypes';

import { HomeScreen } from './src/screens/Home';
import { CalendarScreen } from './src/screens/Calendar';
import { AboutScreen } from './src/screens/About';
import { PatientsScreen } from './src/screens/Patients';
import { PatientFormScreen } from './src/screens/PatientForm';
import { AppointmentsScreen } from './src/screens/Appointments';
import { AppointmentFormScreen } from './src/screens/AppointmentForm';

const Drawer = createDrawerNavigator<StackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const PatientsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PatientsScreen" component={PatientsScreen} options={{ title: 'Listado de pacientes' }} />
      <Stack.Screen name="PatientFormScreen" component={PatientFormScreen} options={{ title: 'Registrar paciente' }} />
    </Stack.Navigator>
  );
};

const AppointmentsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AppointmentsScreen" component={AppointmentsScreen} options={{ title: 'Listado de citas' }} />
      <Stack.Screen name="AppointmentFormScreen" component={AppointmentFormScreen} options={{ title: 'Registrar cita' }} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={HomeScreen} />
        <Drawer.Screen name="Calendario de citas" component={CalendarScreen} />
        <Drawer.Screen name="Pacientes">
          {() => <PatientsNavigator />}
        </Drawer.Screen>
        <Drawer.Screen name="Citas">
          {() => <AppointmentsNavigator />}
        </Drawer.Screen>
        <Drawer.Screen name="Consultas médicas" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}