import { Curriculo } from "@/types/curriculo";

export const MOCK_CURRICULOS: Curriculo[] = [
  {
    id: "1",
    nome: "Ana Silva",
    email: "ana.silva@email.com",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    cargo: "Desenvolvedora Frontend Senior",
    resumo: "Especialista em ecossistema React, Next.js e Tailwind CSS com mais de 6 anos de experiência em aplicações web de alta performance.",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    experiencias: [
      {
        empresa: "Tech Solutions",
        cargo: "Dev Frontend",
        inicio: "2022-01",
        fim: "Presente",
        descricao: "Desenvolvimento de interfaces escaláveis com Next.js e TypeScript.",
      },
    ],
    formacoes: [
      {
        instituicao: "Universidade de São Paulo (USP)",
        curso: "Ciência da Computação",
        conclusao: "2021",
      },
    ],
  },
  {
    id: "2",
    nome: "Carlos Souza",
    email: "carlos.souza@email.com",
    telefone: "(21) 91234-5678",
    cpf: "987.654.321-11",
    cargo: "Engenheiro de Software Fullstack",
    resumo: "Experiência sólida no desenvolvimento de APIs robustas em Node.js e interfaces modernas com React e Next.js.",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    experiencias: [
      {
        empresa: "Inova Web",
        cargo: "Fullstack Dev",
        inicio: "2020-03",
        fim: "2021-12",
        descricao: "Criação de microsserviços e integração com sistemas legados.",
      },
    ],
    formacoes: [
      {
        instituicao: "Fiap",
        curso: "Engenharia de Software",
        conclusao: "2019",
      },
    ],
  },
];