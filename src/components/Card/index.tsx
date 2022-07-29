import React from "react";
import { Wrapper } from "./styled";

interface CardProps {
  className?: string;
  id?: string;
  children?: any;
}

const Card: React.FC<CardProps> = ({ className, id, children }) => {
  return (
    <Wrapper id={id} className={className}>
      {children}
    </Wrapper>
  );
};

export default Card;
