import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { backend_endpoint } from '../../../utils/apis';
import { COLOR } from '../../../utils/colors';
import Spinner from '../../../components/spinner';

const Container = styled.div`
  padding: 20px;
`;

const Label = styled.label`
  display: block;
  margin-top: 16px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  margin-top: 20px;
  background: ${COLOR.PRIMARY};
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${backend_endpoint}/gettask/${id}`)
      .then(res => res.json())
      .then(data => setTask(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    fetch(`${backend_endpoint}/updatetask/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
      .then(res => res.json())
      .then(data => {
        alert("Task updated successfully!");
        navigate('/admin/tasks');
      })
      .catch(err => {
        console.error(err);
        alert("Something went wrong!");
      });
  };


  if(task) return <Spinner />;


  return (
    <Container>
      <h2>Edit Task Details</h2>
      <Label>Category</Label>
      <Input name="category" value={ task.category || '' } onChange={ handleChange } />

      <Label>Subcategory</Label>
      <Input name="subcategory" value={ task.subcategory || '' } onChange={ handleChange } />

      <Label>Task Name</Label>
      <Input name="name" value={ task.name || '' } onChange={ handleChange } />

      <Label>Description</Label>
      <TextArea name="description" rows={ 5 } value={ task.description || '' } onChange={ handleChange } />

      <Label>Priority</Label>
      <Input name="priority" value={ task.priority || '' } onChange={ handleChange } />

      <Label>Status</Label>
      <Input name="status" value={ task.status || '' } onChange={ handleChange } />

      <Label>Assigned To</Label>
      <Input name="assignedTo" value={ task.assignedTo || '' } onChange={ handleChange } />

      <Label>Start Date</Label>
      <Input name="startDate" type="date" value={ task.startDate?.split("T")[0] || '' } onChange={ handleChange } />

      <Label>End Date</Label>
      <Input name="endDate" type="date" value={ task.endDate?.split("T")[0] || '' } onChange={ handleChange } />

      <Button onClick={ handleUpdate }>Update Task</Button>
    </Container>
  );
}
