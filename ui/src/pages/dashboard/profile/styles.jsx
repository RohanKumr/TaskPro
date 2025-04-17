import styled from "styled-components";
import { COLOR } from "../../../utils/colors";


export const Container = styled.div`
  background-color: #fff;
  padding: 24px;
`;

export const Heading = styled.h2` 
  margin-bottom: 16px;
  color: #333;
`;

export const FlexContainer = styled.div`
  display:flex;
  flex-direction:column;
  gap: 12px;
  font-size: 14px;
  color: #555;
`;

export const Header = styled.div`
  display:flex;
  width:100%;
  justify-content:space-between;
  margin-bottom:30px;
  .left {
    display:flex;
    gap:20px;
    align-items:center;
    
    .image {
      width:100px;
      height:100px;
      display:grid;
      place-items:center;
      background: ${COLOR.PRIMARY};
      border-radius:6px;
      overflow: hidden;
      svg {
        color:white;
        font-size:36px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .email {
      padding-top:4px;
      color: ${COLOR.TEXT.GREY}
    }
  }
`;

export const InfoItem = styled.div`
  strong {
    display:inline-block;
    color: #000;
    min-width:20%;
  }
  input {
    padding: 4px;
    font-size: 14px;
  }
`;