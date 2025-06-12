// Dados mockados para o portal odontológico

export const mockUser = {
  id: 1,
  cpf: "123.456.789-00",
  nome: "Maria Silva Santos",
  email: "maria.silva@email.com",
  telefone: "(11) 99999-9999",
  endereco: {
    cep: "13010-000",
    rua: "Rua das Flores, 123",
    bairro: "Centro",
    cidade: "Campinas",
    estado: "SP"
  },
  plano: {
    tipo: "Uniodonto Premium",
    nome: "Plano Família Plus",
    status: "ativo",
    dataVencimento: "2024-12-15",
    valor: 189.90
  },
  proximaConsulta: {
    data: "2024-12-20",
    horario: "14:30",
    dentista: "Dr. João Oliveira",
    especialidade: "Clínica Geral",
    clinica: "Clínica Dental Care",
    endereco: "Av. Principal, 456 - Centro, Campinas/SP"
  }
};

export const mockDependentes = [
  {
    id: 2,
    nome: "Pedro Silva Santos",
    cpf: "987.654.321-00",
    parentesco: "Filho",
    idade: 12,
    plano: "Uniodonto Infantil"
  },
  {
    id: 3,
    nome: "Ana Silva Santos",
    cpf: "456.789.123-00",
    parentesco: "Filha",
    idade: 8,
    plano: "Uniodonto Infantil"
  }
];

export const mockRedeCredenciada = [
  {
    id: 1,
    nome: "Dr. João Oliveira",
    especialidade: "Clínica Geral",
    clinica: "Clínica Dental Care",
    endereco: "Av. Principal, 456 - Centro, Campinas/SP",
    telefone: "(19) 3333-4444",
    cep: "13010-100",
    latitude: -22.9068,
    longitude: -47.0608,
    avaliacao: 4.8,
    horarios: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"]
  },
  {
    id: 2,
    nome: "Dra. Maria Fernanda",
    especialidade: "Ortodontia",
    clinica: "Ortodontia Especializada",
    endereco: "Rua dos Dentistas, 789 - Cambuí, Campinas/SP",
    telefone: "(19) 3555-6666",
    cep: "13025-000",
    latitude: -22.8989,
    longitude: -47.0572,
    avaliacao: 4.9,
    horarios: ["08:30", "09:30", "10:30", "14:30", "15:30", "16:30"]
  },
  {
    id: 3,
    nome: "Dr. Carlos Mendes",
    especialidade: "Implantodontia",
    clinica: "Centro de Implantes",
    endereco: "Av. Norte Sul, 321 - Vila Industrial, Campinas/SP",
    telefone: "(19) 3777-8888",
    cep: "13035-000",
    latitude: -22.9234,
    longitude: -47.0456,
    avaliacao: 4.7,
    horarios: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"]
  },
  {
    id: 4,
    nome: "Dra. Ana Paula",
    especialidade: "Endodontia",
    clinica: "Clínica Endodôntica",
    endereco: "Rua das Palmeiras, 654 - Jardim Guanabara, Campinas/SP",
    telefone: "(19) 3999-0000",
    cep: "13073-000",
    latitude: -22.8756,
    longitude: -47.0234,
    avaliacao: 4.6,
    horarios: ["08:00", "09:00", "13:00", "14:00", "15:00", "16:00"]
  }
];

export const mockHistoricoAtendimento = [
  {
    id: 1,
    data: "2024-11-15",
    procedimento: "Limpeza e Profilaxia",
    dentista: "Dr. João Oliveira",
    clinica: "Clínica Dental Care",
    valor: 80.00,
    status: "Concluído"
  },
  {
    id: 2,
    data: "2024-10-20",
    procedimento: "Restauração em Resina",
    dentista: "Dra. Maria Fernanda",
    clinica: "Ortodontia Especializada",
    valor: 150.00,
    status: "Concluído"
  },
  {
    id: 3,
    data: "2024-09-10",
    procedimento: "Consulta de Rotina",
    dentista: "Dr. João Oliveira",
    clinica: "Clínica Dental Care",
    valor: 60.00,
    status: "Concluído"
  }
];

