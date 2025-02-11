import styled from 'styled-components'
import { COLOR } from '../../utils/colors'


export const FormInput = styled.input`
    border:1px solid transparent;
    padding:8px 17px;
    border-radius:4px;
    font-size:17px;
    &:focus-visible{
      outline:none;
      border:1px solid ${COLOR.PRIMARY}
    }
  `
export const FormError = styled.p`
  color:${COLOR.ERROR};
  font-size:small;
  
`;

export const FormLabel = styled.label`
  font-weight:bold;
  `