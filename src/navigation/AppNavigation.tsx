import React from "react"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useColorScheme } from "nativewind"

import LoginScreen from "../screens/LoginScreen"
import BarberScreen from "../screens/BarberScreen"
import ClientScreen from '../screens/ClienteScreen';
import AdminDashboard from "../screens/AdminDashboard"


export type RootStackParamList = {
  Login: undefined
  Barber: undefined
  Client: { id: string }
  Admin: undefined
  Scanner: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigation() {
  const { colorScheme } = useColorScheme()

  return (
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right"
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Barber" component={BarberScreen} />
        <Stack.Screen name="Client" component={ClientScreen} />
        <Stack.Screen name="Admin" component={AdminDashboard} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}