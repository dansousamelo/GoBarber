import React from 'react';
import { Container } from './styles';

interface TooltipProps {
  title: string;
  /* Permite a utlização no style.ts do input sem colocarmos
  no index.tsx */
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
