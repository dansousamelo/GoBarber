import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { AuthContext } from '../../context/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  /* Pegamos do contexto */
  const { signIn } = useContext(AuthContext);

  /* Criaremos uma função para lidar com o envio de formulário
  para isso utilizaremos o @unform, precisamos dizer ao unform quais campos
  queremos que ele traga o valor (registro) */
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        /* zeramos os erros */
        formRef.current?.setErrors({});
        /* Criaremos um schema validar o nosso formulário */
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha Obrigaória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        /* Verifica as credencias do usuário */
        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        /* Utilizamos uma função de utils para pegar a mensagem dos nossos erros */
        const errors = getValidationErrors(err);

        /* Seto os erros se a validação falhar */
        formRef.current?.setErrors(errors);
      }
    },
    [signIn]
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça o seu logon</h1>
          {/* No caso do input iremos mandar um ícone, que é um componente,
        como props */}
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="signup">
          <FiLogIn />
          Criar Conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
