import React from 'react';
import { compose } from 'recompose';

import AutocompleteInput from './AutocompleteInput';
import AutocompleteWithHandlers from './AutocompleteWithHandlers';

const Autocomplete = ({
  name,
  label,
  dataMapper,
  FieldCtxComponent,
  requestProvider,
  searchHandler,
  ...props
}) => {
  const AutocompleteEnhanced = compose(
    requestProvider,
    searchHandler,
    AutocompleteWithHandlers
  )(FieldCtxComponent);

  return (
    <AutocompleteEnhanced
      input={AutocompleteInput}
      name={name}
      label={label}
      dataMapper={dataMapper}
      {...props}
    />
  );
};

export default Autocomplete;
