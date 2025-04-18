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
const MessageContainer = styled.div`
  display:grid;
  place-items:center;
  background:white;
  padding:46px 24px;
  border-radius:10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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
      <MessageContainer>
        <Icon icon={ faCheckCircle } />
        <Message>Payment Successful!</Message>
        <Subtext>Thank you for your purchase. Your order has been placed.</Subtext>
      </MessageContainer>
    </Container>
  );
};

export default SuccessPage;
