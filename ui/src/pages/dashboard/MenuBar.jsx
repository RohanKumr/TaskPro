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
import { useLocation } from 'react-router-dom';
import { ROLES } from '../../utils/enums';



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
  #admin {
    width:auto;
    font-size:24px;
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
    width:20px;
    text-align:center;
    left: ${({ isOpen }) => (isOpen ? '220px' : '24px')};
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
  
  color:${({ isActive }) => isActive ? COLOR.PRIMARY : COLOR.WHITE} ;
  background:${({ isActive }) => isActive ? COLOR.WHITE : COLOR.PRIMARY} ;
  width:40px;
  min-width:20px;
  text-align:center;
  padding:4px ;
  border-radius:2px;  
  svg {
    font-size: 18px;
    text-shadow:${({ isActive }) => isActive ? '#fff 0px 1px 20px' : COLOR.WHITE} ;
  }

  
`;
const MenuName = styled.h3`
padding-left:16px;
color:${({ isActive }) => isActive ? 'white' : COLOR.WHITE};
text-shadow:${({ isActive }) => isActive ? '#fff 0px 1px 20px' : COLOR.WHITE} ;
white-space: nowrap;
overflow: hidden;
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
transition:300ms ease-out;
`

export default function MenuBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();


  const navigate = useNavigate()
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }



  const roleBasedMenu = {
    [ROLES.ADMIN]: [
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
    [ROLES.USER]: [
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
        to: 'employee/add-task',
        name: 'Add Tasks',
        icon: faPlus,
      },
    ]
  };

  console.log("Navigation", user?.role)

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
                  style={ { color: user?.role === ROLES.ADMIN ? 'red' : 'yellowgreen' } }
                  icon={ user?.role === ROLES.ADMIN ? faIdBadge : faUserTie }
                />
              </FontIcon>

              <Tooltip
                anchorSelect="#admin"
                place="right"
                type="dark"
                effect="solid"
                content={ user?.role === ROLES.ADMIN ? "Admin" : "Employee" }
              />
              <br />
            </>

          ) : (
            <p style={ {
              position: 'relative', zIndex: 1,
              color: user?.role === ROLES.ADMIN ? 'crimson' : 'yellowgreen'
            } }>
              { capitalise(user?.role === ROLES.ADMIN ? 'admin' : "employee") }
            </p>
          ) }

          { isSidebarOpen && (
            <LogoStyle src={ TaskProLogo } alt="TaskPro Logo" />
          ) }

          { roleBasedMenu[user?.role]?.map((menu) => {
            const isActive = location.pathname === menu.to;

            return (
              <Link key={ menu.to } to={ menu.to } style={ { textDecoration: 'none' } }>
                <MenuItem >
                  <FontIcon isActive={ isActive } >
                    <FontAwesomeIcon icon={ menu.icon } />
                  </FontIcon>
                  { isSidebarOpen && <MenuName isActive={ isActive } >{ menu.name }</MenuName> }
                </MenuItem>
              </Link>
            );
          }) }
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
