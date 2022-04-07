import React, { useState } from 'react';


export const SearchForm = () => {  
  const [keywords, setKeywords] = useState("");
  const [selectedTable, setSelectedTable] = useState("sources");

  const handleKeywordInput = ({ target }) => {
    setKeywords(target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const tableOptions = [
    {
      name: 'collections',
      label: 'Collections'
    },
    {
      name: 'sources',
      label: 'Sources'
    },
    {
      name: 'entries',
      label: 'Entries'
    }
  ];

  return (
    <form id="searchForm"
    className="search-form"
    onSubmit={handleSubmit}
    >

      <KeywordInputAndSubmitContainer>
        <KeywordInput 
          handleKeywordInput={handleKeywordInput}
          value={keywords} />
        <SubmitSearchButton />  
      </KeywordInputAndSubmitContainer>   

      <TableSelect 
        tableOptions={tableOptions}
        selectedTable={selectedTable} />

      <FieldSelectContainer>

      </FieldSelectContainer>

    </form>
  );
};


const KeywordInputAndSubmitContainer = ({ children }) => (
  <div 
    className="search-form__keyword-container u-margin-bottom-small"
  >
    {children}
  </div>
);

const KeywordInput = ({ handleKeywordInput, keywords }) => (  
  <input 
    autoFocus="autofocus"
    name="searchText" 
    id="keywordInput" 
    className="form__input search-form__keyword-input" 
    placeholder="Keyword(s)" 
    size="60" 
    maxLength="200" 
    onChange={handleKeywordInput}
    value={keywords}
  />
)

const SubmitSearchButton = () => 
  <input 
    id="submitSearch"
    type="submit"
    className="btn btn--blue"
    value="Search" />;

export const TableSelect = ({ tableOptions, selected }) => {

  return (
    <React.Fragment>      
      <TableSelectContainer >
        {tableOptions.map( option => 
          <TableSelectOption 
            key={option.name}
            name={option.name}
            label={option.label}
            selected={option.name === selected}/>
        )}
      </TableSelectContainer>
    </React.Fragment>
  )  
}

export const TableSelectContainer = ({ children }) => {
  return (
    <div id="tableSelect" className="u-margin-bottom-tiny">
      {children}
    </div>
  );
};

export const TableSelectOption = ({ name, label, selected }) => {
  return(
    <React.Fragment>           
      <input 
        className="form__radio-button" 
        type="radio" 
        name="table" 
        value={name} 
        id={name}
        defaultChecked={selected}

      />
      <label htmlFor={name}>
        <b>{label}</b>
      </label>                        
    </React.Fragment>
  );
};

const FieldSelectContainer = ({ children }) => 
  <div className="search-form__basic-search">{children}</div>;


TableSelect.defaultProps = {
  tableOptions: [
    {
      name: 'collections',
      label: 'Collections'
    },
    {
      name: 'sources',
      label: 'Sources'
    },
    {
      name: 'entries',
      label: 'Entries'
    }
  ]
}

TableSelectOption.defaultProps = {
  name: 'name',
  label: 'label'
}