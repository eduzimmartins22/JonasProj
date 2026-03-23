import "./global.css"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AppProvider } from "./src/context/AppContext"
import LoginScreen from "./src/screens/LoginScreen"
import BarberScreen from "./src/screens/BarberScreen"
import ClientScreen from "./src/screens/ClienteScreen"
import AdminDashboard from "./src/screens/AdminDashboard"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Barber" component={BarberScreen} />
          <Stack.Screen name="Client" component={ClientScreen} />
          <Stack.Screen name="Admin" component={AdminDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  )
}