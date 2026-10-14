export type TipoProduto = {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
  descricao: string;
  avatar: string;
};

// Dados do formulário de cadastro (o id é criado pela API)
export type TipoProdutoForm = Omit<TipoProduto, "id">;

// Formato que o Apps Script devolve
export type TipoRespostaApi<T> = {
  status: "success" | "error";
  message?: string;
  data?: T;
};
