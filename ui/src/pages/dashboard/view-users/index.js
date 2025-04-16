import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { backend_endpoint } from '../../../utils/apis';
import { toastError, toastSuccess } from '../../../utils/toast';
import { Table } from '../../../components/table';


const DeleteButton = styled.table`
padding:4px 6px;
border-radius: 6px;
color:red;
cursor: pointer;
&:hover{
  background:red;
  color:white;
  transition:300ms;
}
`;

export default function ViewUsers() {
  const [allUsers, setAllUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${backend_endpoint}/viewallusers`)
      const data = await res.json();
      setAllUsers(data);
    } catch {
      toastError("Failed to load users ")
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`${backend_endpoint}/deleteuser/${id}`, {
        method: "DELETE"
      });

      console.log('Response Status:', res.status); // Logs the HTTP status code
      console.log('Response OK:', res.ok); // Logs true/false

      const result = await res.text();

      if(res.ok) {
        toastSuccess(result);
        fetchUsers();
      } else {
        toastError(result.message || "Failed to delete user");
      }

    } catch {
      toastError('Some error occured');
    }

    fetch(`${backend_endpoint}/deleteuser/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json()).then(data => {
        toastError("User Deleted");
        fetchUsers();
      });

  }

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
              <th>Action</th>


            </tr>
          </thead>
          <tbody >
            { allUsers?.length !== 0 && allUsers?.map((user) => (
              <tr key={ user.id }>
                <td>{ user.id }</td>
                <td  >{ user.name }</td>
                <td>{ user.gender }</td>
                <td>{ user.department }</td>
                <td>{ user.email }</td>
                <td>{ user.password }</td>
                <td>{ user.contact }</td>
                <td>{ user.role }</td>
                <td><DeleteButton onClick={ () => deleteUser(user.id) } >delete</DeleteButton></td>
              </tr>
            )) }
          </tbody>
        </Table>
      </div>
    </>
  )
}
