// src/components/CheckoutForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { ROLES } from '../../../utils/enums';
import { useAuth } from '../../../context/AuthContext';

const Container = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background-color: #f6f6f6;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 0.8rem;
  background-color: #5e0231;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background-color: #7a083f;
  }
`;

const CheckoutForm = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: 'Premium Version',
    amount: '25.99',
    quantity: 1,
    currency: 'usd',
    successUrl: `${window.location.origin}${user?.role === ROLES.ADMIN ? '/admin/success' : '/employee/success'}`,
    cancelUrl: `${window.location.origin}${user?.role === ROLES.ADMIN ? '/admin/cancel' : '/employee/cancel'}`,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'amount' || name === 'quantity' ? parseFloat(value) : value,
    }));
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch('http://localhost:8000/product/v1/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if(!res.ok) {
        throw new Error('Failed to create Stripe session');
      }

      const data = await res.json();

      if(data && data.sessionUrl) {
        // Redirect to Stripe
        window.location.href = data.sessionUrl;
      } else {
        alert('Something went wrong with Stripe session');
      }

    } catch(err) {
      alert('Stripe API Error: ' + err.message);
    }
  };


  return (
    <Container>
      <Title>Buy Product</Title>
      <Label>Product Name</Label>
      <Input name="name" value={ form.name } onChange={ handleChange } disabled />

      <Label>Amount (USD)</Label>
      <Input name="amount" type="number" step="0.01" value={ form.amount } onChange={ handleChange } disabled />

      <Label>Quantity</Label>
      <Input name="quantity" type="number" value={ form.quantity } onChange={ handleChange } disabled />

      <Button onClick={ handleCheckout }>Pay Now</Button>
    </Container>
  );
};

export default CheckoutForm;
