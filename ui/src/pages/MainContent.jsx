import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../utils/colors.js';

const MainContainer = styled.div`
  width:100%;
  padding:20px;
  background: ${COLOR.BACKGROUND};

  @media only screen and (max-width:586px)  {
    flex:1;
  }
`;

export default function MainContent() {
  return (
    <MainContainer >
      <div>Content</div>
    </MainContainer>
  )
}
