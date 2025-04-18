// src/pages/ErrorPage.js
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
   display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center; 
  

`;
const MessageContainer = styled.div`
  display:grid;
  place-items:center;
  background:white;
  padding:46px 24px;
  border-radius:10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;


const Icon = styled(FontAwesomeIcon)`
  color: #cc0000;
  font-size: 5rem;
`;

const Message = styled.h2`
  margin-top: 1rem;
  font-size: 2rem;
`;

const Subtext = styled.p`
  margin-top: 0.5rem;
  color: #555;
`;

const ErrorPage = () => {
  return (
    <Container>
      <MessageContainer>
        <Icon icon={ faTimesCircle } />
        <Message>Payment Canceled</Message>
        <Subtext>Your transaction was not completed. Please try again.</Subtext>
      </MessageContainer>
    </Container>
  );
};

export default ErrorPage;
