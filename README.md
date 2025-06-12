# Portal do Beneficiário - Uniodonto 

Um portal web moderno e responsivo para beneficiários de planos odontológicos, desenvolvido em React com design baseado na identidade visual da Uniodonto.

## 🚀 Funcionalidades Implementadas

### 🔐 Sistema de Autenticação
- Login seguro com CPF e senha
- Recuperação de senha por e-mail
- Proteção de rotas autenticadas

### 📊 Dashboard Principal
- Exibição do nome completo do beneficiário
- Tipo e nome do plano contratado
- Status do plano (ativo/inativo)
- Próxima consulta agendada
- Ações rápidas para funcionalidades principais

### 📅 Agendamento de Consultas
- Visualização de horários disponíveis
- Agendamento, reagendamento e cancelamento online
- Lista de consultas agendadas
- Filtros por data e status

### 🏥 Rede Credenciada
- Busca por dentistas e clínicas por:
  - Especialidade
  - Localização (CEP, cidade, estado)
  - Nome do profissional
- Visualização em lista e mapa
- Filtros aplicáveis
- Avaliações e horários disponíveis

### 📋 Histórico de Atendimento
- Lista de procedimentos realizados
- Datas e locais de atendimento
- Nome do profissional responsável
- Filtros por período e tipo de procedimento

### 💰 Área Financeira
- Exibição dos planos contratados e valores
- Geração de boletos atualizados
- Emissão de segunda via de faturas
- Histórico de pagamentos
- Status de pagamento (pago, pendente, vencido)

### 👥 Gerenciamento de Dependentes
- Adicionar, editar e excluir dependentes
- Associar dependentes a planos específicos
- Visualizar dados e histórico individual

### 💸 Solicitação de Reembolso
- Envio de formulário com anexos (PDF, JPG, PNG)
- Acompanhamento do status da solicitação
- Histórico de reembolsos

### ⚙️ Atualização de Dados Cadastrais
- Edição de telefone, e-mail, endereço
- Alteração de senha
- Validação de dados

### 🆘 Central de Ajuda
- Seção de perguntas frequentes (FAQ)
- Canal para abertura de chamados de suporte
- Contatos diretos (telefone, e-mail)

## 🎨 Design

### Paleta de Cores Uniodonto Campinas
- **Cor Principal**: #B7335D (vinho/magenta)
- **Cor Secundária**: #00D1D1 (ciano claro)
- **Texto**: Branco e cinza escuro para contraste
- **Fundo**: Gradientes baseados na paleta principal

### Características do Design
- Interface moderna e intuitiva
- Totalmente responsivo (desktop, tablet, mobile)
- Componentes shadcn/ui para consistência
- Ícones Lucide React
- Animações suaves e micro-interações

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 19.1.0
- **Styling**: Tailwind CSS 4.1.7
- **Componentes**: shadcn/ui
- **Ícones**: Lucide React 0.510.0
- **Roteamento**: React Router DOM 7.6.1
- **Build Tool**: Vite 6.3.5
- **Gerenciador de Pacotes**: pnpm

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20.18.0 ou superior
- pnpm (incluído no projeto)

### Instalação e Execução
```bash
# Navegar para o diretório do projeto
cd portal-odontologico

# Instalar dependências (já instaladas)
pnpm install

# Executar em modo de desenvolvimento
pnpm run dev

# Ou para expor na rede
pnpm run dev --host
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção
```bash
# Gerar build de produção
pnpm run build

# Visualizar build localmente
pnpm run preview
```

## 🔑 Dados para Teste

Para acessar o portal, utilize as seguintes credenciais:

- **CPF**: 123.456.789-00
- **Senha**: 123456

## 📱 Responsividade

O portal foi desenvolvido com foco em responsividade, garantindo uma experiência consistente em:

- **Desktop**: Layout completo com sidebar fixa
- **Tablet**: Layout adaptado com sidebar colapsável
- **Mobile**: Interface otimizada para toque com menu hambúrguer

## 🗂️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes shadcn/ui
│   ├── Layout.jsx      # Layout principal
│   └── ProtectedRoute.jsx
├── contexts/           # Contextos React
│   └── AuthContext.jsx
├── data/              # Dados mockados
│   └── mockData.js
├── pages/             # Páginas da aplicação
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Agendamentos.jsx
│   ├── RedeCredenciada.jsx
│   ├── Historico.jsx
│   ├── Financeiro.jsx
│   ├── Dependentes.jsx
│   ├── Reembolso.jsx
│   ├── DadosCadastrais.jsx
│   └── Ajuda.jsx
├── App.jsx            # Componente principal
├── App.css            # Estilos customizados
└── main.jsx           # Ponto de entrada
```

## 📊 Dados Mockados

O projeto utiliza dados simulados para demonstração, incluindo:

- Informações do usuário e dependentes
- Histórico de consultas e procedimentos
- Rede credenciada com profissionais
- Dados financeiros e faturas
- FAQ e chamados de suporte

## 🔧 Funcionalidades Técnicas

- **Autenticação**: Context API para gerenciamento de estado
- **Roteamento**: React Router com proteção de rotas
- **Formulários**: Validação e formatação automática
- **Responsividade**: Tailwind CSS com breakpoints
- **Acessibilidade**: Componentes acessíveis e navegação por teclado

## 📝 Notas de Desenvolvimento

- Todos os dados são mockados para demonstração
- Não há integração com backend real
- As funcionalidades simulam chamadas de API com delays
- O projeto está pronto para integração com APIs reais

## 🎯 Próximos Passos

Para implementação em produção, considere:

1. Integração com APIs backend reais
2. Implementação de autenticação JWT
3. Configuração de ambiente de produção
4. Testes automatizados
5. Monitoramento e analytics

---

**Desenvolvido com ❤️ para Uniodonto Campinas**

