import React, { useState } from 'react'
import styled from 'styled-components';
import { FormError, FormInput } from '../../components/form';
import { ROLES } from '../../utils/enums'
import { Heading } from '../../components/common/heading';
import { COLOR } from '../../utils/colors';
import { Button } from '../../components/common/button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
min-height:100vh;
`;

const Roles = styled.div`
display:flex;
gap:20px;

`;

const Role = styled.div`
background:${(props) => props.active ? COLOR.PRIMARY : COLOR.BACKGROUND};
color:${(props) => props.active ? COLOR.WHITE : COLOR.TEXT.DARK};
padding:6px 16px;
font-weight:bold;
border-radius:4px;
border: 1px solid ${COLOR.PRIMARY};
&:hover {
  background: ${COLOR.PRIMARY};
  cursor:pointer;
  color:${COLOR.WHITE}
}
`;

const LoginForm = styled.form`
  display:flex;
  flex-direction: column;
  gap:8px;
  margin:30px 0;
  border:1px solid ${COLOR.PRIMARY};
  padding:16px;
  border-radius:8px;
`;

export default function Login() {
  const [form, setForm] = useState({
    role: 'employee',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const selectRole = (role) => {
    setForm(prev => ({ ...prev, role }))
  }

  console.log(form);
  console.log(errors);


  const handleSubmit = (e) => {
    e.preventDefault();

    const validate = () => {
      const { role, email, password } = form;
      if(!role) {
        setErrors(prev => ({ ...prev, role: "role is required" }));
        return;
      }
      if(!email) {
        setErrors(prev => ({ ...prev, email: "email is required" }));
        return;
      }
      if(!password) {
        setErrors(prev => ({ ...prev, password: "password is required" }));
        return;
      }
      setErrors({});
    };
    login(form);
    validate();
    navigate("/");
  }

  return (
    <LoginContainer>
      <Heading margin="24px"  >Login</Heading>
      <LoginForm >
        <Roles>
          <Role
            active={ (form.role === ROLES.ADMIN).toString() }
            onClick={ () => selectRole(ROLES.ADMIN) }
          >Admin</Role>
          <Role
            active={ form.role === ROLES.EMPLOYEE }
            onClick={ () => selectRole(ROLES.EMPLOYEE) }>Employee</Role>
        </Roles>
        <FormError>{ errors?.role }</FormError>

        <label >Username</label>
        <FormError>{ errors?.username }</FormError>
        <FormInput
          name="email"
          type="text"
          onChange={ onChangeHandler }
          value={ form.email }
          autoComplete='username'
        />
        <label >Password</label>
        <FormError>{ errors?.password }</FormError>
        <FormInput
          name="password"
          type="password"
          onChange={ onChangeHandler }
          autoComplete='new-password'
          value={ form.password } />
        <Button onClick={ () => handleSubmit } >Login</Button>
      </LoginForm>
    </LoginContainer>
  )
}
