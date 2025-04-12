import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { COLOR } from '../../../utils/colors';
import { backend_endpoint } from '../../../utils/apis';
import { useAuth } from '../../../context/AuthContext';

const Container = styled.div`
  background-color: #fff;
  padding: 24px;
`;

const Heading = styled.h2`
  /* font-size: 24px; */
  margin-bottom: 16px;
  color: #333;
`;

const FlexContainer = styled.div`
  display:flex;
  flex-direction:column;
  gap: 12px;
  font-size: 14px;
  color: #555;
`;

const InfoItem = styled.div`
  strong {
    display:inline-block;
    color: #000;
    min-width:20%;
  }
`;

export default function Profile() {

  const { user } = useAuth();


  console.log(user)



  return (
    <Container>
      <Heading>My Profile</Heading>
      <hr />
      <br />
      <FlexContainer>
        <InfoItem><strong>Name:</strong> { user?.name || '-' }</InfoItem>
        <InfoItem><strong>Role:</strong> { user?.role || '-' }</InfoItem>
        <InfoItem><strong>Department:</strong> { user?.department || '-' }</InfoItem>
        <InfoItem><strong>Contact:</strong> { user?.contact || '-' }</InfoItem>
        <InfoItem><strong>Email:</strong> { user?.email || '-' }</InfoItem>
        <InfoItem><strong>Gender:</strong> { user?.gender || "Not specified" || '-' }</InfoItem>
        <InfoItem><strong>ID:</strong> { user?.id || '-' }</InfoItem>
        <InfoItem><strong>Password:</strong> { user?.password || '-' }</InfoItem>
      </FlexContainer>
    </Container>
  );
}