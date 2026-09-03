import React from 'react';

const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  icon: Icon,
  helpText,
  className = '',
  options = [],
  ...rest
}) => {
  const inputBase = 'w-full px-4 py-3 border rounded-lg text-base focus:outline-none focus:ring-2 focus:border-transparent';
  const borderClass = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary';
  const iconPadding = Icon ? 'pl-10' : '';

  return (
    <div className={`w-full mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Icon size={18} />
          </div>
        )}
        
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${inputBase} ${borderClass} ${iconPadding}`}
            rows="4"
            {...rest}
          />
        ) : type === 'select' ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`${inputBase} ${borderClass} ${iconPadding}`}
            {...rest}
          >
            <option value="" disabled>{placeholder || 'Select an option'}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${inputBase} ${borderClass} ${iconPadding}`}
            {...rest}
          />
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helpText && !error && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
};

export default Input;
