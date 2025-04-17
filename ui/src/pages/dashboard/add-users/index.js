import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { FormGroup, FormError, FormInput, FormLabel, FormOption, FormSelect } from '../../../components/form';
import { ROLES } from '../../../utils/enums'
import { Heading } from '../../../components/common/heading';
import { COLOR } from '../../../utils/colors';
import { Button } from '../../../components/common/button';
import { useAuth } from '../../../context/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { backend_endpoint } from '../../../utils/apis';
import { toastError, toastSuccess } from '../../../utils/toast';

const LoginContainer = styled.div`
  h1 {
    padding-left:16px;
    font-size:38px;
  }

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
  display: flex;
  gap: 8px;
  margin: 30px 0;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  /* max-width: 350px; */
  max-width:100%;
  /* flex-direction: column; */
  flex-wrap:wrap;
  gap: 40px;
  > div {
    width:100%;
    max-width:40%;
  }
  &:last-child {
    width:auto;
  }

  @media only screen and (max-width:786px) {
    gap:16px;
    >div {
      max-width:100%;
    }
  }
  `;
export default function AddUsers() {
  const [form, setForm] = useState({
    role: ROLES.USER,
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male'
  })
  const { user } = useAuth();

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
    const { role, email, password, confirmPassword, gender } = form;

    if(!role) errorMessages.role = "Role is required";
    if(!email) errorMessages.email = "Email is required";
    if(!password) errorMessages.password = "Password is required";
    if(!gender) errorMessages.gender = "Gender is required";
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
    try {

      const res = await fetch(`${backend_endpoint}/adduser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authentication": JSON.stringify({
            username: user?.username,
            password: user?.password
          })
        },
        body: JSON.stringify(form),
      })

      const result = await res.text();

      if(res.ok) {
        toastSuccess(result || "User Added!")
        navigate("/admin/view-users");
      } else {
        toastError(result);
      }
    } catch {
      toastError('Something went wrong!')
    }
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
          {/* <Role
            active={ form.role === ROLES.ADMIN }
            onClick={ () => selectRole(ROLES.ADMIN) }
          >Admin</Role> */}
          <Role
            active={ form.role === ROLES.USER }
            onClick={ () => selectRole(ROLES.USER) }>Employee</Role>
        </Roles>
        <FormError>{ errors?.role }</FormError>

        <FormGroup>
          <FormLabel>Email</FormLabel>
          <FormError>{ errors?.email }</FormError>
          <FormInput
            name="email"
            type="text"
            placeholder="Enter Email"
            onChange={ onChangeHandler }
            value={ form.email }
            autoComplete="username"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Name</FormLabel>
          <FormError>{ errors?.name }</FormError>
          <FormInput
            name="name"
            type="text"
            placeholder="Enter Full Name"
            onChange={ onChangeHandler }
            value={ form.name }
            autoComplete="name"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Gender</FormLabel>
          <FormError>{ errors?.gender }</FormError>
          <FormSelect
            name="gender"
            value={ form.gender }
            onChange={ onChangeHandler }
          >
            <FormOption value="male">Male</FormOption>
            <FormOption value="female">Female</FormOption>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Department</FormLabel>
          <FormError>{ errors?.department }</FormError>
          <FormInput
            name="department"
            type="text"
            placeholder="Enter Department"
            onChange={ onChangeHandler }
            value={ form.department }
            autoComplete="name"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Contact</FormLabel>
          <FormError>{ errors?.contact }</FormError>
          <FormInput
            name="contact"
            type="text"
            placeholder="Enter Contact"
            onChange={ onChangeHandler }
            value={ form.contact }
            autoComplete="contact"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormError>{ errors?.password }</FormError>
          <FormInput
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={ onChangeHandler }
            autoComplete="new-password"
            value={ form.password }
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Confirm Password</FormLabel>
          <FormError>{ errors?.confirmPassword }</FormError>
          <FormInput
            name="confirmPassword"
            type="password"
            placeholder="Enter Password"
            onChange={ onChangeHandler }
            value={ form.confirmPassword }
          />
        </FormGroup>
        <div></div>
        <div>
          <Button onClick={ handleSubmit }>Add User</Button>
        </div>

      </LoginForm>

      {/* <Link to='/login'>Already have an account? Login Here!</Link> */ }
    </LoginContainer>
  )
}
