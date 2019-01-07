import React from 'react';

const withGQLSearch = (gqlFieldProps) => (BaseComponent) => (contextProps) => {
  const { client, dataMapper } = contextProps;

  const { query, path, filterInputMapper } =
    (typeof gqlFieldProps === 'function') ? gqlFieldProps(contextProps) : gqlFieldProps;

  const defaultFilterMapper =
    () => { throw new Error('withGQLSearch: filterInputMapper not implemented') };

  const filterInputMapperHandler = filterInputMapper || defaultFilterMapper;

  const fetchData = async (q) => {
    const { data } = await client.query({
      query: query,
      variables: { filter: filterInputMapperHandler(q) }
    });

    const dataMapperHandler = dataMapper || ((item) => ({ id: item.id, name: item.name }));

    return data[path].list.map(item => dataMapperHandler(item));
  };

  return <BaseComponent fetchData={fetchData} {...contextProps} {...gqlFieldProps} />
}

export default withGQLSearch;
