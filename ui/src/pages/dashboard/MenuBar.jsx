import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../utils/colors';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MenuContainer = styled.div`
  background:${COLOR.PRIMARY};
  width:300px;
  padding:20px;
  color: ${COLOR.TEXT.LIGHT};
  
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  h1 {
    margin:0;
  };

  @media only screen and (max-width:586px)  {
    width:100%;
  }
`;

const MenuItem = styled.h3`
  color: ${COLOR.PRIMARY};
  background:${COLOR.BACKGROUND};
  padding:6px 10px;
  margin:10px auto;
  border-radius:4px;
`;

const AuthButton = styled.div`
`;

const LogoutButton = styled.div`

`;

export default function MenuBar() {
  const navigate = useNavigate()
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  return (
    <MenuContainer>
      <div>
        <h1>TaskPro</h1>
        <MenuItem >
          Menu Item 1
        </MenuItem>
        <MenuItem >
          Menu Item 2
        </MenuItem>
        <MenuItem >
          Menu Item 3
        </MenuItem>
      </div>

      <AuthButton>
        <LogoutButton onClick={ () => handleLogout() }>
          Logout
        </LogoutButton>
      </AuthButton>
    </MenuContainer>
  )
}
