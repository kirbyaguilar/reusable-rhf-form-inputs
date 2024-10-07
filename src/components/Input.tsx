import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

export type InputType = 'text' | 'email' | 'date' | 'time' | 'datetime' | 'number';

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: InputType;
  className?: string;
  placeholder?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((
  {
    id,
    name,
    label,
    type = 'text',
    className = '',
    placeholder,
    ...props
  },
  ref
) => {
  return (
    <input
      id={id}
      ref={ref}
      name={name}
      type={type}
      aria-label={label}
      placeholder={placeholder}
      // change this to however inputs should be styled in your project
      className={classNames(
        'block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition',
        className
      )}
      {...props}
    />
  );
});
