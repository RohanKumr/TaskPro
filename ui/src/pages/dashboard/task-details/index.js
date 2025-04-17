import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { backend_endpoint } from '../../../utils/apis';
import { COLOR } from '../../../utils/colors';
import Spinner from '../../../components/spinner';
import { toastError, toastSuccess } from '../../../utils/toast';

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

  function fetchTask() {
    fetch(`${backend_endpoint}/gettaskbyid/${id}`)
      .then(res => res.json())
      .then(data => setTask(data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    fetch(`${backend_endpoint}/updatetask/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        taskid: task?.id,
        remarks: task?.remarks,
        progress: Number(task?.progress)
      }),
    })
      .then(res => res.json())
      .then(data => {
        toastSuccess("Task updated successfully!");
        navigate('/admin/tasks');
      })
      .catch(err => {
        console.error(err);
        toastError("Something went wrong!");
      });
  };

  if(!task) return <Spinner />;

  return (
    <Container>
      <h2>Edit Task Details</h2>

      <Label>Task Name</Label>
      <Input name="name" value={ task?.name || '' } disabled />

      <Label>Category</Label>
      <Input name="category" value={ task?.category || '' } disabled />

      <Label>Subcategory</Label>
      <Input name="subcategory" value={ task?.subcategory || '' } disabled />


      <Label>Description</Label>
      <TextArea name="description" rows={ 5 } value={ task?.description || '' } disabled />

      <Label>Priority</Label>
      <Input name="priority" value={ task?.priority || '' } disabled />

      <Label>Status</Label>
      <Input name="status" value={ task?.status || '' } disabled />

      <Label>Assigned By</Label>
      <Input name="assignedBy" value={ task?.assignedBy || '' } disabled />

      <Label>Assigned To</Label>
      <Input name="assignedTo" value={ task?.assignedTo || '' } disabled />

      <Label>Task Assigned Time</Label>
      <Input name="taskAssignedTime" value={ task?.taskAssignedTime?.split("T")[0] || '' } disabled />

      <Label>Start Date</Label>
      <Input name="startDate" type="date" value={ task?.startDate?.split("T")[0] || '' } disabled />

      <Label>End Date</Label>
      <Input name="endDate" type="date" value={ task?.endDate?.split("T")[0] || '' } disabled />

      <Label>Progress (%)</Label>
      <Input name="progress" type="number" value={ task?.progress } onChange={ handleChange } min={ 0 } max={ 100 } />

      <Label>Remarks</Label>
      <TextArea name="remarks" rows={ 3 } value={ task?.remarks || '' } onChange={ handleChange } />

      <Button onClick={ handleUpdate }>Update Task</Button>
    </Container>
  );
}
