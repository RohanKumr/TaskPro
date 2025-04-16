import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { COLOR } from '../../../utils/colors';
import { backend_endpoint } from '../../../utils/apis';
import { useAuth } from '../../../context/AuthContext';
// import { formatDate } from '../../../utils/helper';
import { Link } from 'react-router-dom';
import { Table } from '../../../components/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faMinus } from '@fortawesome/free-solid-svg-icons';



const Container = styled.div`
h1 {
    padding-left:16px;
    font-size:38px;
  }
  `;

export default function Tasks() {
  const { user } = useAuth();
  const [allTasks, setAllTasks] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const sortedTasks = React.useMemo(() => {
    if(!sortConfig.key) return allTasks;

    return [...allTasks].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if(aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if(aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [allTasks, sortConfig]);


  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  console.log({ sortConfig })

  const getSortIcon = (key) => {
    if(sortConfig.key !== key)
      return <FontAwesomeIcon className='sorting-icon' icon={ faMinus } style={ { marginLeft: '6px' } } />

    if(sortConfig.direction === 'asc')
      return <FontAwesomeIcon className='sorting-icon' icon={ faCaretDown } style={ { marginLeft: '6px' } } />
    if(sortConfig.direction === 'desc')
      return <FontAwesomeIcon className='sorting-icon' icon={ faCaretUp } style={ { marginLeft: '6px' } } />
  };



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
              <th onClick={ () => handleSort('id') }>ID { getSortIcon('id') }</th>
              <th className="th-left" onClick={ () => handleSort('name') }>Task Name { getSortIcon('name') }</th>
              <th onClick={ () => handleSort('category') }>Category { getSortIcon('category') }</th>
              <th onClick={ () => handleSort('subcategory') }>Subcategory { getSortIcon('subcategory') }</th>
              <th onClick={ () => handleSort('priority') }>Priority { getSortIcon('priority') }</th>
              <th onClick={ () => handleSort('status') }>Status { getSortIcon('status') }</th>
            </tr>
          </thead>


          {/* <th>Description</th> */ }
          {/* <th>Start Date</th> */ }
          {/* <th>End Date</th> */ }
          {/* <th>Assigned To</th> */ }
          {/* <th>Assigned By</th> */ }
          {/* <th>Progress</th> */ }
          {/* <th>Remarks</th> */ }
          <tbody>
            { sortedTasks.length !== 0 &&
              sortedTasks.map((task) => (
                <tr key={ task.id }>
                  <td>{ task.id }</td>
                  <td className="th-left" ><Link to={ `/${user?.role}/task/${task.id}` }>{ task.name }</Link></td>
                  <td>{ task.category }</td>
                  <td>{ task.subcategory }</td>
                  <td>{ task.priority }</td>
                  <td>{ task.status }</td>
                </tr>
              )) }
          </tbody>

          {/* <td>{ formatDate(task.startDate) }</td> */ }
          {/* <td>{ formatDate(task.endDate) }</td> */ }
          {/* <td>{ task.assignedTo }</td> */ }
          {/* <td>{ task.assignedBy }</td> */ }
          {/* <td>{ task.description }</td> */ }
          {/* <td>{ task.progress }</td> */ }
          {/* <td>{ task.remarks }</td> */ }
        </Table>
      </div>
    </Container >
  );
}