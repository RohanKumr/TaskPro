import React, { useState, useEffect } from 'react'
import { capitalise } from '../../../utils/helper';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import TaskProLogo from "../../../images/logo3.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserPlus, faIdBadge, faSignOutAlt,
  faUsers, faTasks, faClipboardList,
  faUser, faPlus, faBars, faTimes,
  faUserTie
} from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip'
import { useLocation } from 'react-router-dom';
import { ROLES } from '../../../utils/enums';
import { ToggleButton, MenuContainer, MenuItem, MenuName, FontIcon, LogoStyle, AuthButton } from './style';





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
        to: '/employee/tasks',
        name: 'Tasks',
        icon: faClipboardList,

      },
      {
        to: '/employee/profile',
        name: 'My Profile',
        icon: faUser,

      },
      {
        to: '/employee/add-task',
        name: 'Add Tasks',
        icon: faPlus,
      },
    ]
  };

  useEffect(() => {
    if(window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);



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
