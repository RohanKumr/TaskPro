import styled from "styled-components";
import { COLOR } from "../../../utils/colors";


export const Container = styled.div`
  background-color: #fff;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-radius:10px;
 
`;

export const Heading = styled.h2` 
    font-size: 32px;
    font-weight: bold;
    color: black;
    margin-bottom: 24px;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 15px;
  color: #333;
  background-color: #f9f9f9;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const InfoItem = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  align-items: flex-start;
  gap: 12px;

  strong {
    font-weight: 600;
    color: #222;
    margin-top: 8px;
  }

  input {
    width: 100%;
    padding: 10px 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border 0.2s, box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: #5e72e4;
      box-shadow: 0 0 0 3px rgba(94, 114, 228, 0.2);
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .error {
    color: #e63946;
    font-size: 13px;
    margin-top: 4px;
  }
`;



export const Header = styled.div`
  display:flex;
  width:100%;
  flex-wrap:wrap;
  gap:16px;
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

