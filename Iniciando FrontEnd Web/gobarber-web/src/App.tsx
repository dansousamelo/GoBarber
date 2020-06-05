import React from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import { AuthProvider } from './context/AuthContext';

/* O provider é um componente que a gente coloca por volta dos componentes que
a gente quer que tenham acesso ao contexto de autenticação, todo componente dentro
dele (e dentro de um componente que está dentro de um componente) terá acesso a
informação de autenticação  */

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
