import styled from "styled-components";
import { COLOR } from "../../utils/colors";

export const Table = styled.table`
  border-radius:8px;
  width: 100%;
  border:1px solid transparent;
  
  th, tr, td {
    padding:16px;
    text-align:center;
  }
  
  td, th {
    border-radius:2px;
    background:white;
  }
  th {
    background:${COLOR.PRIMARY};
    color:${COLOR.WHITE}

  }
  tr:hover td{
    background:${COLOR.TERITARY}
  }

  .th-left {
    text-align:left;
  }

  .sorting-icon {
    width:10px;
  }
`;