import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from '../../api';
import './search.css'

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#667292" : state.isFocused ? "#bccad6" : "white",
        ':active': {
            ...provided[':active'],
            backgroundColor: !state.isDisabled
              ? state.isSelected
                ? "#bccad6"
                : "#bccad6"
              : undefined,
          }
    }),
    control: (provided) => ({
        ...provided,
        border: '1px solid #667292',
        boxShadow: 'none',
        '&:hover': {
            border: '1px solid #667292',
        }
    })
}

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="Search for City"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            styles={customStyles}
        />
    )
}

export default Search;