import styled from 'styled-components'
import { COLOR } from '../../utils/colors'


export const FormInput = styled.input`
    border:1px solid ${COLOR.PRIMARY};
    padding:6px 12px;
    border-radius:4px;
  `
export const FormError = styled.p`
  color:${COLOR.ERROR};
  
`;