import { Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';

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

export const Label = styled.label`
  color: #fbca37;
  font-size: large;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 1.5vh 0.7%;
  width: ${(props) => (props.small ? '15%' : '25%')};
  border: none;
  border-bottom: 2px solid #fbca37;
  background-color: #211b15;
  color: #cccdcc;
  font-size: medium;
`;

export const Select = styled.select`
  padding: 1.5vh 0.7%;
  width: ${(props) => (props.small ? '15%' : '25%')};
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

export const Container = styled.div`
  width: ${(props) => (props.large ? '100%' : 'fit-content')};
  display: flex;
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  gap: ${(props) => (props.gap && props.row ? `${props.gap}%` : `${props.gap}vh`)};
`;

export const PageContainer = styled(Container)`
  min-height: 100vh;
  width: 100%;
`;

export const TableButton = styled(Button)`
  padding: 1.3vh;
`;

export const StyledTable = styled.table`
  width: 75%;
  font-size: large;
  border-collapse: collapse;
  margin-bottom: 12vh;

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

export const Text = styled.p`
  color: ${(props) => (props.warning ? '#c03d29' : '#211b15')};
  font-size: large;
`;

export const StyledHeader = styled.header`
  background-color: #fbca37;
  padding: 2vh 0;
  width: 100%;
`;

export const Image = styled.img`
  width: 50px;
`;