export const mockFinanceiro = {
  planos: [
    {
      id: 1,
      nome: "Uniodonto Premium - Família Plus",
      valor: 189.90,
      vencimento: "15",
      status: "ativo"
    }
  ],
  faturas: [
    {
      id: 1,
      mes: "Dezembro 2024",
      valor: 189.90,
      vencimento: "2024-12-15",
      status: "pendente",
      codigoBarras: "23791.23456 78901.234567 89012.345678 9 12340000018990"
    },
    {
      id: 2,
      mes: "Novembro 2024",
      valor: 189.90,
      vencimento: "2024-11-15",
      status: "pago",
      dataPagamento: "2024-11-14"
    },
    {
      id: 3,
      mes: "Outubro 2024",
      valor: 189.90,
      vencimento: "2024-10-15",
      status: "pago",
      dataPagamento: "2024-10-12"
    }
  ]
};

export const mockConsultas = [
  {
    id: 1,
    data: "2024-12-20",
    horario: "14:30",
    dentista: "Dr. João Oliveira",
    especialidade: "Clínica Geral",
    clinica: "Clínica Dental Care",
    status: "agendada",
    tipo: "Consulta de Rotina"
  },
  {
    id: 2,
    data: "2024-12-28",
    horario: "09:00",
    dentista: "Dra. Maria Fernanda",
    especialidade: "Ortodontia",
    clinica: "Ortodontia Especializada",
    status: "agendada",
    tipo: "Avaliação Ortodôntica"
  }
];

export const mockReembolsos = [
  {
    id: 1,
    data: "2024-11-25",
    procedimento: "Consulta Particular",
    valor: 120.00,
    status: "aprovado",
    valorReembolso: 80.00,
    dataReembolso: "2024-12-01"
  },
  {
    id: 2,
    data: "2024-11-10",
    procedimento: "Radiografia Panorâmica",
    valor: 150.00,
    status: "em_analise",
    valorSolicitado: 150.00
  },
  {
    id: 3,
    data: "2024-10-15",
    procedimento: "Limpeza Dental",
    valor: 90.00,
    status: "rejeitado",
    motivoRejeicao: "Procedimento não coberto pelo plano"
  }
];

export const mockFAQ = [
  {
    id: 1,
    pergunta: "Como agendar uma consulta?",
    resposta: "Você pode agendar uma consulta através do portal, na seção 'Agendamento de Consultas'. Selecione o profissional, data e horário disponível."
  },
  {
    id: 2,
    pergunta: "Como solicitar reembolso?",
    resposta: "Acesse a seção 'Solicitação de Reembolso', preencha o formulário e anexe os documentos necessários (nota fiscal, recibo, etc.)."
  },
  {
    id: 3,
    pergunta: "Como emitir segunda via do boleto?",
    resposta: "Na área financeira, você pode visualizar suas faturas e gerar a segunda via do boleto clicando no botão correspondente."
  },
  {
    id: 4,
    pergunta: "Como adicionar um dependente?",
    resposta: "Vá até a seção 'Gerenciamento de Dependentes' e clique em 'Adicionar Dependente'. Preencha os dados solicitados."
  },
  {
    id: 5,
    pergunta: "Como alterar meus dados cadastrais?",
    resposta: "Acesse 'Atualização de Dados Cadastrais' no menu principal e edite as informações que deseja alterar."
  }
];

export const mockChamados = [
  {
    id: 1,
    data: "2024-12-01",
    assunto: "Problema no agendamento",
    status: "aberto",
    prioridade: "media",
    descricao: "Não consigo agendar consulta para o próximo mês"
  },
  {
    id: 2,
    data: "2024-11-28",
    assunto: "Dúvida sobre cobertura",
    status: "resolvido",
    prioridade: "baixa",
    descricao: "Gostaria de saber se implante está coberto pelo meu plano"
  }
];

