import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavSearch = (props) => {
    const { onSearch } = props; // Pass an onSearch callback function
    const [isOpen, setIsOpen] = useState(false); // Initialize as closed
    const [searchString, setSearchString] = useState('');

    const searchOnHandler = () => {
        setIsOpen(true);
        setSearchString('');
    };

    const searchOffHandler = () => {
        setIsOpen(false);
        setSearchString('');
    };

    const handleSearch = (event) => {
        const query = event.target.value; // Get the search query from the input field
        setSearchString(query); // Update the search string in the component's state
        onSearch(query); // Execute the search by calling the onSearch callback
    };

    let searchClass = ['main-search'];
    if (isOpen) {
        searchClass = [...searchClass, 'open'];
    }

    return (
        <React.Fragment>
            <div id="main-search" className={searchClass.join(' ')}>
                <div className="input-group">
                    <input
                        type="text"
                        id="m-search"
                        className="form-control"
                        placeholder="Search . . ."
                        style={{ width: searchString }}
                        value={searchString}
                        onChange={handleSearch} // Call the handleSearch function when the input field changes
                    />
                    <Link to="#" className="input-group-append search-close" onClick={searchOffHandler}>
                        <i className="feather icon-x input-group-text" />
                    </Link>
                    <span className="input-group-append search-btn btn btn-primary" onClick={searchOnHandler}>
                        <i className="feather icon-search input-group-text" />
                    </span>
                </div>
            </div>
        </React.Fragment>
    );
};

export default NavSearch;
