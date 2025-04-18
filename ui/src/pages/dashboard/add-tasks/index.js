import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { FormGroup, FormError, FormInput, FormLabel, FormSelect, FormOption } from '../../../components/form';
import { Button } from '../../../components/common/button';
import { useNavigate } from 'react-router-dom';
import { backend_endpoint } from '../../../utils/apis';
import { useAuth } from '../../../context/AuthContext';
import { toastError, toastSuccess } from '../../../utils/toast';
import { ROLES } from '../../../utils/enums';
import { COLOR } from '../../../utils/colors';

const TaskContainer = styled.div`
  padding: 24px;
  h1 {
    font-size: 32px;
    font-weight: 600;
    color: #222;
    margin-bottom: 24px;
  }
`;

const TaskForm = styled.form`
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



export default function AddTask() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    category: '',
    subcategory: '',
    name: '',
    description: '',
    priority: 'Low',
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
    const { category, subcategory, name, description, priority, startDate, endDate, assignedTo, assignedBy } = form;

    if(!category) errorMessages.category = 'Category is required';
    if(!subcategory) errorMessages.subcategory = 'Subcategory is required';
    if(!name) errorMessages.name = 'Task name is required';
    if(!description) errorMessages.description = 'Description is required';
    if(!priority) errorMessages.priority = 'Priority is required';
    if(!startDate) errorMessages.startDate = 'Start date is required';
    if(!endDate) errorMessages.endDate = 'End date is required';
    if(!assignedTo) errorMessages.assignedTo = 'Assigned To is required';
    if(!assignedBy) errorMessages.assignedBy = 'Assigned By is required';

    setErrors(errorMessages);

    return Object.keys(errorMessages).length === 0;
  };

  const addTask = async (form) => {
    try {
      const response = await fetch(`${backend_endpoint}/addtask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const rawData = await response.text();

      let data;
      try {
        data = JSON.parse(rawData);
      } catch(jsonError) {
        console.error("Error parsing JSON:", jsonError);
        toastError("Invalid response from server.");
        return;
      }

      if(response.ok) {
        toastSuccess('Task Added!');
        // Redirect after success
        if(user?.role === ROLES.ADMIN) navigate('/admin/tasks');
        if(user?.role === ROLES.USER) navigate('/employee/tasks');
      } else {
        toastError(`Error: ${data?.message}`);
      }
    } catch(err) {
      toastError('Error adding task');
      console.error('Fetch error:', err);
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validate()) {
      addTask(form);
    }
  };

  useEffect(() => { }, [errors]);
  useEffect(() => {
    //For the assigned to users
    fetch(`${backend_endpoint}/getallusers`,)
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data)
        console.log(data);
      })
      .catch((err) => {

        toastError('Error adding task');
        console.error(err);
      });

  }, []);

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
            placeholder="Enter Category"
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
            placeholder="Enter Subcategory"
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
            placeholder="Enter Task Name"
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
            placeholder="Enter Description"
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
            value={ form.assignedTo || user?.name }
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
          <FormLabel>Assigned By</FormLabel>
          <FormError>{ errors?.assignedBy }</FormError>
          <FormSelect
            name="assignedBy"
            value={ form.assignedBy }
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
            placeholder="Enter Remarks"
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
