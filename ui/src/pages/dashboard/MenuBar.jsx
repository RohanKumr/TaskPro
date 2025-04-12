import React, { useState } from 'react'
import styled from 'styled-components'
import { COLOR } from '../../utils/colors';
import { capitalise } from '../../utils/helper';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import TaskProLogo from "../../images/logo3.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserPlus, faIdBadge, faSignOutAlt,
  faUsers, faTasks, faClipboardList,
  faUser, faPlus, faBars, faTimes,
  faUserTie
} from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip'


const MenuContainer = styled.div`
  background: ${COLOR.PRIMARY};
  width: ${({ isOpen }) => (isOpen ? '250px' : '70px')};
  padding: 20px;
  color: ${COLOR.TEXT.LIGHT};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;

  @media only screen and (max-width: 768px) {
    position: absolute;
    z-index: 999;
    width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    overflow: hidden;
    height: 100vh;
    padding: ${({ isOpen }) => (isOpen ? '20px' : '0')};
  }
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 8px;
  right: 20px;
  color: ${({ isOpen }) => (isOpen ? 'white' : 'black')};
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;

  @media only screen and (min-width: 769px) {
    color:white;
    left: ${({ isOpen }) => (isOpen ? '220px' : '20px')};
    transition: left 0.3s ease;
  }
`;


const MenuItem = styled.div`
  display :flex;
  align-items: center;
  color: ${COLOR.PRIMARY};
  /* background:${COLOR.BACKGROUND}; */
  padding:6px 0;
  margin:10px auto;
  border-radius:4px;
  cursor:pointer;
  `;

const FontIcon = styled.div`
  color: white;
  /* min-width: 20px; */

  
  svg {
    font-size: 18px;
    /* height: auto; */
  }
`;
const MenuName = styled.h3`
padding-left:16px;
color:${COLOR.BACKGROUND};
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
/* position:relative; */
border-radius:40px;
`

export default function MenuBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate()
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  const roleBasedMenu = {
    admin: [
      {
        to: '/admin/tasks',
        name: 'Tasks',
        icon: faTasks,

      },
      {
        to: '/admin/add-tasks',
        name: 'Add Tasks',
        icon: faPlus,

      },
      {
        to: '/admin/view-users',
        name: 'View Users',
        icon: faUsers,

      },
      {
        to: '/admin/add-users',
        name: 'Add User',
        icon: faUserPlus,

      },
      {
        to: '/admin/profile',
        name: 'My Profile',
        icon: faUser,

      },
    ],
    employee: [
      {
        to: 'employee/tasks',
        name: 'Tasks',
        icon: faClipboardList,

      },
      {
        to: 'employee/profile',
        name: 'My Profile',
        icon: faUser,

      },
      {
        to: 'restricted',
        name: 'Add Tasks',
        icon: faPlus,
      },
    ]
  };


  return (
    <>
      <ToggleButton onClick={ () => setIsSidebarOpen(!isSidebarOpen) } isOpen={ isSidebarOpen }>
        <FontAwesomeIcon icon={ isSidebarOpen ? faTimes : faBars } />
      </ToggleButton>

      <MenuContainer isOpen={ isSidebarOpen }>
        <div>

          <br />
          <br />

          { !isSidebarOpen ? (
            <>
              <br />
              <FontIcon id="admin" data-tip={ capitalise(user?.role) }>
                <FontAwesomeIcon
                  style={ { color: user?.role === 'admin' ? 'red' : 'yellowgreen' } }
                  icon={ user?.role === 'admin' ? faIdBadge : faUserTie }
                />
              </FontIcon>

              <Tooltip
                anchorSelect="#admin"
                place="right"
                type="dark"
                effect="solid"
                content={ user?.role === "admin" ? "Admin" : "Employee" }
              />
              <br />
            </>

          ) : (
            <p style={ { position: 'relative', zIndex: 1 } }>
              { capitalise(user?.role) }
            </p>
          ) }

          { isSidebarOpen && (
            <LogoStyle src={ TaskProLogo } alt="TaskPro Logo" />
          ) }

          { roleBasedMenu[user?.role]?.map((menu) => (
            <Link key={ menu.to } style={ { textDecoration: 'none' } } to={ menu.to }  >
              <MenuItem>
                <FontIcon>
                  <FontAwesomeIcon icon={ menu.icon } />
                </FontIcon>
                { isSidebarOpen && <MenuName>{ menu.name }</MenuName> }
              </MenuItem>
            </Link>
          )) }
        </div>

        <AuthButton>
          <MenuItem onClick={ handleLogout }><FontIcon>
            <FontAwesomeIcon icon={ faSignOutAlt } />
          </FontIcon>
            { isSidebarOpen && <MenuName> Logout</MenuName> }
          </MenuItem>
        </AuthButton>
      </MenuContainer>
    </>

  )
}
