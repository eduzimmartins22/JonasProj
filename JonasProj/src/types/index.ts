export type Service = {
  id: string
  name: string
  total: number
  used: number
  special?: boolean
}

export type Client = {
  id: string
  name: string
  cpf: string
  barber: string
  services: Service[]
  history: string[]
}