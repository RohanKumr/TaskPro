import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../utils/colors';
import { capitalise } from '../../utils/helper';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import TaskProLogo from "../../images/logo3.jpg";


const MenuContainer = styled.div`
  background:${COLOR.PRIMARY};
  width:300px;
  padding:20px;
  color: ${COLOR.TEXT.LIGHT};
  
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  position: fixed;
  height:100%;
  h1 {
    margin:0;
  };

  @media only screen and (max-width:586px)  {
    width:100%;
    position:static;
  }
`;

const MenuItem = styled.h3`
  color: ${COLOR.PRIMARY};
  background:${COLOR.BACKGROUND};
  padding:6px 10px;
  margin:10px auto;
  border-radius:4px;
  cursor:pointer;
`;

const AuthButton = styled.div`
`;

const LogoutButton = styled.div`

`;
const LogoStyle = styled.img`
width:208px;
height:209px;
object-fit:cover;
margin-top:-70px;
position:relative;
`

export default function MenuBar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  const roleBasedMenu = {
    admin: [
      {
        to: '/admin/add-users',
        name: 'Add User'
      },
      {
        to: '/admin/view-users',
        name: 'View Users'
      },

      {
        to: '/admin/add-tasks',
        name: 'Add Tasks'
      },
      {
        to: '/admin/tasks',
        name: 'Tasks'
      },
    ],
    employee: [
      {
        to: '/tasks',
        name: 'Tasks'
      },
      {
        to: '/my-profile',
        name: 'My Profile'
      },
      {
        to: '/add-tasks',
        name: 'Add Tasks'
      },
    ]
  }


  console.log(roleBasedMenu);


  return (
    <MenuContainer>
      <div>
        <p style={ {
          position: "relative",
          zIndex: 1
        } } >{ capitalise(user?.role) }</p>
        {/* <h1>TaskPro</h1> */ }

        <LogoStyle src={ TaskProLogo } alt="TaskPro Logo" />

        {
          roleBasedMenu[user?.role]?.map((menu) => <Link to={ menu.to }><MenuItem > { menu.name } </MenuItem></Link>)
        }

        {/* <MenuItem >
          Menu Item 1
        </MenuItem>
        <MenuItem >
          Menu Item 2
        </MenuItem>
        <MenuItem >
          Menu Item 3
        </MenuItem> */}
      </div>

      <AuthButton>
        <LogoutButton onClick={ () => handleLogout() }>
          Logout
        </LogoutButton>
      </AuthButton>
    </MenuContainer>
  )
}
