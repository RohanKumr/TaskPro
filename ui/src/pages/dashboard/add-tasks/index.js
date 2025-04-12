import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { FormGroup, FormError, FormInput, FormLabel, FormSelect, FormOption } from '../../../components/form';
import { Button } from '../../../components/common/button';
import { useNavigate } from 'react-router-dom';
import { backend_endpoint } from '../../../utils/apis';
import { useAuth } from '../../../context/AuthContext';

const TaskContainer = styled.div`
  h1 {
    padding-left:16px;
    font-size:38px;
  }
`;

const TaskForm = styled.form`
  display: flex;
  gap: 8px;
  margin: 30px 0;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  max-width:100%;

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


export default function AddTask() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    category: '',
    subcategory: '',
    name: '',
    description: '',
    priority: '',
    startDate: '',
    endDate: '',
    assignedTo: '',
    assignedBy: '',
    remarks: '',
    progress: 0.0,
    status: 'In Progress',
  });


  const [errors, setErrors] = useState({});
  const [allUsers, setAllUsers] = useState(null);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    let errorMessages = {};
    const { category, subcategory, name, description, priority, startDate, endDate, assignedTo } = form;

    if(!category) errorMessages.category = 'Category is required';
    if(!subcategory) errorMessages.subcategory = 'Subcategory is required';
    if(!name) errorMessages.name = 'Task name is required';
    if(!description) errorMessages.description = 'Description is required';
    if(!priority) errorMessages.priority = 'Priority is required';
    if(!startDate) errorMessages.startDate = 'Start date is required';
    if(!endDate) errorMessages.endDate = 'End date is required';
    if(!assignedTo) errorMessages.assignedTo = 'Assigned To is required';

    setErrors(errorMessages);

    return Object.keys(errorMessages).length === 0;
  };

  const addTask = async (form) => {
    await fetch(`${backend_endpoint}/addtask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Task Added!');
        console.log(data);
      })
      .catch((err) => {
        alert('Error adding task');
        console.error(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validate()) {
      addTask(form);
      // Redirect after success
      // navigate('/tasks'); // 
    }
  };

  useEffect(() => { }, [errors]);
  useEffect(() => {
    fetch(`${backend_endpoint}/getallusers`,)
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data)
        console.log(data);
      })
      .catch((err) => {
        alert('Error adding task');
        console.error(err);
      });

    setForm((details) => ({ ...details, assignedBy: user?.id }))
  }, []);

  console.log({ form });

  return (
    <TaskContainer>
      <h1>Add Task</h1>
      <TaskForm onSubmit={ handleSubmit }>
        <FormGroup>
          <FormLabel>Category</FormLabel>
          <FormError>{ errors?.category }</FormError>
          <FormInput
            name="category"
            type="text"
            onChange={ onChangeHandler }
            value={ form.category }
            autoComplete="category"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Subcategory</FormLabel>
          <FormError>{ errors?.subcategory }</FormError>
          <FormInput
            name="subcategory"
            type="text"
            onChange={ onChangeHandler }
            value={ form.subcategory }
            autoComplete="subcategory"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Task Name</FormLabel>
          <FormError>{ errors?.name }</FormError>
          <FormInput
            name="name"
            type="text"
            onChange={ onChangeHandler }
            value={ form.name }
            autoComplete="name"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormError>{ errors?.description }</FormError>
          <FormInput
            name="description"
            type="text"
            onChange={ onChangeHandler }
            value={ form.description }
            autoComplete="description"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Priority</FormLabel>
          <FormError>{ errors?.priority }</FormError>
          <FormSelect
            name="priority"
            value={ form.priority }
            onChange={ onChangeHandler }
          >
            <FormOption value="Low">Low</FormOption>
            <FormOption value="Medium">Medium</FormOption>
            <FormOption value="High">High</FormOption>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Start Date</FormLabel>
          <FormError>{ errors?.startDate }</FormError>
          <FormInput
            name="startDate"
            type="date"
            onChange={ onChangeHandler }
            value={ form.startDate }
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>End Date</FormLabel>
          <FormError>{ errors?.endDate }</FormError>
          <FormInput
            name="endDate"
            type="date"
            onChange={ onChangeHandler }
            value={ form.endDate }
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Assigned To</FormLabel>
          <FormError>{ errors?.assignedTo }</FormError>
          <FormSelect
            name="assignedTo"
            value={ form.assignedTo }
            onChange={ onChangeHandler }
          >
            { allUsers?.map((userInfo) => (
              <FormOption key={ userInfo.id } value={ userInfo.id }>
                { userInfo.name }
              </FormOption>
            )) }
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Remarks</FormLabel>
          <FormInput
            name="remarks"
            type="text"
            onChange={ onChangeHandler }
            value={ form.remarks }
            autoComplete="remarks"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Status</FormLabel>
          <FormSelect
            name="status"
            value={ form.status }
            onChange={ onChangeHandler }
          >
            <FormOption value="In Progress">In Progress</FormOption>
            <FormOption value="Completed">Completed</FormOption>
            <FormOption value="Pending">Pending</FormOption>
          </FormSelect>
        </FormGroup>

        <div><Button type="submit">Add Task</Button></div>
      </TaskForm>
    </TaskContainer>
  );
}
