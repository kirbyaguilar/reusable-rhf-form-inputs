import {
  Path,
  UseFormRegister,
  FieldValues,
  DeepMap,
  FieldError,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Input, InputProps } from "./Input";

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  outerDivClassName?: string;
  innerDivClassName?: string;
  inputClassName?: string;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  isErrorMessageDisplayed?: boolean; // use ONLY in cases where there are no error messages possible, or you want to display all of a form's errors away from individual inputs
} & Omit<InputProps, 'name'>;

const FormInput = <TFormValues extends FieldValues>({
  outerDivClassName,
  innerDivClassName,
  inputClassName,
  name,
  label,
  register,
  errors,
  isErrorMessageDisplayed = true,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <div className={outerDivClassName}>
      <div className={innerDivClassName}>
        <label htmlFor={name} className="text-xs">{label}{props.required && '*'}</label>
        <Input
          name={name}
          label={label}
          className={inputClassName}
          { ...props }
          { ...(register && register(name)) }
        />
      </div>
      { isErrorMessageDisplayed && <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => (
            <p className="text-xs text-red-500">
              {message}
            </p>
          )}
        /> }
    </div>
  );
}

export default FormInput;