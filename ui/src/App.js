import './App.css';
import MenuBar from './pages/MenuBar';
import MainContent from './pages/MainContent';
import styled from 'styled-components'
import { useState } from 'react';
import Login from './pages/Login';


const DashboardContainer = styled.div`
  display:flex;
  flex-direction:row;
  min-height:100vh;

  @media only screen and (max-width:586px)  {
    flex-direction:column;
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if(!isLoggedIn) return <Login isLoggedIn={ isLoggedIn } setIsLoggedIn={ isLoggedIn } />

  return (
    <DashboardContainer>
      <MenuBar />
      <MainContent />
    </DashboardContainer>
  );
}

export default App;
