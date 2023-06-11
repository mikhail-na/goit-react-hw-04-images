import PropTypes from 'prop-types'
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Searchbar, SearchForm, SearchBtn, SearchInput, SearchBtnLabel } from './Searchbar.module';

export const SearchbarEl = ({ onSubmit }) => {
  
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = ({ currentTarget: { value } }) => {
    const currentValue = value.toLowerCase()
    setInputValue(currentValue);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      toast.info('Please, enter search word!');
      return;
    }

    onSubmit(inputValue);
    setInputValue('');
  };


  // const { inputValue } = this.state;
  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit" >
          <SearchBtnLabel >Search</SearchBtnLabel>
        </SearchBtn>
        <SearchInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="inputValue"
          value={inputValue}
          onChange={handleInputChange}
        />

          
      </SearchForm>
    </Searchbar>
  );
};

SearchbarEl.propTypes = {
  onSubmit: PropTypes.func.isRequired
}