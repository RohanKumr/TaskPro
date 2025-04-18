import styled from "styled-components";
import { COLOR } from "../../../utils/colors";



export const MenuContainer = styled.div`
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

export const ToggleButton = styled.div`
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


export const MenuItem = styled.div`
  display :flex;
  align-items: center;
  color: ${COLOR.PRIMARY};
  /* background:${COLOR.BACKGROUND}; */
  padding:6px 0;
  margin:10px auto;
  border-radius:4px;
  cursor:pointer;
  `;

export const FontIcon = styled.div`
  
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
export const MenuName = styled.h3`
padding-left:16px;
color:${({ isActive }) => isActive ? 'white' : COLOR.WHITE};
text-shadow:${({ isActive }) => isActive ? '#fff 0px 1px 20px' : COLOR.WHITE} ;
white-space: nowrap;
overflow: hidden;
  `;

export const AuthButton = styled.div`
`;

export const LogoutButton = styled.div`

`;
export const LogoStyle = styled.img`
width:208px;
height:209px;
object-fit:cover;
margin-top:-70px;
/* position:relative; */
border-radius:40px;
transition:300ms ease-out;
`