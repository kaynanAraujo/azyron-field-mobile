export type OrdemServico = {
  id: number;
  numero: string;
  cliente: string;
  servico: string;
  horario: string;
  status: string;
  endereco: string;
  telefone: string;
  descricao: string;
};

export const ordens: OrdemServico[] = [
  {
    id: 1,
    numero: "OS-001",
    cliente: "MF Comunicação Visual",
    servico: "Manutenção do computador administrativo",
    horario: "08:30",
    status: "Pendente",
    endereco: "Rua das Flores, 120",
    telefone: "(18) 99999-1111",
    descricao:
      "O computador está lento e reiniciando durante o uso do sistema administrativo.",
  },
  {
    id: 2,
    numero: "OS-002",
    cliente: "Clínica Vida",
    servico: "Instalação de impressora",
    horario: "10:00",
    status: "Em andamento",
    endereco: "Avenida Central, 450",
    telefone: "(18) 99999-2222",
    descricao:
      "Instalar a nova impressora na recepção e configurar o compartilhamento na rede.",
  },
  {
    id: 3,
    numero: "OS-003",
    cliente: "Mercado Central",
    servico: "Verificação do sistema de câmeras",
    horario: "14:30",
    status: "Pendente",
    endereco: "Rua São Paulo, 870",
    telefone: "(18) 99999-3333",
    descricao:
      "Duas câmeras deixaram de exibir imagem no monitor principal.",
  },
];
