// components/SearchBar.jsx
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: ${(props) => props.width || '400px'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Icon = styled(FontAwesomeIcon)`
  color: #888;
  margin-right: 0.8rem;
  font-size: 1rem;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 1rem;
  color: #333;

  &::placeholder {
    color: #aaa;
  }
`;

const SearchBar = ({ placeholder = "Search...", value, onChange, width }) => {
  return (
    <SearchContainer width={ width }>
      <Icon icon={ faSearch } />
      <Input
        type="text"
        placeholder={ placeholder }
        value={ value }
        onChange={ onChange }
      />
    </SearchContainer>
  );
};

export default SearchBar;
