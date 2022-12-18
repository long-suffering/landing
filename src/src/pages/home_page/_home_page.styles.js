import styled from "styled-components";

export const Title = styled.h1`
  font-size: 12px;
  color: ${props => props.color ? "red" : "yellow"};
`