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
    selectedItem: { value: null, label: '', description: '' }
  }),
  withState('selectedItem', 'setSelectedItem', ({ rawValues, name, dataMapper, selectedItem }) => {
    if (selectedItem.value && selectedItem.label) return selectedItem;
    if (!rawValues || !rawValues[name]) return selectedItem;

    return dataMapper(rawValues[name]);
  }),
  withState('results', 'setResults', []),
  withState('q', 'setQ', ({ selectedItem }) => selectedItem.label),
  withHandlers({
    handleSearch: ({ setQ, setResults, fetchData }) => (q) => {
      setQ(q, () => {
        setResults([], () => {
          if (q.length < 3) return;
          fetchData(q).then((response) => setResults(response));
        });
      });
    },
    handleSelect: ({ autoCleanup, results, setQ }) => (label, onSelect) => {
      const item = results.find(p => p.label === label);
      const q = autoCleanup ? '' : item.label;

      setQ(q, () => onSelect(item));
    }
  }),
);
