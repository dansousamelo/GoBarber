import styled from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/signup-backgound.png';

export const Container = styled.div`
  /* Ocupa 100% da parte visível */
  height: 100vh;

  display: flex;
  /* Os elementos dentro do Container ocuparão 100% da parte vísivel
  com strech */
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Centraliza os elementos dentro do Content */
  place-content: center;

  /* Essas duas propriedades garantem que os elementos ocupem o máximo
  da tela possível mas que tenha um máximo de 700px */
  width: 100%; /* Nunca vai reduzir */
  max-width: 700px;

  form {
    /* Dá uma distanciada dos outros elementos */
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      /* Usamos o polished para escurecer o link quando
      passarmos o mouse por cima e acrescentaremos uma transição
      de 0,2 segundos */
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  /* Quero estilizar somente o link que vierem diretamente dentro do
  content e não dentro do form, por exemplo */
  > a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    /* Damos uma espaçada no svg*/
    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const Background = styled.div`
  /* Garante que a o conteúdo se adaptará */
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  /* Garante que a imagem cubra o conteúdo inteiro*/
  background-size: cover;
`;
