import React from 'react'
import MainContent from './MainContent';
import MenuBar from './side-menu/MenuBar';
import styled from 'styled-components';
import SEO from '../../components/seo';

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
    <>
      <SEO />
      <DashboardContainer>
        <MenuBar />
        <MainContent />
      </DashboardContainer>
    </>
  )
}
