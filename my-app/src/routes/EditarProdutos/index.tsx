import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { atualizarProduto, buscarProdutoPorId } from "../../services/produtos";
import type { TipoProduto } from "../../types/types";

export default function EditarProdutos() {
  document.title = "Editar Produtos";

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<TipoProduto>({ id: "", nome: "", preco: 0, estoque: 0, descricao: "", avatar: "" });
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregar() {
      if (!id) return;
      try {
        setProduto(await buscarProdutoPorId(id));
      } catch (error) {
        alert(error instanceof Error ? error.message : "Erro inesperado");
      }
    }
    carregar();
  }, [id]);

  async function handleUpdate() {
    if (produto.nome.trim().length < 3) {
      alert("Informe um nome com pelo menos 3 caracteres.");
      return;
    }
    try {
      setSalvando(true);
      await atualizarProduto({ ...produto, preco: Number(produto.preco) || 0, estoque: Number(produto.estoque) || 0 });
      alert("Produto atualizado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro inesperado");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main>
      <h2>Editar Produtos</h2>
      <p>ID: {id}</p>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
        <fieldset>
          <legend>Dados do produto:</legend>
          <div>
            <label htmlFor="nome">Nome do produto </label>
            <input type="text" id="nome" value={produto.nome} onChange={(e) => setProduto({ ...produto, nome: e.target.value })} />
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
            {produto.avatar && (
              <figure>
                <img src={produto.avatar} alt={produto.nome} width={160} />
              </figure>
            )}
          </div>
          <div>
            <button type="submit" disabled={salvando}>{salvando ? "Salvando..." : "ATUALIZAR"}</button>
          </div>
        </fieldset>
      </form>
    </main>
  );
}
