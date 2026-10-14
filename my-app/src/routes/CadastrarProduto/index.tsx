import { useState } from "react";
import { useNavigate } from "react-router";
import { cadastrarProduto } from "../../services/produtos";
import type { TipoProdutoForm } from "../../types/types";

export default function CadastrarProduto() {
  document.title = "Cadastrar Produto";

  const navigate = useNavigate();
  const [produto, setProduto] = useState<TipoProdutoForm>({ nome: "", preco: 0, estoque: 0, descricao: "", avatar: "" });
  const [salvando, setSalvando] = useState(false);

  async function handleCadastrar() {
    if (produto.nome.trim().length < 3) {
      alert("Informe um nome com pelo menos 3 caracteres.");
      return;
    }
    if (produto.preco < 0 || produto.estoque < 0) {
      alert("Preço e estoque não podem ser negativos.");
      return;
    }
    try {
      setSalvando(true);
      await cadastrarProduto({ ...produto, preco: Number(produto.preco) || 0, estoque: Number(produto.estoque) || 0 });
      alert("Produto cadastrado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro inesperado");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main>
      <h2>Cadastrar Produto</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCadastrar(); }}>
        <fieldset>
          <legend>Dados do produto:</legend>
          <div>
            <label htmlFor="nome">Nome do produto </label>
            <input type="text" id="nome" required value={produto.nome} onChange={(e) => setProduto({ ...produto, nome: e.target.value })} />
          </div>
          <div>
            <label htmlFor="preco">Preço do produto </label>
            <input type="number" step={0.01} min={0} id="preco" value={produto.preco} onChange={(e) => setProduto({ ...produto, preco: e.target.valueAsNumber })} />
          </div>
          <div>
            <label htmlFor="estoque">Estoque </label>
            <input type="number" min={0} id="estoque" value={produto.estoque} onChange={(e) => setProduto({ ...produto, estoque: e.target.valueAsNumber })} />
          </div>
          <div>
            <label htmlFor="descricao">Descrição do produto </label>
            <input type="text" id="descricao" value={produto.descricao} onChange={(e) => setProduto({ ...produto, descricao: e.target.value })} />
          </div>
          <div>
            <label htmlFor="avatar">URL da imagem </label>
            <input type="url" id="avatar" value={produto.avatar} onChange={(e) => setProduto({ ...produto, avatar: e.target.value })} />
          </div>
          <div>
            <button type="submit" disabled={salvando}>{salvando ? "Salvando..." : "CADASTRAR"}</button>
          </div>
        </fieldset>
      </form>
    </main>
  );
}
