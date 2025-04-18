import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { FormGroup, FormError, FormInput, FormLabel, FormOption, FormSelect } from '../../../components/form';
import { ROLES } from '../../../utils/enums'
import { Heading } from '../../../components/common/heading';
import { COLOR } from '../../../utils/colors';
import { Button } from '../../../components/common/button';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { backend_endpoint } from '../../../utils/apis';
import { toastError, toastSuccess } from '../../../utils/toast';

const Container = styled.div`
  padding: 24px;
  h1 {
    font-size: 32px;
    font-weight: 600;
    color: #222;
    margin-bottom: 24px;
  }
`;




const LoginForm = styled.form`
  background: ${COLOR.TERITARY};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  width: 100%;
  max-width: 100%;

  > div {
    flex: 1 1 45%;
    min-width: 260px;
  }

  > div:last-child {
    flex: 1 1 100%;
    display: flex;
    justify-content: flex-start;
  }

  @media (max-width: 768px) {
    gap: 24px;
    padding: 24px;

    > div {
      flex: 1 1 100%;
    }

    > div:last-child {
      justify-content: center;
    }
  }
`;

export default function AddUsers() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: ROLES.USER,
    email: '',
    name: '',
    gender: 'male',
    department: '',
    contact: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const onChangeHandler = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectRole = (role) => {
    setForm((prev) => ({ ...prev, role }));
  };

  const validate = () => {
    const errorMessages = {};
    const { email, name, password, confirmPassword, gender, department, contact } = form;

    if(!email) errorMessages.email = "Email is required";
    else if(!/\S+@\S+\.\S+/.test(email)) errorMessages.email = "Invalid email";

    if(!name) errorMessages.name = "Name is required";
    if(!gender) errorMessages.gender = "Gender is required";
    if(!department) errorMessages.department = "Department is required";
    if(!contact) errorMessages.contact = "Contact is required";
    else if(!/^\d{10}$/.test(contact)) errorMessages.contact = "Enter a valid 10-digit number";

    if(!password) errorMessages.password = "Password is required";
    if(!confirmPassword) errorMessages.confirmPassword = "Confirm Password is required";
    if(password && confirmPassword && password !== confirmPassword)
      errorMessages.confirmPassword = "Passwords do not match";

    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const addUser = async (formData) => {
    try {
      const res = await fetch(`${backend_endpoint}/adduser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authentication": JSON.stringify({
            username: user?.username,
            password: user?.password,
          }),
        },
        body: JSON.stringify(formData),
      });

      const result = await res.text();

      if(res.ok) {
        toastSuccess(result || "User Added!");
        navigate("/admin/view-users");
      } else {
        toastError(result);
      }
    } catch(err) {
      toastError("Something went wrong!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validate()) {
      await addUser(form);
    }
  };

  return (
    <Container>
      <h1>Add Users</h1>
      <LoginForm onSubmit={ handleSubmit }>
        <FormGroup>
          <FormLabel>Type</FormLabel>
          {/* <FormError>{ errors?.email }</FormError> */ }
          <FormInput
            name="employee"
            type="text"
            // placeholder="Enter Email"
            onChange={ onChangeHandler }
            value={ 'Employee' }
            // autoComplete="username"
            disabled
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Email</FormLabel>
          <FormError>{ errors?.email }</FormError>
          <FormInput
            name="email"
            type="email"
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
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Gender</FormLabel>
          <FormError>{ errors?.gender }</FormError>
          <FormSelect name="gender" value={ form.gender } onChange={ onChangeHandler }>
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
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Contact</FormLabel>
          <FormError>{ errors?.contact }</FormError>
          <FormInput
            name="contact"
            type="text"
            placeholder="Enter Contact Number"
            onChange={ onChangeHandler }
            value={ form.contact }
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
            placeholder="Confirm Password"
            onChange={ onChangeHandler }
            value={ form.confirmPassword }
          />
        </FormGroup>


        <div>
          <Button type="submit">Add User</Button>
        </div>
      </LoginForm>
    </Container >
  );
}
