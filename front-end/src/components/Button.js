import styled from 'styled-components';

const Button = styled.button`
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

export default Button;
