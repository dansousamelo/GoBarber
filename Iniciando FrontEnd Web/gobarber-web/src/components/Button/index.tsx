import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';
/* Como não iremos sobrescrever nada da classe extendida  converteresmos
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>
para: */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/* o type do button não pode ser vazio, passamos o type no início e se o props
enviar o props novamente ele vai sobrescrever */

/* O children é responsaável pelo texto dentro do botão, devemos
desestruturar,  */
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
