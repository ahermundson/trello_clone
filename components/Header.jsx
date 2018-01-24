import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
  margin-top: 0;
  width: 100%;
  text-align: center;
  color: white;
  background-color: #0d47a1;
  font-family: Roboto, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  height: 45px;
`;

const Header = () => (
  <HeaderDiv>
    <h1>trello_clone</h1>
  </HeaderDiv>
);

export default Header;
