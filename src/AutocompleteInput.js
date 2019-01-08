import React from 'react';
import Autocomplete from 'react-autocomplete';

const menuStyle = {
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: '#fff',
  position: 'fixed',
  overflow: 'auto',
  maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
};

const getValue = (q, qValue, name) => {
  if (!q) return '';
  if (qValue && qValue[name]) return qValue[name].label;

  return q;
};

const AutocompleteInput = ({
  label,
  name,
  q,
  results,
  handleSelect,
  handleSearch,
  onSelect,
  placeholder,
  createLink,
  createLabel,
  inputProps,
  formCtx: { setFieldValue, setFormikState, qValue }
}) => (
    <div className="form-group resource-picker">
      {label &&
        <label className="control-label">{label}</label>
      }

      <Autocomplete
        inputProps={inputProps}
        menuStyle={menuStyle}
        wrapperStyle={{ display: 'block' }}
        renderInput={props => <input type="text" className="form-control search-input" placeholder={placeholder} {...props} />}
        getItemValue={item => item.label}
        items={results}
        renderMenu={(items, _value, style) => (
          <div>
            <div style={{ ...style, ...menuStyle }}>
              {items.length > 0 &&
                <div children={items} />
              }
              {createLink &&
                <a href={createLink} className="autocomplete-result additional-link">{createLabel}</a>
              }
            </div>
          </div>
        )}

        renderItem={(item, isHighlighted) =>
          <div key={item.value} className={`autocomplete-result ${isHighlighted ? 'focus' : ''}`}>
            <div className="autocomplete-primary">{item.label}</div>
            <div className="autocomplete-secondary">{item.description}</div>
          </div>
        }
        value={getValue(q, qValue, name)}
        onChange={e => handleSearch(e.target.value)}
        onSelect={value => handleSelect(value, (item) => {
          setFormikState({ qValue: { ...qValue, ...{ [name]: item } } });
          setFieldValue(name, item.value);

          if (typeof onSelect == 'function') {
            onSelect(item);
          }
        })}
      />
    </div>
  );

AutocompleteInput.defaultProps = {
  placeholder: 'Start typing...',
  createLink: false,
  createLabel: false,
};

export default AutocompleteInput;
