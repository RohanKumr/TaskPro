import styled from "styled-components";
import { COLOR } from "../../../utils/colors";

export const Button = styled.button`
  font-size:16px;
  background: ${COLOR.PRIMARY};
  padding:10px 16px;
  color:${COLOR.WHITE};
  border:none;
  border-radius:4px;
  margin:${(props) => props.margin || "4px 0 0"};
  font-weight:bold;
  
`;