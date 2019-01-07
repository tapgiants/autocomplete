import {
  compose,
  withHandlers,
  withState,
  defaultProps,
  setDisplayName
} from 'recompose';

export default compose(
  setDisplayName('AutocompleteWithHandlers'),
  defaultProps({
    autoCleanup: false,
    selectedItem: { id: null, name: '', description: '' }
  }),
  withState('selectedItem', 'setSelectedItem', ({ rawValues, name, dataMapper, selectedItem }) => {
    if (selectedItem.id && selectedItem.name) return selectedItem;
    if (!rawValues || !rawValues[name]) return selectedItem;

    return dataMapper(rawValues[name]);
  }),
  withState('results', 'setResults', []),
  withState('q', 'setQ', ({ selectedItem }) => selectedItem.name),
  withHandlers({
    handleSearch: ({ setQ, setResults, fetchData }) => (q) => {
      setQ(q, () => {
        setResults([], () => {
          if (q.length < 3) return;
          fetchData(q).then((response) => setResults(response));
        });
      });
    },
    handleSelect: ({ autoCleanup, results, setQ }) => (name, onSelect) => {
      const item = results.find(p => p.name === name);
      const q = autoCleanup ? '' : item.name;

      setQ(q, () => onSelect(item));
    }
  }),
);
