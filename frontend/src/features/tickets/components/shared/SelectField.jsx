import React from 'react';

const SelectField = ({
    label,
    value,
    onChange,
    options,
    optionKey,
    optionLabel,
    showRole,
    disableEmptyOption = false,
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
        </label>
        <select
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {options.map((opt, idx) => {
                const optionValue = opt[optionKey] ?? opt.value ?? '';
                const isEmpty = optionValue === '';

                return (
                    <option
                        key={optionValue || idx}
                        value={optionValue}
                        disabled={disableEmptyOption && isEmpty}
                    >
                        {opt[optionLabel] ?? opt.label}
                        {showRole && opt.role ? ` (${opt.role})` : ''}
                    </option>
                );
            })}
        </select>
    </div>
);

export default SelectField;