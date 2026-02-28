<div align="center">

```
 ██████╗  █████╗ ██████╗ ██████╗ ███████╗ █████╗ ██████╗ ██╗ █████╗ 
 ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔══██╗██║██╔══██╗
 ██████╔╝███████║██████╔╝██████╔╝█████╗  ███████║██████╔╝██║███████║
 ██╔══██╗██╔══██║██╔══██╗██╔══██╗██╔══╝  ██╔══██║██╔══██╗██║██╔══██║
 ██████╔╝██║  ██║██║  ██║██████╔╝███████╗██║  ██║██║  ██║██║██║  ██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
```

### ✂️ — Sistema de Gestão para Barbearia — ✂️

[![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-SDK_54-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![AsyncStorage](https://img.shields.io/badge/AsyncStorage-Persistência_Local-F59E0B?style=for-the-badge)](https://react-native-async-storage.github.io)

</div>

---

## 🪒 Sobre o Projeto

**Barbearia Jonas** é um app mobile de gestão de pacotes de corte, desenvolvido para modernizar o controle de clientes e serviços de uma barbearia. Chega de caderninho e planilha — tudo na palma da mão.

> *"Cada corte conta. Cada cliente importa."*

---

## ✨ Funcionalidades

### 👑 Administrador
- Cria e remove cabeleireiros do sistema
- Visualiza **dashboard completo** com métricas gerais
- Monitora clientes e cortes de cada cabeleireiro

### ✂️ Cabeleireiro
- Acesso individual por senha
- Cadastra seus próprios clientes (nome + CPF)
- Cria **pacotes de corte** personalizados (ex: *10 cortes*)
- Registra cada corte com 1 clique — barra de progresso atualiza em tempo real

### 👤 Cliente
- Acessa com seu **CPF**
- Visualiza seu **ID numérico** exclusivo
- Acompanha todos os pacotes ativos com progresso visual
- Histórico de cortes realizados

---

## 🗂️ Estrutura de Telas

```
📱 App
│
├── 🔐 Login
│   ├── 👤 Acesso Cliente    → CPF
│   ├── ✂️  Acesso Cabeleireiro → Senha individual
│   └── 🔒 Administração     → Senha master
│
├── 👑 Admin Dashboard
│   ├── Métricas gerais
│   ├── Cadastrar cabeleireiros
│   └── Visualizar clientes por cabeleireiro
│
├── ✂️  Painel do Cabeleireiro
│   ├── Lista de clientes com badge #ID
│   ├── Cadastrar novo cliente
│   ├── Adicionar pacote de cortes
│   └── ✂️ Registrar corte → desconta 1 do pacote
│
└── 👤 Tela do Cliente
    ├── Badge com ID numérico
    ├── Pacotes ativos (barra de progresso + pontos visuais)
    └── Histórico de pacotes concluídos
```

---

## 🚀 Como Rodar

### Pré-requisitos

```bash
node >= 20
npm >= 10
expo-cli
```

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/barbearia-jonas.git
cd barbearia-jonas

# Instale as dependências
npm install --legacy-peer-deps

# Inicie o projeto
npx expo start --clear
```

### Rodando no dispositivo

```bash
# Android
npx expo run:android

# iOS
npx expo run:ios

# Web
npx expo start --web
```

---

## 🔑 Senhas Padrão

| Perfil | Senha |
|--------|-------|
| 👑 Administrador | `adm123` |
| ✂️ Jonas 1 | `jonas1` |
| ✂️ Jonas 2 | `jonas2` |

> ⚠️ Senhas podem ser alteradas pelo administrador diretamente no app.

---

## 🧱 Stack Técnica

| Tecnologia | Uso |
|-----------|-----|
| **React Native 0.76** | Framework mobile |
| **Expo SDK 54** | Plataforma de desenvolvimento |
| **TypeScript** | Tipagem estática |
| **AsyncStorage** | Persistência local de dados |
| **React Navigation** | Navegação entre telas |
| **StyleSheet API** | Estilização nativa (sem CSS externo) |

---

## 📁 Estrutura do Projeto

```
barbearia-jonas/
│
├── 📄 App.tsx                     # Entry point
├── 📄 babel.config.js
├── 📄 tsconfig.json
│
├── 📂 src/
│   ├── 📂 context/
│   │   └── AppContext.tsx          # Estado global + AsyncStorage
│   │
│   ├── 📂 screens/
│   │   ├── LoginScreen.tsx         # 3 modos de acesso
│   │   ├── AdminDashboard.tsx      # Gestão de cabeleireiros
│   │   ├── BarberScreen.tsx        # Painel do cabeleireiro
│   │   └── ClienteScreen.tsx       # Tela do cliente
│   │
│   ├── 📂 componetes/
│   │   └── ServiceBar.tsx          # Barra de progresso do pacote
│   │
│   └── 📂 types/
│       └── index.ts                # Tipos TypeScript
```

---

## 🎨 Design System

O app utiliza uma paleta **dark premium** inspirada em barbearias de luxo:

```
Background    #09090b  ████  Zinc 950
Surface       #18181b  ████  Zinc 900
Border        #27272a  ████  Zinc 800
Accent        #f59e0b  ████  Amber 500  ← cor principal
Success       #4ade80  ████  Green 400
Info          #60a5fa  ████  Blue 400
```

---

## 🔄 Fluxo de Uso

```
1. ADM cria os cabeleireiros
        ↓
2. Cabeleireiro loga com sua senha
        ↓
3. Cabeleireiro cadastra cliente (nome + CPF)
        ↓
4. Cabeleireiro cria pacote (ex: "10 Cortes")
        ↓
5. Cliente vem cortar → Cabeleireiro clica ✂️ Registrar Corte
        ↓
6. Cliente acompanha o progresso pelo app com seu CPF
        ↓
7. Pacote chega em 10/10 → marcado como ✅ Concluído
```

---

## 💾 Persistência de Dados

Os dados são salvos localmente via **AsyncStorage** e **não se perdem** ao reiniciar o app. As chaves de armazenamento são:

```
@jonas_clients   → lista de clientes e pacotes
@jonas_barbers   → lista de cabeleireiros e senhas
```

---

<div align="center">

---

Feito com ☕ e ✂️ para a **Barbearia Jonas**

*"Estilo não se improvisa. Se gerencia."*

</div>
