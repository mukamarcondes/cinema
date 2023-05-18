import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import './style.css';

function Favoritos(){

  //lógica desta página: ir ao localStorage e buscar todos 
  //os filmes salvos/favoritados
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    //quando a página for lida/montada buscar todos os filmes no
    //localStorage
    //filmes é o nome da lista de filmes salvos em:
    //Inspecionar(F12) > Aplicação > Chave/Key
    //a variável minhaLista contém TODOS os filmes salvos/favoritados

    const minhaLista = localStorage.getItem('filmes');

    //filmes está no formato JSON  e precisamos converter
    //para um array/vetor
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function removerSalvo(id){
    let filtroFilmes = filmes.filter((item) => {
      return (item.id !== id)
    })

    setFilmes(filtroFilmes);
    localStorage.setItem('filmes', JSON.stringify(filtroFilmes));
    toast.success("Filmes excluído com sucesso!!!");
  }

  return(
    <div id="meus-filmes">
      <h1>Meus Filmes</h1>

      {/* Se não tiver nenhum filme salvo */}
      {filmes.length === 0 && <span>Nenhum filme salvo!!!</span>}

      <ul>
        {filmes.map((item) => {
          return(
            <li key={item.id}>
              <span>{item.nome}</span>

              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => removerSalvo(item.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favoritos;