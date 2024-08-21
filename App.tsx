import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StackParamList } from './src/types';
import { RootStackParamList } from './src/rootTypes';

import { HomeScreen } from './src/screens/Home';
import { ProfileScreen } from './src/screens/Profile';
import { CalendarScreen } from './src/screens/Calendar';
import { PatientsScreen } from './src/screens/Patients';
import { PatientFormScreen } from './src/screens/PatientForm';
import { AppointmentsScreen } from './src/screens/Appointments';
import { AppointmentFormScreen } from './src/screens/AppointmentForm';
import { ConsultsScreen } from './src/screens/Consults';
import { ConsultFormScreen } from './src/screens/ConsultForm';
import { LoginScreen } from './src/screens/Login';

const Drawer = createDrawerNavigator<StackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const PatientsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PatientsScreen"
        component={PatientsScreen}
        options={{ title: 'Listado de pacientes' }}
      />
      <Stack.Screen
        name="PatientFormScreen"
        component={PatientFormScreen}
        options={{ title: 'Registrar paciente' }}
      />
    </Stack.Navigator>
  );
};

const AppointmentsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AppointmentsScreen"
        component={AppointmentsScreen}
        options={{ title: 'Listado de citas' }}
      />
      <Stack.Screen
        name="AppointmentFormScreen"
        component={AppointmentFormScreen}
        options={{ title: 'Registrar cita' }}
      />
    </Stack.Navigator>
  );
};

const ConsultsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ConsultsScreen"
        component={ConsultsScreen}
        options={{ title: 'Listado de consultas' }}
      />
      <Stack.Screen
        name="ConsultFormScreen"
        component={ConsultFormScreen}
        options={{ title: 'Registrar consulta' }}
      />
    </Stack.Navigator>
  );
};

const MenuNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Inicio">
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Calendario" component={CalendarScreen} />
      <Drawer.Screen name="Pacientes">
        {() => <PatientsNavigator />}
      </Drawer.Screen>
      <Drawer.Screen name="Citas">
        {() => <AppointmentsNavigator />}
      </Drawer.Screen>
      <Drawer.Screen name="Consultas médicas">
        {() => <ConsultsNavigator />}
      </Drawer.Screen>
      <Drawer.Screen name="Mi perfil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}