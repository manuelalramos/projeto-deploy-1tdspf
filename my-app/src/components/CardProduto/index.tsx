import { Link } from "react-router";
import type { TipoProduto } from "../../types/types";
import { FaEdit as Editar } from "react-icons/fa";
import { MdDeleteForever as Excluir } from "react-icons/md";

type Props = {
  produto: TipoProduto;
  onExcluir?: (id: string) => void;
};

export default function CardProduto({ produto, onExcluir }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px", width: "200px" }}>
      <h3>{produto.nome}</h3>
      <p>R$ {produto.preco.toFixed(2)}</p>
      <p>Estoque: {produto.estoque}</p>
      {produto.estoque < 5 && <p role="status">Estoque baixo</p>}
      <figure>
        {produto.avatar && <img src={produto.avatar} alt={`Imagem do produto ${produto.nome}`} width={80} />}
        <figcaption>{produto.descricao}</figcaption>
      </figure>
      <div>
        <Link to={`/editar-produtos/${produto.id}`} aria-label="Editar"><Editar /></Link>
        {" - "}
        <button type="button" aria-label="Excluir" onClick={() => onExcluir?.(produto.id)}>
          <Excluir />
        </button>
      </div>
    </div>
  );
}
