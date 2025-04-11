import React, { useState } from 'react'
import styled from 'styled-components';
import { FormError, FormInput, FormLabel } from '../../components/form';
import { ROLES } from '../../utils/enums'
import { Heading } from '../../components/common/heading';
import { COLOR } from '../../utils/colors';
import { Button } from '../../components/common/button';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import TaskProLogo from '../../images/logo3.jpg';
import { backend_endpoint } from '../../utils/apis';
import { toastError } from '../../utils/toast';

const LoginContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
min-height:100vh;
background:${COLOR.PRIMARY};
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
  padding:40px 13px;
  width:100%;
  max-width:350px;
  background:${COLOR.BACKGROUND};
  border-radius:8px;
  box-shadow:0 0 21px 0px ${COLOR.PRIMARY};
  `;

const LogoStyle = styled.img`
    width:300px;
    height:auto;
  `;

export default function Login() {
  const [form, setForm] = useState({
    role: 'employee',
    email: '',
    password: '',
    id: 5,
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

  const validate = () => {
    let errorMessages = {};
    const { role, email, password } = form;

    if(!role) errorMessages.role = "Role is required";
    if(!email) errorMessages.email = "Email is required";
    if(!password) errorMessages.password = "Password is required";

    setErrors(errorMessages);

    return Object.keys(errorMessages).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log("Clicked on login");
    e.preventDefault();
    setErrors({})
    console.log("handling Submit");

    console.log({ form });
    if(!validate()) return;


    if(form?.role === 'admin') {
      login(form);
      navigate("/admin/tasks");
    }

    const loginBody = {
      email: form?.email,
      password: form?.password
    };

    if(form?.role === 'employee') {

      try {
        const res = await fetch(`${backend_endpoint}/verifyuserlogin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(loginBody),
        });

        console.log("Response OK", res.ok);

        if(res.ok) {
          const data = await res.json();
          console.log({ data });
          login(data)
          navigate("/employee/tasks");
        } else {
          toastError(await res.text());
        }

      } catch {
        toastError("Something went wrong!")
      }
    }
  }

  return (
    <LoginContainer>

      <LogoStyle src={ TaskProLogo } alt="TaskPro Logo" />

      {/* <Heading color={ COLOR.WHITE } margin="24px"  >Login</Heading> */ }
      <LoginForm >
        <Roles>
          <Role
            active={ form.role === ROLES.ADMIN }
            onClick={ () => selectRole(ROLES.ADMIN) }
          >Admin</Role>
          <Role
            active={ form.role === ROLES.EMPLOYEE }
            onClick={ () => selectRole(ROLES.EMPLOYEE) }>Employee</Role>
        </Roles>
        <FormError>{ errors?.role }</FormError>

        <FormLabel >Username</FormLabel>
        <FormError>{ errors?.email }</FormError>
        <FormInput
          name="email"
          type="text"
          onChange={ onChangeHandler }
          value={ form.email }
          autoComplete='username'
        />
        <FormLabel >Password</FormLabel>
        <FormError>{ errors?.password }</FormError>
        <FormInput
          name="password"
          type="password"
          onChange={ onChangeHandler }
          autoComplete='new-password'
          value={ form.password } />
        <Button onClick={ handleSubmit } >Login</Button>
      </LoginForm>
      {/* <Link to='/signup' style={ { color: COLOR.WHITE } } >Don't have an account? Sing up here!</Link> */ }
    </LoginContainer>
  )
}
