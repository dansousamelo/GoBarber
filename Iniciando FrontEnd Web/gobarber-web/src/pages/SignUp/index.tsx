import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  /* Criaremos uma função para lidar com o envio de formulário
  para isso utilizaremos o @unform, precisamos dizer ao unform quais campos
  queremos que ele traga o valor (registro) */
  const handleSubmit = useCallback(async (data: object) => {
    try {
      /* zeramos os erros */
      formRef.current?.setErrors({});
      /* Criaremos um schema validar o nosso formulário */
      const schema = Yup.object().shape({
        name: Yup.string().required('Name obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      /* Utilizamos uma função de utils para pegar a mensagem dos nossos erros */
      const errors = getValidationErrors(err);

      /* Seto os erros se a validação falhar */
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça o seu cadastro</h1>
          {/* No caso do input iremos mandar um ícone, que é um componente,
        como props */}
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="signup">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
