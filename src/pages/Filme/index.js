import { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import api from "../../services/api";
import { toast } from "react-toastify";
import './style.css';

function Filme(){
  const { id } = useParams();
  const [filme, setFilme] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  // quando abrir a página
  useEffect(() => {
    async function lerFilme(){
      //vamos passasr o id do filme para exibir os detalhes do mesmo
      //``   template string
      const resposta = await api.get(`r-api/?api=filmes/${id}`);

      if (resposta.data.length === 0) {
        //tentou acessar os detalhes de um filme qcujo ID não existe
        //redireciono para a Home
        history.replace('/');
        return;
      }

      setFilme(resposta.data);
      setLoading(false);
    }

    lerFilme();

  }, [history, id]);

  function salvarFilmes(){
    const minhaLista = localStorage.getItem('filmes');

    //vamos converter o resultado obtido em minhaLista para JSON
    let filmesSalvos = JSON.parse(minhaLista) || [];

    //se tiver algum filme salvo com esse mesmo id, ignorar
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

    //o método some/algum devolve um valor booleano (true/falso)
    //Se true significa que o filme já foi salvo
    if (hasFilme) {
      //toast para informar que o filme já foi salvo
      toast.error('Você já salvou este filme!!!');
      return;
    }

    //Se o filme não foi salvo, vamos salvá-lo no localStorage
    filmesSalvos.push(filme);
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!!!');
  }

  if (loading) {
    return(
      <div className="filme-info">
        <h1>Carregando seu filme ...</h1>
      </div>
    )
  }

  return(
    <div className="filme-info">
      <h1>{filme.nome}</h1>
      <img src={filme.foto} alt={filme.nome} />
      <h3>Sinopse</h3>
      {filme.sinopse}

      <div className="botoes">
        <button onClick={ salvarFilmes }>Salvar</button>
        <button>
          <a target='blank' 
             href={`https://youtube.com/results?search_query=${filme.nome}`}>
             Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Filme;