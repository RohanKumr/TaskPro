import styled from 'styled-components'
import { COLOR } from '../../utils/colors'


export const FormGroup = styled.div`
`;


export const FormSelect = styled.select`
    border:1px solid transparent;
    padding:8px 17px;
    border-radius:4px;
    font-size:17px;
    width:100%;
    margin-top:8px;
    &:focus-visible{
      outline:none;
      border:1px solid ${COLOR.PRIMARY}
    }
  `

export const FormInput = styled.input`
    border:1px solid transparent;
    width:100%;
    padding:8px 17px;
    border-radius:4px;
    font-size:17px;
    margin-top:8px;
    &:focus-visible{
      outline:none;
      border:1px solid ${COLOR.PRIMARY}
    }
  `
export const FormOption = styled.option`
    border:1px solid transparent;
    padding:8px 17px;
    border-radius:4px;
    font-size:17px;
    width:100%;
    &:focus-visible{
      outline:none;
      border:1px solid ${COLOR.PRIMARY}
    }
    `
export const FormError = styled.p`
  color:${COLOR.ERROR};
  font-size:small;
  width:100%;
`;

export const FormLabel = styled.label`
  font-weight:bold;
  padding-bottom:4px;
  `