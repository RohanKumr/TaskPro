// src/pages/SuccessPage.js
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Icon = styled(FontAwesomeIcon)`
  color: green;
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

const SuccessPage = () => {
  return (
    <Container>
      <Icon icon={ faCheckCircle } />
      <Message>Payment Successful!</Message>
      <Subtext>Thank you for your purchase. Your order has been placed.</Subtext>
    </Container>
  );
};

export default SuccessPage;
