import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { COLOR } from '../../../utils/colors';
import { backend_endpoint } from '../../../utils/apis';
import { useAuth } from '../../../context/AuthContext';
// import { formatDate } from '../../../utils/helper';
import { Link } from 'react-router-dom';
import { Table } from '../../../components/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ROLES } from '../../../utils/enums';
import { toastSuccess, toastError } from '../../../utils/toast';
import { useLocation } from 'react-router-dom';
import SearchBar from '../../../components/search-bar';


const Container = styled.div`

`;

export default function Tasks() {
  const { user } = useAuth();
  const [allTasks, setAllTasks] = useState([]);

  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const { pathname } = useLocation();

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

  const getSortIcon = (key) => {
    if(sortConfig.key !== key)
      return <FontAwesomeIcon className='sorting-icon' icon={ faMinus } style={ { marginLeft: '6px' } } />

    if(sortConfig.direction === 'asc')
      return <FontAwesomeIcon className='sorting-icon' icon={ faCaretDown } style={ { marginLeft: '6px' } } />
    if(sortConfig.direction === 'desc')
      return <FontAwesomeIcon className='sorting-icon' icon={ faCaretUp } style={ { marginLeft: '6px' } } />
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${backend_endpoint}/deletetask/${taskId}`, {
        method: 'DELETE',
      });

      if(response.ok) {
        setAllTasks(allTasks.filter(task => task.id !== taskId));
        toastSuccess('Task deleted successfully!');
      } else {
        toastError('Error deleting task');
      }
    } catch(error) {
      console.error(error);
      toastError('Error deleting task');
    }
  };

  useEffect(() => {
    fetch(`${backend_endpoint}/getalltasks`)
      .then(res => res.json())
      .then(data => {
        setAllTasks(data);
      });
  }, [pathname]);


  let debounceTimeout;

  const searchTasks = (e, delay = 500) => {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      fetch(`${backend_endpoint}/searchtasks?keyword=${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
          setAllTasks(data);
        })
        .catch((err) => {
          console.error('Error fetching search results:', err);
        });
    }, delay);
  };

  return (
    <Container>
      <div style={ { padding: '20px', overflow: 'scroll' } }>
        <h1>All Tasks</h1>
        <br />
        <SearchBar onChange={ searchTasks } />
        <br />
        <Table border="1">
          <thead>
            <tr>
              <th onClick={ () => handleSort('id') }>ID { getSortIcon('id') }</th>
              <th className="th-left" onClick={ () => handleSort('name') }>Task Name { getSortIcon('name') }</th>
              <th onClick={ () => handleSort('category') }>Category { getSortIcon('category') }</th>
              <th onClick={ () => handleSort('subcategory') }>Subcategory { getSortIcon('subcategory') }</th>
              <th onClick={ () => handleSort('priority') }>Priority { getSortIcon('priority') }</th>
              <th onClick={ () => handleSort('status') }>Status { getSortIcon('status') }</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { sortedTasks.length !== 0 &&
              sortedTasks.map((task) => (
                <tr key={ task.id }>
                  <td>{ task.id }</td>
                  <td className="th-left">
                    <Link to={ `/${user?.role == ROLES.ADMIN ? 'admin' : 'employee'}/task/${task.id}` }>
                      { task.name }
                    </Link>
                  </td>
                  <td>{ task.category }</td>
                  <td>{ task.subcategory }</td>
                  <td>{ task.priority }</td>
                  <td>{ task.status }</td>
                  <td>
                    <FontAwesomeIcon
                      icon={ faTrash }
                      style={ { color: 'red', cursor: 'pointer' } }
                      onClick={ () => deleteTask(task.id) }
                    />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
