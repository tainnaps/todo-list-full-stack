import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  padding: 1.5vh 1.4%;
  font-size: medium;
  border-radius: 4px;
  transition: 0.3s;
  border: 2px solid #eead2d;
  background-color: #211b15;
  color: #eead2d;

  &:hover:enabled {
    border: 2px solid #eead2d;
    background-color: #eead2d;
    color: #211b15;
  }

  &:disabled {
    background-color: #676162;
    border: 2px solid #676162;
    opacity: 0.5;
    cursor: not-allowed;
    color: #d3d3d3;
  }
`;

export default Button;
