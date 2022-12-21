import { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from '../../images/search_icon.svg';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  Input,
} from './SearchBar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [filter, setFilter] = useState('');

  const handleInputChange = e => {
    setFilter(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(filter);
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <span>
            <SearchIcon width="28" height="28" />
          </span>
        </SearchFormButton>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={filter}
          onChange={handleInputChange}
        />
      </SearchForm>
    </SearchBar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
