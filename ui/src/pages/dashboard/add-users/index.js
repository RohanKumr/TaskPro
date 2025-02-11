import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { FormError, FormInput, FormLabel } from '../../../components/form';
import { ROLES } from '../../../utils/enums'
import { Heading } from '../../../components/common/heading';
import { COLOR } from '../../../utils/colors';
import { Button } from '../../../components/common/button';
import { useAuth } from '../../../context/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';

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
  width:100%;
  max-width:350px;
  /* border:1px solid ${COLOR.PRIMARY}; */
  padding:16px;
  border-radius:8px;
`;

export default function AddUsers() {
  const [form, setForm] = useState({
    role: 'employee',
    email: '',
    password: '',
    confirmPassword: ''
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
  console.log(errors)

  const validate = () => {
    let errorMessages = {};
    const { role, email, password, confirmPassword } = form;

    if(!role) errorMessages.role = "Role is required";
    if(!email) errorMessages.email = "Email is required";
    if(!password) errorMessages.password = "Password is required";
    if(!confirmPassword) errorMessages.confirmPassword = "Confirm Password is required";
    if(password !== confirmPassword) errorMessages.confirmPassword = "Passwords do not match";

    setErrors(errorMessages)

    return Object.keys(errorMessages).length === 0;
  };

  const addUser = async (form) => {
    /** @Params
     * gender
     * name
     * department
     * email
     * password
     * contact
     */

    // api adduser
    await fetch("http://localhost:8080/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then(res => res.json())
      .then(data => console.log(data));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate();
    // console.log(errors);
    // console.log("validating");
    // login(form);

    console.log(form);
    addUser(form);
    // navigate("/login");
  }

  useEffect(() => { }, [errors])

  return (
    <LoginContainer>
      <h1>Add Users</h1>
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

        <FormLabel >Email</FormLabel>
        <FormError>{ errors?.email }</FormError>
        <FormInput
          name="email"
          type="text"
          onChange={ onChangeHandler }
          value={ form.email }
          autoComplete='username'
        />
        <FormLabel >Name</FormLabel>
        <FormError>{ errors?.name }</FormError>
        <FormInput
          name="name"
          type="text"
          onChange={ onChangeHandler }
          value={ form.name }
          autoComplete='name'
        />

        <FormLabel >Department</FormLabel>
        <FormError>{ errors?.department }</FormError>
        <FormInput
          name="department"
          type="text"
          onChange={ onChangeHandler }
          value={ form.department }
          autoComplete='name'
        />

        <FormLabel >Contact</FormLabel>
        <FormError>{ errors?.contact }</FormError>
        <FormInput
          name="contact"
          type="text"
          onChange={ onChangeHandler }
          value={ form.contact }
          autoComplete='contact'
        />

        <FormLabel>Password</FormLabel>
        <FormError>{ errors?.password }</FormError>
        <FormInput
          name="password"
          type="password"
          onChange={ onChangeHandler }
          autoComplete='new-password'
          value={ form.password } />
        <FormLabel>Confirm Password</FormLabel>
        <FormError>{ errors?.confirmPassword }</FormError>
        <FormInput
          name="confirmPassword"
          type="confirmPassword"
          onChange={ onChangeHandler }
          value={ form.confirmPassword } />
        <Button onClick={ handleSubmit } >Add User</Button>
      </LoginForm>

      {/* <Link to='/login'>Already have an account? Login Here!</Link> */ }
    </LoginContainer>
  )
}
