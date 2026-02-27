import React, { useEffect } from "react"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useColorScheme } from "nativewind"
import * as Notifications from "expo-notifications"

import { AppProvider } from "./projeto-tio-jonas/src/context/AppContext"

import LoginScreen from "./projeto-tio-jonas/src/screens/LoginScreen"
import BarberScreen from "./projeto-tio-jonas/src/screens/BarberScreen"
import ClientScreen from "./projeto-tio-jonas/src/screens/ClienteScreen"
import AdminDashboard from "./projeto-tio-jonas/src/screens/AdminDashboard"
import QRScannerScreen from "./projeto-tio-jonas/src/screens/QRScannerScreen"

const Stack = createNativeStackNavigator()

function MainApp() {
  const { colorScheme } = useColorScheme()

  useEffect(() => {
    Notifications.requestPermissionsAsync()
  }, [])

  return (
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Barber" component={BarberScreen} />
        <Stack.Screen name="Client" component={ClientScreen} />
        <Stack.Screen name="Admin" component={AdminDashboard} />
        <Stack.Screen name="Scanner" component={QRScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  )
}