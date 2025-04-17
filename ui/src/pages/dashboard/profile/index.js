import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { COLOR } from '../../../utils/colors';
import { backend_endpoint } from '../../../utils/apis';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/common/button';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toastError, toastSuccess } from '../../../utils/toast';
import { Container, Header, Heading, FlexContainer, InfoItem } from './styles';



export default function Profile() {
  const { user, login } = useAuth();


  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [image, setImage] = useState(null);


  console.log("My Profile", user?.id)

  useEffect(() => {
    fetch(`${backend_endpoint}/getuserbyid/${user?.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${user?.name}:${user?.password}`)
      },
    })
      .then(res => {
        if(!res.ok) {
          // If the response is not OK, throw an error
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        if(data.length !== 0) {
          login(data);
          // localStorage.setItem("user", JSON.stringify(data));
        } else {
          toastError('User not found');
        }
      })
      .catch(e => {
        // Handle any errors here
        console.error('Error fetching user data:', e);
        toastError(`An error occurred: ${e.message}`);
      });
  }, [user?.id]); // Added user?.id as a dependency for the effect


  useEffect(() => {
    if(user) {
      setFormData({
        name: user.name,
        // role: user.role,
        department: user.department,
        contact: user.contact,
        email: user.email,
        gender: user.gender,
        id: user.id,
        password: user.password
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      // 1. Update user details (excluding image)
      const res1 = await fetch(`${backend_endpoint}/updateuser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if(!res1.ok) {
        throw new Error('Failed to update user details');
      }

      // 2. Update image if available
      if(image && formData.id) {
        const imgFormData = new FormData();
        imgFormData.append('image', image);

        const res2 = await fetch(`${backend_endpoint}/updateuserimage/${formData.id}`, {
          method: 'PUT',
          body: imgFormData
        });

        // const updatedImageUrl = await res2.text();
        // console.log("Updated Image URL:", updatedImageUrl);



        // localStorage.setItem("image", JSON.stringify(updatedImageUrl));


        if(!res2.ok) {
          throw new Error('Failed to update image');
        }
      }

      toastSuccess('User updated successfully');
      setIsEditing(false);
    } catch(err) {
      console.error(err);
      toastError(err.message);
    }
  };

  // console.log(localStorage.getItem("image"));




  return (
    <Container>
      <Heading>{ user?.name ? "Welcome, " + user?.name : "My Profile" }</Heading>
      <hr />
      <br />
      <Header>
        <div className="left">
          <div className="image">
            { image ? (
              <img src={ URL.createObjectURL(image || localStorage.getItem("image")) } alt="User" />
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
        <Button onClick={ () => isEditing ? handleSave() : setIsEditing(true) } style={ { height: "fit-content" } }>
          { isEditing ? "Save" : "Edit" }
        </Button>
      </Header>

      <FlexContainer>
        { Object.entries(formData).filter(([key]) => key !== "role").map(([key, value]) => (
          <InfoItem key={ key }>
            <strong>{ key.charAt(0).toUpperCase() + key.slice(1) }:</strong>
            { isEditing ? (
              <input name={ key } value={ value || '' } onChange={ handleInputChange } />
            ) : (
              value || '-'
            ) }
          </InfoItem>
        )) }
      </FlexContainer>
    </Container>
  );
}
