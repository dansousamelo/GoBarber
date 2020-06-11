import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';
/* O provider é um componente que a gente coloca por volta dos componentes que
a gente quer que tenham acesso ao contexto de autenticação, todo componente dentro
dele (e dentro de um componente que está dentro de um componente) terá acesso a
informação de autenticação  */

import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </Router>
);

export default App;
