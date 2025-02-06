import React from 'react'
import MainContent from './MainContent';
import MenuBar from './MenuBar';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display:flex;
  flex-direction:row;
  min-height:100vh;

  @media only screen and (max-width:586px)  {
    flex-direction:column;
  }
`;


export default function Dashboard() {
  return (
    <DashboardContainer>
      <MenuBar />
      <MainContent />
    </DashboardContainer>
  )
}
