import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

function Home(){
  const [filmes, setFilmes] = useState([]);

  //quando ler a página é executado o useEffect
  useEffect(() => {
    async function lerFilmes(){

      //o método get vai "concatenar" com a rota base
      //https://sujeitoprogramador.com/ + r-api/?api=filmes
      const resposta = await api.get('r-api/?api=filmes')
      setFilmes(resposta.data);
    };

    lerFilmes();

  }, []);

  return(
    <div className='container'>
      <div className='lista-filmes'>

        {filmes.map((filme) => {
          return(
            <article key={filme.id}>
              <strong> {filme.nome}</strong>
              <img src={filme.foto} alt={filme.nome} />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  );

}

export default Home;