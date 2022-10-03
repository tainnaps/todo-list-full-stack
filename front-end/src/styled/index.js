import { Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';

export const BaseStyle = styled.main`
  * {
    margin: 0;
    padding: 0;
  }
  background-color: #211b15;
`;

export const Button = styled.button`
  cursor: pointer;
  padding: 1.5vh 1.4%;
  font-size: medium;
  border-radius: 4px;
  transition: 0.3s;
  border: 2px solid #fbca37;
  background-color: #fbca37;
  color: #211b15;

  &:hover:enabled {
    border: 2px solid #fabd05;
    background-color: #fabd05;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4vh;
  width: 100%;
`;

export const Input = styled.input`
  padding: 1.5vh 0.7%;
  width: 25%;
  border: none;
  border-bottom: 2px solid #fbca37;
  background-color: #211b15;
  color: #cccdcc;
  font-size: medium;
`;

export const Link = styled(ReactRouterLink)`
  color: #cccdcc;
  font-size: medium;
`;

export const PageContainer = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
`;

export const TableButton = styled(Button)`
  padding: 1.3vh;
`;

export const StyledTable = styled.table`
  width: 75%;
  font-size: large;
  border-collapse: collapse;

  th, td {
    border-bottom: 1px solid #a0a1a4;
    padding: 2vh 2%;
    text-align: center;
  }

  thead {
    color: #fbca37;
  }

  tbody {
    color: #cccdcc;
  }
`;

export const Title = styled.h1`
  color: #fbca37;
`;

export const Warning = styled.p`
  color: #c03d29;
  font-size: large;
`;
