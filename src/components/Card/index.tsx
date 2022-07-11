import React from "react";

import { Wrapper } from "./styled";

const Card: React.FC = ({
  className,
  children,
}: {
  className?: string;
  children?: any;
}) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

export default Card;
