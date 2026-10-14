import { useEffect, useState } from "react";
import { Link } from "react-router";
import CardProduto from "../../components/CardProduto";
import { FaEdit as Editar } from "react-icons/fa";
import { MdDeleteForever as Excluir } from "react-icons/md";
import { excluirProduto, listarProdutos } from "../../services/produtos";
import type { TipoProduto } from "../../types/types";

export default function Produtos() {
  document.title = "Produtos";

  const [produtos, setProdutos] = useState<TipoProduto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro("");
        setProdutos(await listarProdutos());
      } catch (error) {
        setErro(error instanceof Error ? error.message : "Erro inesperado");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  async function handleDelete(id: string) {
    if (!window.confirm("Deseja realmente excluir este produto?")) return;
    try {
      await excluirProduto(id);
      setProdutos((lista) => lista.filter((p) => p.id !== id));
      alert("Produto excluído com sucesso!");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro inesperado");
    }
  }

  if (carregando) return <main><p>Carregando produtos...</p></main>;
  if (erro) return <main><p role="alert">{erro}</p></main>;

  return (
    <main>
      <h2>Produtos</h2>
      <p><Link to="/cadastrar-produto">Cadastrar produto</Link></p>

      {produtos.length === 0 && <p>Nenhum produto cadastrado.</p>}

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {produtos.map((produto) => (
          <CardProduto key={produto.id} produto={produto} onExcluir={handleDelete} />
        ))}
      </div>

      <div>
        <table border={1} style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>PREÇO</th>
              <th>ESTOQUE</th>
              <th>DESCRIÇÃO</th>
              <th>AVATAR</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.preco.toFixed(2)}</td>
                <td>{produto.estoque}</td>
                <td>{produto.descricao}</td>
                <td>{produto.avatar && <img src={produto.avatar} alt={produto.nome} width={40} />}</td>
                <td>
                  <Link to={`/editar-produtos/${produto.id}`} aria-label="Editar"><Editar /></Link> /{" "}
                  <button type="button" aria-label="Excluir" onClick={() => handleDelete(produto.id)}><Excluir /></button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7}>Quantidade de registros : {produtos.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}
