export interface Experiencia {
  empresa: string;
  cargo: string;
  inicio: string;
  fim: string;
  descricao: string;
}

export interface Formacao {
  instituicao: string;
  curso: string;
  conclusao: string;
}

export interface Curriculo {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cargo: string;
  resumo: string;
  foto: string;
  experiencias: Experiencia[];
  formacoes: Formacao[];
}