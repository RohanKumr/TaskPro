import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { COLOR } from '../../../utils/colors';
import { backend_endpoint } from '../../../utils/apis';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/common/button';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  background-color: #fff;
  padding: 24px;
`;

const Heading = styled.h2` 
  margin-bottom: 16px;
  color: #333;
`;

const FlexContainer = styled.div`
  display:flex;
  flex-direction:column;
  gap: 12px;
  font-size: 14px;
  color: #555;
`;

const Header = styled.div`
  display:flex;
  width:100%;
  justify-content:space-between;
  margin-bottom:30px;
  .left {
    display:flex;
    gap:20px;
    align-items:center;
    
    .image {
      width:100px;
      height:100px;
      display:grid;
      place-items:center;
      background: ${COLOR.PRIMARY};
      border-radius:6px;
      overflow: hidden;
      svg {
        color:white;
        font-size:36px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .email {
      padding-top:4px;
      color: ${COLOR.TEXT.GREY}
    }
  }
`;

const InfoItem = styled.div`
  strong {
    display:inline-block;
    color: #000;
    min-width:20%;
  }
  input {
    padding: 4px;
    font-size: 14px;
  }
`;

export default function Profile() {
  const { user, login } = useAuth();


  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [image, setImage] = useState(null);


  useEffect(() => {
    fetch(`${backend_endpoint}/getuserbyid/17`)
      .then(res => res.json())
      .then(data => {
        if(data.length !== 0) {
          login(data)
          // localStorage.setItem("user", JSON.stringify(data));

        }
      })


  }, [])


  useEffect(() => {
    if(user) {
      setFormData({
        name: user.name,
        role: user.role,
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

        if(!res2.ok) {
          throw new Error('Failed to update image');
        }
      }

      alert('User updated successfully');
      setIsEditing(false);
    } catch(err) {
      console.error(err);
      alert(err.message);
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
        <Button onClick={ () => isEditing ? handleSave() : setIsEditing(true) } style={ { height: "fit-content" } }>
          { isEditing ? "Save" : "Edit" }
        </Button>
      </Header>

      <FlexContainer>
        { Object.entries(formData).map(([key, value]) => (
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
