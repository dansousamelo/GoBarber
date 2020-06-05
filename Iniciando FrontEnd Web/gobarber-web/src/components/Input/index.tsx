import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

/* Criamos uma interface para tipar o Input extendendo de próprio HTML,
colocaremos o campo name como obrigatório também */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}
/* Importamos IconBaseProps  para dar acesso as propriedas de um ícone */
/* Spread Operation pode sere perigoso quando não usamos typescript */
/* Devemos sempre tipar o componente com letra maiúscula icon: Icon */
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  /* Uma referência é uma forma de acessarmos diretamente um elemento na DOM */
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  /* Quando temos uma função dentro de uma função, toda vez que nossa função
  input for chamada ela vai recriar a função dentro da memória, causando
  problemas, utilizaremos o useCallback para resolver isso */
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  /* Assim que o input for exbido em tela iremos registrar o input */
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      /* Acessa o valor do input */
      path: 'value',
    });
  }, [fieldName, registerField]);
  /* Devemos informar as variáveis que estamos utilizando */

  return (
    /* Passamos essa propriedade para o container */
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {/* Se existir um ícone */}
      {Icon && <Icon size={20} />}
      {/* O defaultValue nos permite setar um valor inicial,
      no Form ficaria assim:
      <Form initialData={{ name: 'Daniel' }}> */}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
