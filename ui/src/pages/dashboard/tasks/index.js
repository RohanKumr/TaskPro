import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { COLOR } from '../../../utils/colors';
import { backend_endpoint } from '../../../utils/apis';
import { useAuth } from '../../../context/AuthContext';
import { formatDate } from '../../../utils/helper';
import { Link } from 'react-router-dom';


const Container = styled.div`
h1 {
    padding-left:16px;
    font-size:38px;
  }
  `;
const Table = styled.table`
  border-radius:8px;
  width: 100%;
  border:1px solid transparent;
  
  th, tr, td {
    padding:16px;
    text-align:center;
  }
  
  td, th {
    border-radius:2px;
    background:white;
  }
  th {
    background:${COLOR.PRIMARY};
    color:${COLOR.WHITE}

  }

`;

export default function Tasks() {
  const [allTasks, setAllTasks] = useState([]);

  const { user } = useAuth();

  console.log({ user });
  useEffect(() => {
    fetch(`${backend_endpoint}/getalltasks`)
      .then(res => res.json())
      .then(data => {
        setAllTasks(data);
      });
  }, []);

  console.log('All Tasks', allTasks);

  return (
    <Container>
      <h1>All Tasks</h1>
      <div style={ { padding: '20px', overflow: 'scroll' } }>
        <Table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Category</th>
              <th>Subcategory</th>
              {/* <th>Description</th> */ }
              <th>Priority</th>
              {/* <th>Start Date</th> */ }
              {/* <th>End Date</th> */ }
              {/* <th>Assigned To</th> */ }
              {/* <th>Assigned By</th> */ }
              <th>Status</th>
              {/* <th>Progress</th> */ }
              {/* <th>Remarks</th> */ }
            </tr>
          </thead>
          <tbody>
            { allTasks.length !== 0 &&
              allTasks.map((task) => (
                <tr key={ task.id }>
                  <td>{ task.id }</td>
                  <td> <Link to={ `/${user?.role}/task/${task.id}` }>{ task.name }</Link>
                  </td>
                  <td>{ task.category }</td>
                  <td>{ task.subcategory }</td>

                  {/* <td>{ task.description }</td> */ }
                  <td>{ task.priority }</td>
                  {/* <td>{ formatDate(task.startDate) }</td> */ }
                  {/* <td>{ formatDate(task.endDate) }</td> */ }
                  {/* <td>{ task.assignedTo }</td> */ }
                  {/* <td>{ task.assignedBy }</td> */ }
                  <td>{ task.status }</td>
                  {/* <td>{ task.progress }</td> */ }
                  {/* <td>{ task.remarks }</td> */ }
                </tr>
              )) }
          </tbody>
        </Table>
      </div>
    </Container >
  );
}