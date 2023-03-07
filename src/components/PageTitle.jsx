import styled from "styled-components";

export default function PageTitle({title}) {
  return <TitleStyle>{title}</TitleStyle>
}

const TitleStyle = styled.h1`
  font-family: 'Oswald', sans-serif;
  font-size: 43px;
  line-height: 64px;
  color: white;

  font-weight: 700;
`;
