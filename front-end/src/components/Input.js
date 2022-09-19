// import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  padding: 1.5vh 0.7%;
  width: 25%;
  border: none;
  border-bottom: 2px solid #fbca37;
  background-color: #211b15;
  color: #cccdcc;
  font-size: medium;
  /* border-radius: 4.5px; */
`;

// function Input(props) {
//   const {
//     placeholder, value, type, onChange,
//   } = props;

//   return (
//     <StyledInput
//       placeholder={placeholder}
//       type={type}
//       value={value}
//       onChange={onChange}
//       required
//     />
//   );
// }

// Input.defaultProps = {
//   type: 'text',
// };

// Input.propTypes = {
//   placeholder: PropTypes.string,
//   value: PropTypes.string,
//   onChange: PropTypes.func,
// }.isRequired;

export default Input;
