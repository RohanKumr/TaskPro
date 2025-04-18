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
      <Icon icon={ faTimesCircle } />
      <Message>Payment Canceled</Message>
      <Subtext>Your transaction was not completed. Please try again.</Subtext>
    </Container>
  );
};

export default ErrorPage;
