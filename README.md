<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=FF6B00,FFB347&height=200&section=header&text=EPI%20de%20System&fontSize=36&fontColor=ffffff&fontAlignY=38&desc=SENAI%20Roberto%20Mange&descAlignY=58&descSize=18" />

<br>

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange?style=for-the-badge)
![Instituição](https://img.shields.io/badge/Instituição-SENAI%20Roberto%20Mange-blue?style=for-the-badge)
![Licença](https://img.shields.io/badge/Licença-MIT-green?style=for-the-badge)

</div>

---

## 📋 Sobre o Projeto

O **EPI System** é uma solução desenvolvida para modernizar e digitalizar o controle de Equipamentos de Proteção Individual (EPIs) do **SENAI SC Joinville**, substituindo métodos manuais e arcaicos por um sistema seguro, rastreável e eficiente.

> ⚠️ **Problema identificado:** A ausência de um sistema formal de controle de EPIs gera desorganização, riscos à integridade física dos usuários, exposição jurídica e prejuízos financeiros à instituição.

---

## 🚨 Problemas que o Sistema Resolve

| Problema                 | Impacto                                 | Solução                                 |
| ------------------------ | --------------------------------------- | --------------------------------------- |
| Falta de rastreabilidade | Equipamentos perdidos ou extraviados    | Registro digital com histórico completo |
| Estoque descontrolado    | Reposição ineficiente e custos elevados | Gestão de estoque automatizada          |
| Sem controle de uso      | Riscos de segurança e acidentes         | Solicitação e aprovação digitalizada    |
| Ausência de registros    | Multas e problemas jurídicos            | Conformidade com normas de segurança    |
| Processos manuais        | Retrabalho e erros humanos              | Fluxo digital e automatizado            |

---

## 👥 Usuários do Sistema

```
┌─────────────────────────────────────────────────────────┐
│                   SISTEMA DE EPIs                       │
├──────────────┬──────────────────┬───────────────────────┤
│  FUNCIONÁRIO │    PROFESSOR     │        ALUNO          │
├──────────────┼──────────────────┼───────────────────────┤
│ ✅ Cadastrar │ ✅ Usar EPIs     │ ✅ Usar EPIs          │
│ ✅ Listar    │ ✅ Aceitar       │ ✅ Solicitar EPIs     │
│ ✅ Editar    │    solicitações  │                       │
│ ✅ Remover   │                  │                       │
│ ✅ Validar   │                  │                       │
└──────────────┴──────────────────┴───────────────────────┘
```

### 🔐 Detalhamento de Permissões

**👷 Funcionário (Admin)**

- CRUD completo de EPIs (Criar, Ler, Atualizar, Deletar)
- Validação e controle do estoque
- Geração de relatórios
- Gerenciamento de usuários

**👨‍🏫 Professor**

- Visualização e utilização de EPIs disponíveis
- Aprovação/rejeição de solicitações de alunos
- Histórico de uso pessoal

**🧑‍🎓 Aluno**

- Visualização de EPIs disponíveis
- Solicitação de empréstimo de EPIs
- Acompanhamento do status das solicitações

---

## 🛠️ Progresso do Desenvolvimento

- [x] Planejamento do sistema
- [x] Levantamento de requisitos
- [x] Modelagem do banco de dados
- [x] Inicialização do projeto front-end (Vue 3 + Vite)
- [x] Configuração do Vue Router com 7 rotas
- [x] Criação do componente de navegação (`PageNav`)
- [x] Estrutura base das páginas (Home, Sobre, Contato, Login, Cadastro, Dashboard, Estoque)
- [x] Estilização da página Home com CSS Modules
- [ ] Estilização das demais páginas
- [ ] Formulário de Login com autenticação
- [ ] Formulário de Cadastro de usuários
- [ ] Tela de Dashboard com dados e gráficos
- [ ] Gerenciamento de Estoque (CRUD de EPIs)
- [ ] Desenvolvimento do back-end (API)
- [ ] Integração front-end ↔ back-end
- [ ] Sistema de autenticação e perfis (guards de rota)
- [ ] Controle de estoque em tempo real
- [ ] Histórico de movimentações
- [ ] Relatórios e dashboards
- [ ] Testes e validação
- [ ] Deploy e implantação

---

## 🗂️ Estrutura do Projeto

```
episystem/
├── 📄 index.html                  # Ponto de entrada HTML
├── 📄 package.json                # Dependências e scripts
├── 📄 vite.config.js              # Configuração do Vite
├── 📁 public/                     # Arquivos estáticos públicos
└── 📁 src/
    ├── 📄 main.js                 # Inicialização do Vue + Router
    ├── 📄 App.vue                 # Componente raiz (RouterView)
    ├── 📄 style.css               # Reset CSS global
    ├── 📁 assets/                 # Recursos estáticos (imagens, ícones)
    ├── 📁 components/
    │   └── 📄 PageNav.vue         # Barra de navegação reutilizável
    ├── 📁 router/
    │   └── 📄 index.js            # Definição das rotas (7 rotas)
    ├── 📁 styles/
    │   └── 📄 Home.module.css     # CSS Module da página Home
    └── 📁 views/
        ├── 📄 Home.vue            # Página inicial
        ├── 📄 Sobre.vue           # Página sobre o sistema
        ├── 📄 Contato.vue         # Página de contato
        ├── 📄 Login.vue           # Página de login (placeholder)
        ├── 📄 Cadastro.vue        # Página de cadastro (placeholder)
        ├── 📄 Dashboard.vue       # Painel de controle (placeholder)
        └── 📄 Estoque.vue         # Gestão de estoque (placeholder)
```

---

## 🌐 Rotas da Aplicação

| Rota         | Página    | Descrição                        |
| ------------ | --------- | -------------------------------- |
| `/`          | Home      | Página inicial do sistema        |
| `/sobre`     | Sobre     | Informações sobre o projeto      |
| `/contato`   | Contato   | Informações de contato           |
| `/login`     | Login     | Autenticação de usuários         |
| `/cadastro`  | Cadastro  | Registro de novos usuários       |
| `/dashboard` | Dashboard | Painel de controle e relatórios  |
| `/estoque`   | Estoque   | Gerenciamento de EPIs em estoque |

---

## ⚙️ Tecnologias Utilizadas

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js%203-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite%207-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vue Router](https://img.shields.io/badge/Vue%20Router%204-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

</div>

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/turco-vic/episystem.git

# Acesse a pasta do projeto
cd episystem

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

| Comando           | Descrição                                  |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Inicia o servidor de desenvolvimento local |
| `npm run build`   | Gera a build de produção                   |
| `npm run preview` | Pré-visualiza a build de produção          |

---

## 📐 Regras de Negócio

1. **Solicitação de EPI:** Alunos solicitam → Professor aprova → Funcionário libera
2. **Devolução:** Prazo definido na solicitação; atrasos são registrados
3. **Estoque mínimo:** Alertas automáticos quando estoque atinge nível crítico
4. **Rastreabilidade:** Toda movimentação é registrada com data, hora e responsável
5. **Acesso por perfil:** Cada tipo de usuário acessa apenas suas funcionalidades

---

## 🔒 Conformidade e Segurança

Este sistema foi projetado em conformidade com:

- **NR-6** — Norma Regulamentadora de Equipamentos de Proteção Individual
- **LGPD** — Lei Geral de Proteção de Dados
- Boas práticas de segurança da informação

---

## 👨‍💻 Equipe

> Desenvolvido por Enzo Turcovic no **SENAI Roberto Mange** como projeto acadêmico.

---

## 📫 Contato

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/turco-vic)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enzo-alves-turcovic-10b7ab201/)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=FF6B00,FFB347&height=80&section=footer" />

</div>
