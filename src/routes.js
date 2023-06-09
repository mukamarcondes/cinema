import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header    from './componentes/Header';

import Home      from './pages/Home';
import Filme     from './pages/Filme';
import Favoritos from './pages/Favoritos';
import Erro      from './pages/Erro';

const Routes = () => {
  return(
    <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/"          component={ Home } />
          <Route exact path="/filme/:id" component={ Filme } />
          <Route exact path="/favoritos" component={ Favoritos } />
          {/* a rota para a página de erro deverá ser sempre a última */}
          <Route exact path="*"          component={ Erro } />
        </Switch>
    </BrowserRouter>
  )
}

export default Routes;