import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  /* Usamos o polished para escurecer o botão quando
      passarmos o mouse por cima e acrescentaremos uma transição
      de 0,2 segundos */
  transition: backgorund-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
