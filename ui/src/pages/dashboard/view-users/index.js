import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { COLOR } from '../../../utils/colors';


const Table = styled.table`
  border-radius:8px;
  width: 100%;
  border:1px solid transparent;
  
  th, tr, td {
    padding:16px;
    text-align:center;
  }
  
  td, th {
    border-radius:8px;
    background:white;
  }
  th {
    background:${COLOR.PRIMARY};
    color:${COLOR.WHITE}

  }

`;

export default function ViewUsers() {
  const [allUsers, setAllUsers] = useState([])
  useEffect(() => {



    fetch('http://localhost:8080/viewallusers')
      .then(res => res.json()).then(data => {

        setAllUsers(data);
      });
  }, [])

  console.log('all users', allUsers);

  return (
    <>
      <h1>All Users</h1>
      <div style={ { padding: "20px", overflow: "scroll" } }>
        <Table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Email</th>
              <th>Password</th>
              <th>Contact Number</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody >
            { allUsers?.length !== 0 && allUsers?.map((user) => (
              <tr key={ user.id }>
                <td>{ user.id }</td>
                <td>{ user.name }</td>
                <td>{ user.gender }</td>
                <td>{ user.department }</td>
                <td>{ user.email }</td>
                <td>{ user.password }</td>
                <td>{ user.contact }</td>
                <td>{ user.role }</td>
              </tr>
            )) }
          </tbody>
        </Table>
      </div>
    </>
  )
}
