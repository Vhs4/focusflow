# 🎯 FocusFlow - Treinador de Foco Digital

<div align="center">

![FocusFlow](https://img.shields.io/badge/FocusFlow-v1.0.0-0066CC?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Sistema web completo para redução do impacto do uso excessivo de telas através de técnicas de foco consciente, gamificação e intervenções de IA.**

[Demo](#-acesso-demo) • [Documentação](#-documentação) • [Instalação](#-instalação) • [Contribuir](#-contribuindo)

</div>

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Problema e Solução](#-problema-e-solução)
- [Stack Tecnológica](#-stack-tecnológica)
- [Arquitetura](#-arquitetura)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Features Implementadas](#-features-implementadas)
- [Componentes Principais](#-componentes-principais)
- [API e Integração](#-api-e-integração)
- [Modelagem de Dados](#-modelagem-de-dados)
- [Fluxos de Autenticação](#-fluxos-de-autenticação)
- [Integração OpenAI](#-integração-openai)
- [Design System](#-design-system)
- [Guia de Desenvolvimento](#-guia-de-desenvolvimento)
- [Deploy](#-deploy)
- [Testes](#-testes)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Visão Geral

O **FocusFlow** é um ecossistema completo de bem-estar digital desenvolvido para o Hackathon de Saúde 2025. O sistema combina técnicas comprovadas de produtividade (Pomodoro), gamificação saudável e inteligência artificial para ajudar jovens de 18-25 anos a desenvolver uma relação mais consciente com a tecnologia.

### Diferenciais

- ✨ **IA Contextual**: Micro-intervenções personalizadas geradas por GPT-3.5
- 🎮 **Gamificação Saudável**: Sistema de pontos e níveis sem criar ansiedade
- 💬 **Chatbot Cognitivo**: Assistente 24/7 para técnicas de foco
- 📊 **Análise Comportamental**: Insights sobre padrões de consumo digital
- 🌙 **Rotinas de Desligamento**: Higiene do sono personalizada por IA
- 📱 **PWA Ready**: Funciona como app nativo no mobile
- 🎨 **Design Profissional**: Interface limpa com azul tradicional de sistemas

---

## 🔍 Problema e Solução

### Problema Identificado

Baseado em pesquisa com 71 jovens de 18-25 anos:

- **77.5%** relatam dependência digital
- **95.8%** sentem que falta de concentração afeta sua vida
- **52.1%** afirmam que sono ruim afeta muito o foco
- **33.8%** querem aumentar produtividade
- **25.4%** querem focar melhor

### Nossa Solução

O FocusFlow não é apenas um timer Pomodoro. É um **ecossistema de saúde integrativa** que:

1. **Previne**: Alertas preditivos antes de horários de pico de distração
2. **Intervém**: Micro-intervenções contextuais durante o uso
3. **Analisa**: Insights sobre ritmo de consumo e padrões comportamentais
4. **Motiva**: Gamificação que recompensa comportamentos saudáveis
5. **Apoia**: Chatbot com técnicas de mindfulness e respiração
6. **Restaura**: Rotinas de desligamento para melhor qualidade do sono

---

## 🚀 Stack Tecnológica

### Frontend

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Next.js** | 16.0 | Framework React com App Router |
| **React** | 19.2 | Biblioteca UI com Server Components |
| **TypeScript** | 5.0+ | Tipagem estática |
| **Tailwind CSS** | 4.0 | Estilização utility-first |
| **shadcn/ui** | Latest | Componentes UI acessíveis |
| **Framer Motion** | 11.0+ | Animações fluidas |
| **Recharts** | 2.0+ | Gráficos e visualizações |
| **date-fns** | 3.0+ | Manipulação de datas |
| **Lucide React** | Latest | Ícones modernos |

### Backend (Para Implementação)

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **NestJS** | 10.0+ | Framework Node.js |
| **MongoDB** | 7.0+ | Banco de dados NoSQL |
| **Mongoose** | 8.0+ | ODM para MongoDB |
| **JWT** | 9.0+ | Autenticação stateless |
| **bcrypt** | 5.0+ | Hash de senhas |
| **class-validator** | 0.14+ | Validação de DTOs |

### IA e Integrações

| Serviço | Uso |
|---------|-----|
| **OpenAI GPT-3.5** | Micro-intervenções, chatbot, análises |
| **Vercel** | Hospedagem e deploy |
| **MongoDB Atlas** | Banco de dados em nuvem |

---

## 🏗️ Arquitetura

### Arquitetura de Alto Nível

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Landing    │  │  Dashboard   │  │   Profile    │      │
│  │     Page     │  │   + Timer    │  │  Settings    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Challenges  │  │   History    │  │   Wellness   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                    API ROUTES (Next.js)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  LLM Routes  │  │   Chatbot    │  │  Mock Data   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕ API Calls
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND (NestJS)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     Auth     │  │   Sessions   │  │  Challenges  │      │
│  │   Module     │  │    Module    │  │    Module    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     LLM      │  │     Users    │  │Notifications │      │
│  │   Module     │  │    Module    │  │    Module    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                      MONGODB ATLAS                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    users     │  │   sessions   │  │  challenges  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │notifications │  │ achievements │                         │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
                            ↕ API
┌─────────────────────────────────────────────────────────────┐
│                        OPENAI API                            │
│                      GPT-3.5-turbo                           │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Fluxo de Dados

\`\`\`
User Action → React Component → API Route → Backend Service
                                    ↓
                              OpenAI API (se necessário)
                                    ↓
                              MongoDB (persistência)
                                    ↓
                              Response → Component → UI Update
\`\`\`

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18.0+ 
- npm ou yarn
- Git

### Passo a Passo

\`\`\`bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/focusflow.git
cd focusflow

# 2. Instale as dependências
npm install
# ou
yarn install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local

# 4. Execute o servidor de desenvolvimento
npm run dev
# ou
yarn dev

# 5. Abra no navegador
# http://localhost:3000
\`\`\`

### Instalação do Backend (NestJS)

\`\`\`bash
# Em outro diretório
npx @nestjs/cli new focusflow-backend
cd focusflow-backend

# Instale dependências
npm install @nestjs/mongoose mongoose
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install bcrypt class-validator class-transformer
npm install openai

# Configure MongoDB e variáveis de ambiente
# Veja seção "Backend Setup" abaixo
\`\`\`

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

\`\`\`env
# ============================================
# OPENAI (Opcional - sistema funciona com fallbacks)
# ============================================
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx

# ============================================
# BACKEND API (quando implementar NestJS)
# ============================================
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# ============================================
# MONGODB (Backend)
# ============================================
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/focusflow

# ============================================
# JWT (Backend)
# ============================================
JWT_SECRET=seu_secret_super_seguro_aqui_min_32_chars
JWT_EXPIRES_IN=7d

# ============================================
# AMBIENTE
# ============================================
NODE_ENV=development
\`\`\`

### Configuração do OpenAI

1. Crie uma conta em [platform.openai.com](https://platform.openai.com)
2. Gere uma API key em "API Keys"
3. Adicione ao `.env.local`
4. **Nota**: O sistema funciona sem API key usando fallbacks inteligentes

### Configuração do MongoDB

1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster gratuito
3. Configure acesso de rede (IP Whitelist)
4. Obtenha a connection string
5. Adicione ao `.env.local` do backend

---

## 📁 Estrutura do Projeto

\`\`\`
focusflow/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── chatbot/
│   │   │   └── message/
│   │   │       └── route.ts      # Endpoint do chatbot
│   │   └── llm/
│   │       ├── prompt/
│   │       │   └── route.ts      # Micro-intervenções
│   │       ├── sleep-routine/
│   │       │   └── route.ts      # Rotinas de sono
│   │       └── consumption-analysis/
│   │           └── route.ts      # Análise de consumo
│   ├── achievements/
│   │   └── page.tsx              # Página de conquistas
│   ├── challenges/
│   │   └── page.tsx              # Página de desafios
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard principal
│   ├── design-system/
│   │   └── page.tsx              # Documentação do design
│   ├── history/
│   │   └── page.tsx              # Histórico de sessões
│   ├── login/
│   │   └── page.tsx              # Página de login
│   ├── profile/
│   │   └── page.tsx              # Perfil do usuário
│   ├── register/
│   │   └── page.tsx              # Cadastro
│   ├── wellness/
│   │   └── page.tsx              # Bem-estar e saúde
│   ├── layout.tsx                # Layout raiz
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Estilos globais + design tokens
│
├── components/                   # Componentes React
│   ├── chatbot/
│   │   └── cognitive-chatbot.tsx # Chatbot flutuante
│   ├── challenges/
│   │   └── challenges-section.tsx # Lista de desafios
│   ├── dashboard/
│   │   ├── stats-card.tsx        # Cards de estatísticas
│   │   └── level-progress.tsx    # Barra de progresso
│   ├── gamification/
│   │   ├── achievement-badge.tsx # Badges de conquistas
│   │   ├── level-showcase.tsx    # Showcase de níveis
│   │   ├── streak-calendar.tsx   # Calendário de streaks
│   │   └── points-animation.tsx  # Animação de pontos
│   ├── health/
│   │   ├── consumption-report.tsx    # Relatório de consumo
│   │   ├── sleep-routine-generator.tsx # Gerador de rotinas
│   │   └── predictive-alerts.tsx     # Alertas preditivos
│   ├── history/
│   │   ├── session-card.tsx      # Card de sessão
│   │   ├── weekly-chart.tsx      # Gráfico semanal
│   │   └── insights-card.tsx     # Card de insights
│   ├── insights/
│   │   └── consumption-analysis.tsx # Análise de consumo
│   ├── layout/
│   │   ├── header.tsx            # Cabeçalho
│   │   ├── navigation.tsx        # Navegação mobile
│   │   └── sidebar.tsx           # Menu lateral
│   ├── llm/
│   │   └── ai-coach-card.tsx     # Card do coach de IA
│   ├── notifications/
│   │   └── notification-center.tsx # Centro de notificações
│   ├── timer/
│   │   └── pomodoro-timer.tsx    # Timer Pomodoro
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       ├── progress.tsx
│       ├── tabs.tsx
│       ├── dialog.tsx
│       ├── scroll-area.tsx
│       └── ... (outros componentes)
│
├── lib/                          # Utilitários e tipos
│   ├── api.ts                    # Cliente API + Mock Data
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # Funções utilitárias (cn, etc)
│
├── public/                       # Arquivos estáticos
│   ├── manifest.json             # PWA manifest
│   └── icons/                    # Ícones do app
│
├── .env.example                  # Exemplo de variáveis
├── .env.local                    # Variáveis locais (não commitar)
├── next.config.mjs               # Configuração Next.js
├── tailwind.config.ts            # Configuração Tailwind
├── tsconfig.json                 # Configuração TypeScript
├── package.json                  # Dependências
└── README.md                     # Este arquivo
\`\`\`

---

## ✨ Features Implementadas

### 1. Autenticação e Perfil

- ✅ Login com email/senha
- ✅ Cadastro de novos usuários
- ✅ Login automático para demo (contatovhs4@gmail.com)
- ✅ Edição de perfil (nome, email, telefone)
- ✅ Logout seguro
- ✅ Proteção de rotas autenticadas

### 2. Timer Pomodoro Inteligente

- ✅ Timer configurável (25/5/15 minutos)
- ✅ Círculo de progresso animado
- ✅ Micro-intervenções de IA antes de cada sessão
- ✅ Registro automático de sessões
- ✅ Cálculo de pontos por conclusão
- ✅ Estados: idle, running, paused, completed
- ✅ Notificações ao completar

### 3. Sistema de Gamificação

- ✅ 5 níveis de progressão:
  - Iniciante (0-99 pontos)
  - Aprendiz (100-299 pontos)
  - Focado (300-599 pontos)
  - Mestre (600-999 pontos)
  - Zen Master (1000+ pontos)
- ✅ Pontos de Fluxo por sessão completada
- ✅ 12 conquistas desbloqueáveis
- ✅ Sistema de sequências (streaks) diárias
- ✅ Calendário de atividades
- ✅ Animações de ganho de pontos

### 4. Chatbot de Apoio Cognitivo

- ✅ Interface de chat flutuante
- ✅ Integração com OpenAI GPT-3.5
- ✅ Respostas contextuais e motivacionais
- ✅ Técnicas de foco e mindfulness
- ✅ Exercícios de respiração
- ✅ Fallbacks inteligentes sem API key
- ✅ Histórico de conversas
- ✅ Botões de ação rápida

### 5. Desafios de Foco

- ✅ Desafios diários, semanais e mensais
- ✅ Sistema de participação
- ✅ Tracking de progresso
- ✅ Recompensas em pontos
- ✅ Badges de status (ativo, completo, expirado)
- ✅ Contador de participantes

### 6. Análise de Ritmo de Consumo

- ✅ Formulário de auto-reporte
- ✅ Análise de velocidade de consumo
- ✅ Insights gerados por IA
- ✅ Recomendações personalizadas
- ✅ Níveis de risco (baixo, médio, alto)
- ✅ Tendências semanais

### 7. Rotinas de Desligamento

- ✅ Geração de rotinas por IA
- ✅ Baseado em qualidade do sono
- ✅ Cruzamento com uso de telas
- ✅ Dicas de higiene do sono
- ✅ Personalização por contexto
- ✅ Histórico de rotinas

### 8. Alertas Preditivos

- ✅ Análise de padrões de uso
- ✅ Identificação de horários de pico
- ✅ Alertas preventivos empáticos
- ✅ Sugestões de ação
- ✅ Histórico de alertas
- ✅ Configuração de preferências

### 9. Histórico e Analytics

- ✅ Visualização de todas as sessões
- ✅ Gráficos semanais (Recharts)
- ✅ Insights comportamentais
- ✅ Filtros por status
- ✅ Estatísticas agregadas
- ✅ Exportação de dados (futuro)

### 10. Centro de Notificações

- ✅ Lista de notificações
- ✅ Badges de não lidas
- ✅ Tipos: conquistas, desafios, insights, lembretes
- ✅ Marcação de leitura
- ✅ Timestamps relativos
- ✅ Ícones por tipo

### 11. Design System

- ✅ Página de documentação completa
- ✅ Paleta de cores azul tradicional
- ✅ Tipografia (Cal Sans + Inter)
- ✅ Componentes UI documentados
- ✅ Exemplos visuais
- ✅ Código de exemplo
- ✅ Tokens de design

### 12. PWA (Progressive Web App)

- ✅ Manifest.json configurado
- ✅ Ícones para todas as plataformas
- ✅ Instalável no mobile
- ✅ Offline-ready (futuro)
- ✅ Push notifications (futuro)

---

## 🧩 Componentes Principais

### PomodoroTimer

Timer Pomodoro com círculo de progresso animado e integração com IA.

\`\`\`tsx
<PomodoroTimer 
  onSessionComplete={(session) => {
    // Callback ao completar sessão
  }}
/>
\`\`\`

**Props**: Nenhuma (gerencia estado interno)

**Features**:
- Timer configurável (25/5/15 min)
- Círculo SVG animado
- Micro-intervenções antes de iniciar
- Registro automático de sessões
- Cálculo de pontos

### CognitiveChatbot

Chatbot flutuante com IA para técnicas de foco.

\`\`\`tsx
<CognitiveChatbot />
\`\`\`

**Props**: Nenhuma (componente standalone)

**Features**:
- Interface de chat flutuante
- Integração OpenAI
- Botões de ação rápida
- Histórico de mensagens
- Fallbacks inteligentes

### LevelProgress

Barra de progresso de nível com animações.

\`\`\`tsx
<LevelProgress 
  currentPoints={450}
  currentLevel="Focado"
/>
\`\`\`

**Props**:
- `currentPoints`: number
- `currentLevel`: string

### AchievementBadge

Badge de conquista com animação de desbloqueio.

\`\`\`tsx
<AchievementBadge
  achievement={{
    id: "1",
    title: "Primeira Sessão",
    description: "Complete sua primeira sessão",
    icon: "🎯",
    unlocked: true
  }}
/>
\`\`\`

### ConsumptionAnalysis

Análise de ritmo de consumo com insights de IA.

\`\`\`tsx
<ConsumptionAnalysis />
\`\`\`

**Features**:
- Formulário de auto-reporte
- Análise por IA
- Visualização de insights
- Recomendações personalizadas

---

## 🔌 API e Integração

### API Routes (Next.js)

#### POST /api/llm/prompt

Gera micro-intervenção contextual antes de sessão Pomodoro.

**Request**:
\`\`\`json
{
  "context": "Vou estudar matemática"
}
\`\`\`

**Response**:
\`\`\`json
{
  "prompt": "Antes de começar, respire fundo 3 vezes...",
  "fallback": false
}
\`\`\`

#### POST /api/chatbot/message

Envia mensagem para o chatbot cognitivo.

**Request**:
\`\`\`json
{
  "message": "Como posso melhorar meu foco?",
  "history": []
}
\`\`\`

**Response**:
\`\`\`json
{
  "response": "Aqui estão 3 técnicas comprovadas...",
  "fallback": false
}
\`\`\`

#### POST /api/llm/sleep-routine

Gera rotina de desligamento personalizada.

**Request**:
\`\`\`json
{
  "sleepQuality": "ruim",
  "screenTime": 4,
  "bedtime": "23:00"
}
\`\`\`

**Response**:
\`\`\`json
{
  "routine": [
    "21:00 - Desligue notificações",
    "21:30 - Leitura leve",
    "22:00 - Meditação guiada",
    "22:30 - Prepare o ambiente",
    "23:00 - Durma"
  ]
}
\`\`\`

#### GET /api/llm/consumption-analysis

Analisa ritmo de consumo e gera insights.

**Query Params**:
- `videoSpeed`: number (1.0, 1.5, 2.0)
- `skipContent`: boolean
- `multitasking`: boolean

**Response**:
\`\`\`json
{
  "riskLevel": "alto",
  "insights": "Seu ritmo acelerado indica...",
  "recommendations": [
    "Pratique consumo consciente",
    "Reduza velocidade de vídeos"
  ]
}
\`\`\`

### Backend API (NestJS - Para Implementação)

#### Autenticação

\`\`\`typescript
// POST /api/auth/register
{
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

// POST /api/auth/login
{
  email: string;
  password: string;
}
// Response: { accessToken: string, user: User }

// GET /api/users/me
// Headers: Authorization: Bearer <token>
// Response: User

// PUT /api/users/me
{
  fullName?: string;
  phoneNumber?: string;
}
\`\`\`

#### Sessões

\`\`\`typescript
// POST /api/sessions
{
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
  status: "completed" | "interrupted" | "skipped";
  promptUsed?: string;
}

// GET /api/sessions
// Query: ?limit=10&offset=0&status=completed
// Response: Session[]

// GET /api/sessions/stats
// Response: {
//   totalSessions: number;
//   totalMinutes: number;
//   averagePerDay: number;
//   completionRate: number;
// }
\`\`\`

#### Desafios

\`\`\`typescript
// GET /api/challenges
// Response: Challenge[]

// POST /api/challenges/:id/join
// Response: { success: boolean }

// GET /api/challenges/:id/progress
// Response: {
//   current: number;
//   goal: number;
//   percentage: number;
// }
\`\`\`

---

## 💾 Modelagem de Dados

### MongoDB Collections

#### users

\`\`\`javascript
{
  _id: ObjectId,
  fullName: String,           // "Victor Hugo"
  email: String,              // "contatovhs4@gmail.com"
  phoneNumber: String,        // "22999999999"
  password: String,           // Hash bcrypt
  flowPoints: Number,         // 450
  currentLevel: String,       // "Focado"
  streakDays: Number,         // 7
  lastActiveDate: Date,       // 2025-01-15
  preferences: {
    pomodoroMinutes: Number,  // 25
    shortBreakMinutes: Number,// 5
    longBreakMinutes: Number, // 15
    notificationsEnabled: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

**Índices**:
- `email` (unique)
- `createdAt`

#### sessions

\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId,           // Ref: users
  startTime: Date,            // 2025-01-15T14:00:00Z
  endTime: Date,              // 2025-01-15T14:25:00Z
  durationMinutes: Number,    // 25
  status: String,             // "completed" | "interrupted" | "skipped"
  pointsEarned: Number,       // 25
  promptUsed: String,         // "Antes de começar..."
  tags: [String],             // ["estudo", "trabalho"]
  createdAt: Date
}
\`\`\`

**Índices**:
- `userId` + `createdAt` (compound)
- `status`

#### challenges

\`\`\`javascript
{
  _id: ObjectId,
  title: String,              // "Maratona de Foco"
  description: String,        // "Complete 10 sessões esta semana"
  type: String,               // "daily" | "weekly" | "monthly"
  goal: Number,               // 10
  reward: Number,             // 100 pontos
  participants: [ObjectId],   // Refs: users
  progress: [{
    userId: ObjectId,
    current: Number,
    completedAt: Date
  }],
  startsAt: Date,
  endsAt: Date,
  createdAt: Date
}
\`\`\`

**Índices**:
- `type` + `endsAt`
- `participants`

#### achievements

\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId,           // Ref: users
  achievementId: String,      // "first_session"
  title: String,              // "Primeira Sessão"
  description: String,
  icon: String,               // "🎯"
  unlockedAt: Date,
  createdAt: Date
}
\`\`\`

**Índices**:
- `userId` + `achievementId` (compound, unique)

#### notifications

\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId,           // Ref: users
  type: String,               // "achievement" | "reminder" | "challenge" | "insight"
  title: String,              // "Nova Conquista!"
  message: String,            // "Você desbloqueou..."
  isRead: Boolean,            // false
  metadata: Object,           // Dados adicionais
  createdAt: Date
}
\`\`\`

**Índices**:
- `userId` + `isRead` + `createdAt` (compound)

---

## 🔐 Fluxos de Autenticação

### Registro de Usuário

\`\`\`
1. User preenche formulário (/register)
   ↓
2. Frontend valida dados
   ↓
3. POST /api/auth/register
   ↓
4. Backend valida email único
   ↓
5. Hash da senha com bcrypt (10 rounds)
   ↓
6. Salva no MongoDB
   ↓
7. Gera JWT token
   ↓
8. Retorna { accessToken, user }
   ↓
9. Frontend salva token no localStorage
   ↓
10. Redirect para /dashboard
\`\`\`

### Login

\`\`\`
1. User preenche email/senha (/login)
   ↓
2. POST /api/auth/login
   ↓
3. Backend busca user por email
   ↓
4. Compara senha com bcrypt.compare()
   ↓
5. Se válido, gera JWT token
   ↓
6. Retorna { accessToken, user }
   ↓
7. Frontend salva token no localStorage
   ↓
8. Redirect para /dashboard
\`\`\`

### Autenticação de Requisições

\`\`\`
1. Frontend faz requisição
   ↓
2. Adiciona header: Authorization: Bearer <token>
   ↓
3. Backend middleware valida JWT
   ↓
4. Extrai userId do token
   ↓
5. Anexa user ao request
   ↓
6. Controller acessa req.user
\`\`\`

### Logout

\`\`\`
1. User clica em "Sair"
   ↓
2. Frontend remove token do localStorage
   ↓
3. Redirect para /login
   ↓
4. (Opcional) Backend adiciona token à blacklist
\`\`\`

---

## 🤖 Integração OpenAI

### Configuração

\`\`\`typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
\`\`\`

### Micro-Intervenções

\`\`\`typescript
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: `Você é um coach de foco digital. 
                Gere uma micro-intervenção curta (2-3 frases) 
                para ajudar o usuário a se preparar mentalmente 
                antes de uma sessão de foco.`
    },
    {
      role: "user",
      content: `Contexto: ${context}`
    }
  ],
  max_tokens: 150,
  temperature: 0.7,
});

const prompt = completion.choices[0].message.content;
\`\`\`

### Chatbot Cognitivo

\`\`\`typescript
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: `Você é um assistente de bem-estar digital 
                especializado em técnicas de foco, mindfulness 
                e produtividade. Seja empático, motivacional 
                e prático.`
    },
    ...history,
    {
      role: "user",
      content: message
    }
  ],
  max_tokens: 300,
  temperature: 0.8,
});
\`\`\`

### Análise de Consumo

\`\`\`typescript
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: `Analise o comportamento de consumo digital 
                e gere insights sobre o ritmo de consumo.`
    },
    {
      role: "user",
      content: `Velocidade de vídeos: ${videoSpeed}x
                Pula conteúdo: ${skipContent}
                Multitasking: ${multitasking}`
    }
  ],
  max_tokens: 200,
});
\`\`\`

### Fallbacks Inteligentes

Quando a API key não está configurada ou há erro:

\`\`\`typescript
const fallbacks = {
  prompt: [
    "Respire fundo 3 vezes antes de começar.",
    "Elimine distrações do seu ambiente.",
    "Defina uma intenção clara para esta sessão."
  ],
  chatbot: {
    "foco": "Técnica Pomodoro: 25 min foco + 5 min pausa.",
    "respiração": "Respire: 4 segundos inspirar, 7 segurar, 8 expirar.",
    "mindfulness": "Observe seus pensamentos sem julgamento."
  }
};
\`\`\`

---

## 🎨 Design System

### Paleta de Cores

\`\`\`css
/* Cores Primárias */
--primary: #0066CC;           /* Azul tradicional */
--primary-hover: #0052A3;     /* Azul hover */
--primary-dark: #003D82;      /* Azul escuro */

/* Cores Secundárias */
--secondary: #10b981;         /* Verde - crescimento */
--accent: #f59e0b;            /* Âmbar - energia */

/* Cores de Feedback */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;

/* Cores Neutras */
--background: #ffffff;
--foreground: #0a0a0a;
--muted: #f5f5f5;
--muted-foreground: #737373;
--border: #e5e5e5;
\`\`\`

### Tipografia

\`\`\`css
/* Fontes */
--font-sans: 'Inter', sans-serif;
--font-display: 'Cal Sans', sans-serif;

/* Tamanhos */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Pesos */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
\`\`\`

### Espaçamento

\`\`\`css
/* Escala de espaçamento (Tailwind) */
0.5 = 2px
1   = 4px
2   = 8px
3   = 12px
4   = 16px
5   = 20px
6   = 24px
8   = 32px
10  = 40px
12  = 48px
16  = 64px
20  = 80px
24  = 96px
\`\`\`

### Componentes

Veja a página `/design-system` para exemplos visuais completos de:
- Botões (primary, secondary, outline, ghost)
- Cards (default, hover, interactive)
- Inputs (text, email, password)
- Badges (default, success, warning, error)
- Progress bars
- Tabs
- Dialogs
- Tooltips

---

## 👨‍💻 Guia de Desenvolvimento

### Convenções de Código

#### Nomenclatura

\`\`\`typescript
// Componentes: PascalCase
export function PomodoroTimer() {}

// Funções: camelCase
export function calculatePoints() {}

// Constantes: UPPER_SNAKE_CASE
const MAX_SESSIONS_PER_DAY = 12;

// Interfaces: PascalCase com I prefix (opcional)
interface User {}
interface IUserPreferences {}

// Types: PascalCase
type SessionStatus = "completed" | "interrupted";
\`\`\`

#### Estrutura de Componentes

\`\`\`typescript
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types/Interfaces
interface Props {
  onComplete: () => void;
}

// 3. Component
export function MyComponent({ onComplete }: Props) {
  // 3.1. Hooks
  const [state, setState] = useState(0);
  
  // 3.2. Handlers
  const handleClick = () => {
    setState(prev => prev + 1);
    onComplete();
  };
  
  // 3.3. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 3.4. Render
  return (
    <div>
      <Button onClick={handleClick}>Click</Button>
    </div>
  );
}
\`\`\`

#### Organização de Imports

\`\`\`typescript
// 1. React e Next.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

// 2. Bibliotecas externas
import { format } from 'date-fns';
import { motion } from 'framer-motion';

// 3. Componentes internos
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 4. Utilitários e tipos
import { cn } from '@/lib/utils';
import type { User } from '@/lib/types';

// 5. Estilos (se necessário)
import styles from './styles.module.css';
\`\`\`

### Boas Práticas

#### 1. Use Server Components por padrão

\`\`\`typescript
// ✅ Bom - Server Component
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// ❌ Evite - Client Component desnecessário
'use client';
export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  return <div>{data}</div>;
}
\`\`\`

#### 2. Extraia lógica complexa

\`\`\`typescript
// ✅ Bom - Hook customizado
function useTimer(initialMinutes: number) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);
  
  return { seconds, isRunning, setIsRunning };
}

// Uso
function Timer() {
  const { seconds, isRunning, setIsRunning } = useTimer(25);
  // ...
}
\`\`\`

#### 3. Use TypeScript corretamente

\`\`\`typescript
// ✅ Bom - Tipos explícitos
interface Session {
  id: string;
  durationMinutes: number;
  status: "completed" | "interrupted";
}

function saveSession(session: Session): Promise<void> {
  // ...
}

// ❌ Evite - any
function saveSession(session: any) {
  // ...
}
\`\`\`

#### 4. Componha com Tailwind

\`\`\`typescript
// ✅ Bom - Classes condicionais com cn()
<Button 
  className={cn(
    "px-4 py-2",
    isActive && "bg-primary text-white",
    isDisabled && "opacity-50 cursor-not-allowed"
  )}
/>

// ❌ Evite - Strings concatenadas
<Button 
  className={`px-4 py-2 ${isActive ? 'bg-primary text-white' : ''}`}
/>
\`\`\`

#### 5. Otimize performance

\`\`\`typescript
// ✅ Bom - Memoização quando necessário
const expensiveValue = useMemo(() => {
  return complexCalculation(data);
}, [data]);

const handleClick = useCallback(() => {
  doSomething();
}, []);

// ✅ Bom - Lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));
\`\`\`

### Debugging

\`\`\`typescript
// Use console.log com prefixo [v0]
console.log("[v0] User data:", userData);
console.log("[v0] API response:", response);

// Use React DevTools
// Use Network tab para API calls
// Use Performance tab para otimizações
\`\`\`

---

## 🚀 Deploy

### Vercel (Recomendado)

\`\`\`bash
# 1. Instale Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Deploy para produção
vercel --prod
\`\`\`

### Variáveis de Ambiente na Vercel

1. Acesse o dashboard do projeto
2. Settings → Environment Variables
3. Adicione:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_API_URL`

### Backend (NestJS) no Railway/Render

\`\`\`bash
# Railway
railway login
railway init
railway up

# Render
# 1. Conecte repositório GitHub
# 2. Configure build command: npm run build
# 3. Configure start command: npm run start:prod
# 4. Adicione variáveis de ambiente
\`\`\`

### MongoDB Atlas

1. Crie cluster
2. Configure Network Access (0.0.0.0/0 para produção)
3. Crie database user
4. Obtenha connection string
5. Adicione ao backend como `MONGODB_URI`

---

## 🧪 Testes

### Estrutura de Testes (Futuro)

\`\`\`
tests/
├── unit/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── integration/
│   ├── api/
│   └── flows/
└── e2e/
    ├── auth.spec.ts
    ├── timer.spec.ts
    └── gamification.spec.ts
\`\`\`

### Exemplo de Teste Unitário

\`\`\`typescript
// __tests__/utils/calculatePoints.test.ts
import { calculatePoints } from '@/lib/utils';

describe('calculatePoints', () => {
  it('should calculate points for completed session', () => {
    const points = calculatePoints(25, 'completed');
    expect(points).toBe(25);
  });
  
  it('should return 0 for interrupted session', () => {
    const points = calculatePoints(25, 'interrupted');
    expect(points).toBe(0);
  });
});
\`\`\`

### Exemplo de Teste E2E

\`\`\`typescript
// e2e/timer.spec.ts
import { test, expect } from '@playwright/test';

test('should complete a pomodoro session', async ({ page }) => {
  await page.goto('/dashboard');
  await page.click('button:has-text("Iniciar Foco")');
  await page.waitForTimeout(1500000); // 25 min
  await expect(page.locator('text=Sessão Completa!')).toBeVisible();
});
\`\`\`

---

## 🔧 Troubleshooting

### Problema: OpenAI API retorna erro 429

**Causa**: Rate limit excedido

**Solução**:
\`\`\`typescript
// Adicione retry logic
async function callOpenAI(prompt: string, retries = 3) {
  try {
    return await openai.chat.completions.create({...});
  } catch (error) {
    if (error.status === 429 && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return callOpenAI(prompt, retries - 1);
    }
    throw error;
  }
}
\`\`\`

### Problema: Timer não para ao fechar aba

**Causa**: setInterval continua rodando

**Solução**:
\`\`\`typescript
useEffect(() => {
  const interval = setInterval(() => {
    setSeconds(s => s - 1);
  }, 1000);
  
  // Cleanup ao desmontar
  return () => clearInterval(interval);
}, []);
\`\`\`

### Problema: Hydration mismatch

**Causa**: Diferença entre server e client render

**Solução**:
\`\`\`typescript
// Use useEffect para código client-only
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;
\`\`\`

### Problema: MongoDB connection timeout

**Causa**: IP não está na whitelist

**Solução**:
1. MongoDB Atlas → Network Access
2. Add IP Address → 0.0.0.0/0 (produção)
3. Ou adicione IP específico

---

## 🗺️ Roadmap

### Fase 1: MVP (Concluído) ✅
- [x] Autenticação JWT
- [x] Timer Pomodoro
- [x] Gamificação básica
- [x] Integração OpenAI
- [x] Design System

### Fase 2: Backend (Em Progresso) 🚧
- [ ] API NestJS completa
- [ ] MongoDB integrado
- [ ] Autenticação real
- [ ] Persistência de dados

### Fase 3: Features Avançadas 📋
- [ ] Modo offline (PWA)
- [ ] Push notifications
- [ ] Exportação de dados
- [ ] Integração com calendário
- [ ] Modo escuro
- [ ] Temas personalizáveis

### Fase 4: Social 🌐
- [ ] Desafios em grupo
- [ ] Leaderboards
- [ ] Compartilhamento de conquistas
- [ ] Comunidade de apoio

### Fase 5: IA Avançada 🤖
- [ ] Análise preditiva de distração
- [ ] Recomendações personalizadas
- [ ] Coach de IA proativo
- [ ] Insights comportamentais profundos

---

## 🤝 Contribuindo

### Como Contribuir

1. **Fork** o repositório
2. **Clone** seu fork
   \`\`\`bash
   git clone https://github.com/seu-usuario/focusflow.git
   \`\`\`
3. **Crie uma branch** para sua feature
   \`\`\`bash
   git checkout -b feature/MinhaFeature
   \`\`\`
4. **Commit** suas mudanças
   \`\`\`bash
   git commit -m 'feat: Adiciona MinhaFeature'
   \`\`\`
5. **Push** para a branch
   \`\`\`bash
   git push origin feature/MinhaFeature
   \`\`\`
6. **Abra um Pull Request**

### Convenção de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

\`\`\`
feat: Nova feature
fix: Correção de bug
docs: Documentação
style: Formatação
refactor: Refatoração
test: Testes
chore: Manutenção
\`\`\`

Exemplos:
\`\`\`
feat: Adiciona modo escuro
fix: Corrige cálculo de pontos
docs: Atualiza README com API docs
refactor: Extrai lógica do timer para hook
\`\`\`

### Code Review

Todos os PRs passam por code review. Checklist:

- [ ] Código segue convenções do projeto
- [ ] Testes passam
- [ ] Documentação atualizada
- [ ] Sem console.logs desnecessários
- [ ] TypeScript sem erros
- [ ] Componentes acessíveis (ARIA)

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

\`\`\`
MIT License

Copyright (c) 2025 Victor Hugo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
\`\`\`

---

## 👨‍💻 Autor

**Victor Hugo**

- Email: contatovhs4@gmail.com
- Telefone: 22999999999
- Projeto: Hackathon de Saúde 2025

---

## 🙏 Agradecimentos

- **OpenAI** pela API GPT-3.5
- **Vercel** pela plataforma de deploy
- **shadcn/ui** pelos componentes
- **Comunidade Next.js** pelo suporte

---

## 📊 Estatísticas do Projeto

- **Linhas de código**: ~15.000
- **Componentes**: 50+
- **Páginas**: 10
- **API Routes**: 5
- **Tempo de desenvolvimento**: 3 semanas
- **Stack**: Next.js 16 + TypeScript + Tailwind

---

<div align="center">

**FocusFlow** - Transformando a culpa da distração em Pontos de Fluxo de produtividade. 🎯

Desenvolvido com ❤️ para o Hackathon de Saúde 2025

[⬆ Voltar ao topo](#-focusflow---treinador-de-foco-digital)

</div>
