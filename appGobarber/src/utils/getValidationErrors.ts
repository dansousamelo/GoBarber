import { ValidationError } from 'yup';

/* A key pode ser qualquer coisa desde que seja uma string */
interface Errors {
  [key: string]: string;
}

/* Criamos essa função para ajudar no tratamento de erros */
export default function getValidationErrors(err: ValidationError): Errors {
  const ValidationErrors: Errors = {};

  err.inner.forEach((error) => {
    ValidationErrors[error.path] = error.message;
  });

  return ValidationErrors;
}
