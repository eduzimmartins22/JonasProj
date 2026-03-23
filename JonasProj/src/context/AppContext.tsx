import React, { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export type Service = {
  id: string
  name: string
  total: number
  used: number
}

export type Client = {
  id: string
  numericId: number
  name: string
  cpf: string
  barberId: string
  services: Service[]
  history: string[]
}

export type Barber = {
  id: string
  name: string
  password: string
}

type AppContextType = {
  clients: Client[]
  barbers: Barber[]
  // ADM
  addBarber: (name: string, password: string) => void
  removeBarber: (barberId: string) => void
  // Cabeleireiro
  addClient: (name: string, cpf: string, barberId: string) => void
  addService: (clientId: string, name: string, total: number) => void
  useService: (clientId: string, serviceId: string) => void
  getBarberClients: (barberId: string) => Client[]
  // Cliente
  findClientByCpf: (cpf: string) => Client | undefined
  // Auth
  findBarberByPassword: (password: string) => Barber | undefined
}

export const AppContext = createContext<AppContextType>({} as AppContextType)

const CLIENTS_KEY = "@jonas_clients"
const BARBERS_KEY = "@jonas_barbers"

const DEFAULT_BARBERS: Barber[] = [
  { id: "barber-1", name: "Jonas 1", password: "jonas1" },
  { id: "barber-2", name: "Jonas 2", password: "jonas2" },
]

export const AppProvider = ({ children }: any) => {
  const [clients, setClients] = useState<Client[]>([])
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(CLIENTS_KEY),
      AsyncStorage.getItem(BARBERS_KEY),
    ]).then(([clientsData, barbersData]) => {
      if (clientsData) setClients(JSON.parse(clientsData))
      setBarbers(barbersData ? JSON.parse(barbersData) : DEFAULT_BARBERS)
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(CLIENTS_KEY, JSON.stringify(clients))
  }, [clients, loaded])

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(BARBERS_KEY, JSON.stringify(barbers))
  }, [barbers, loaded])

  const addBarber = (name: string, password: string) => {
    const newBarber: Barber = {
      id: `barber-${Date.now()}`,
      name: name.trim(),
      password: password.trim(),
    }
    setBarbers(prev => [...prev, newBarber])
  }

  const removeBarber = (barberId: string) => {
    setBarbers(prev => prev.filter(b => b.id !== barberId))
  }

  const addClient = (name: string, cpf: string, barberId: string) => {
    setClients(prev => {
      const nextNumericId = prev.length > 0 ? Math.max(...prev.map(c => c.numericId)) + 1 : 1
      const newClient: Client = {
        id: `client-${Date.now()}`,
        numericId: nextNumericId,
        name: name.trim(),
        cpf: cpf.replace(/\D/g, ""),
        barberId,
        services: [],
        history: [],
      }
      return [...prev, newClient]
    })
  }

  const addService = (clientId: string, name: string, total: number) => {
    setClients(prev =>
      prev.map(c => c.id !== clientId ? c : {
        ...c,
        services: [...c.services, { id: `svc-${Date.now()}`, name: name.trim(), total, used: 0 }]
      })
    )
  }

  const useService = (clientId: string, serviceId: string) => {
    setClients(prev =>
      prev.map(c => {
        if (c.id !== clientId) return c
        return {
          ...c,
          services: c.services.map(s =>
            s.id === serviceId && s.used < s.total ? { ...s, used: s.used + 1 } : s
          ),
          history: [...c.history, `Corte em ${new Date().toLocaleDateString("pt-BR")}`]
        }
      })
    )
  }

  const getBarberClients = (barberId: string) =>
    clients.filter(c => c.barberId === barberId)

  const findClientByCpf = (cpf: string) =>
    clients.find(c => c.cpf === cpf.replace(/\D/g, ""))

  const findBarberByPassword = (password: string) =>
    barbers.find(b => b.password === password.trim())

  if (!loaded) return null

  return (
    <AppContext.Provider value={{
      clients, barbers,
      addBarber, removeBarber,
      addClient, addService, useService, getBarberClients,
      findClientByCpf, findBarberByPassword,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)