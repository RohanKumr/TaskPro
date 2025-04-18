import React, { useEffect, useState } from 'react';
import { backend_endpoint } from '../../../utils/apis';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/common/button';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toastError, toastSuccess } from '../../../utils/toast';
import { Container, Header, Heading, FlexContainer, InfoItem } from './styles';
import { ROLES } from '../../../utils/enums';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`${backend_endpoint}/getuserbyid/${user?.id}`)
      .then(res => {
        if(!res.ok) throw new Error(`Error: ${res.status} - ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        if(data.length !== 0) {
          login(data);
        } else {
          toastError('User not found');
        }
      })
      .catch(e => console.error('Error fetching user data:', e));
  }, [user?.id]);

  useEffect(() => {
    if(user) {
      setFormData({
        name: user.name || '',
        department: user.department || '',
        contact: user.contact || '',
        email: user.email || '',
        gender: user.gender || '',
        id: user.id,
        password: user.password || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' })); // clear error on change
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if(!formData.name) newErrors.name = "Name is required.";
    if(!formData.email) {
      newErrors.email = "Email is required.";
    } else if(!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if(!formData.contact) newErrors.contact = "Contact is required.";
    if(!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if(!validateForm()) {
      toastError("Please fix the validation errors.");
      return;
    }

    try {
      const res1 = await fetch(`${backend_endpoint}/updateuser`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if(!res1.ok) throw new Error('Failed to update user details');

      if(image && formData.id) {
        const imgFormData = new FormData();
        imgFormData.append('image', image);

        const res2 = await fetch(`${backend_endpoint}/updateuserimage/${formData.id}`, {
          method: 'PUT',
          body: imgFormData
        });

        if(!res2.ok) throw new Error('Failed to update image');
      }

      toastSuccess('User updated successfully');
      setIsEditing(false);
    } catch(err) {
      console.error(err);
      toastError(err.message);
    }
  };

  return (
    <Container>
      <Heading>{ user?.name ? "Welcome, " + user?.name : "My Profile" }</Heading>
      <hr />
      <br />
      <Header>
        <div className="left">
          <div className="image">
            { image ? (
              <img src={ URL.createObjectURL(image) } alt="User" />
            ) : (
              <FontAwesomeIcon icon={ faUser } />
            ) }
          </div>
          <div>
            <h2>{ formData.name || "User Name" }</h2>
            <div className='email'>{ formData.email || "email missing" }</div>
            { isEditing && (
              <input type="file" accept="image/*" onChange={ handleImageChange } />
            ) }
          </div>
        </div>
        <FlexContainer>
          <Link to={ `${user?.role === ROLES.ADMIN ? '/admin/checkout' : '/employee/checkout'}` }>
            <Button style={ { display: 'flex', gap: '16px' } }>
              <FontAwesomeIcon icon={ faStar } /> <p> Purchase Pro</p>
            </Button>
          </Link>
        </FlexContainer>
      </Header>

      <FlexContainer>
        { Object.entries(formData)
          .filter(([key]) => key !== "role")
          .map(([key, value]) => (
            <InfoItem key={ key }>
              <strong>{ key.charAt(0).toUpperCase() + key.slice(1) }:</strong>
              { isEditing ? (
                <div>
                  <input
                    type={ key === "password" ? "password" : "text" }
                    name={ key }
                    value={ value }
                    onChange={ handleInputChange }
                  />
                  { errors[key] && (
                    <div className="error">{ errors[key] }</div>
                  ) }

                </div>
              ) : (
                key === "password" ? "••••••••" : value || '-'
              ) }
            </InfoItem>
          )) }
      </FlexContainer>

      <br />
      <br />

      { isEditing && <Button onClick={ () => setIsEditing(false) } style={ { marginRight: "16px" } }>
        Cancel
      </Button> }

      <Button onClick={ () => isEditing ? handleSave() : setIsEditing(true) } style={ { height: "fit-content" } }>
        { isEditing ? "Save" : "Edit" }
      </Button>

    </Container>
  );
}
