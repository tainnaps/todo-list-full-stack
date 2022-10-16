import React from 'react';
import PropTypes from 'prop-types';
import { getItem, LOCAL_STORAGE_KEY } from '../services/localStorage';
import {
  Text, StyledHeader, Container, Button, Image,
} from '../styled';

function Header({ handleLogoutClick }) {
  return (
    <StyledHeader>
      <Container
        row
        large
        justify="space-around"
        align="center"
        gap="20"
      >
        <a
          href="https://www.flaticon.com/free-icons/to-do"
          title="To do icons created by Freepik"
          target="__blank"
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/2387/2387679.png"
            alt="to do icon"
          />
        </a>
        <Text>
          Hello,
          {' '}
          <strong>{getItem(LOCAL_STORAGE_KEY).username}</strong>
          ! Welcome to your todo list.
        </Text>
        <Button
          type="button"
          onClick={handleLogoutClick}
        >
          Logout
        </Button>
      </Container>
    </StyledHeader>
  );
}

Header.propTypes = {
  handleLogoutClick: PropTypes.func,
}.isRequired;

export default Header;
