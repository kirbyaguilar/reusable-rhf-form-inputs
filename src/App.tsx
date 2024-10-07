import { DeepMap, FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createEmployeeSchema } from "./validation";
import { EmployeeCreateRequest, EmployeeForm, defaultEmployeeFormValues } from "./types";
import { useCreateEmployee } from "./hooks";
import FormInput from "./components/FormInput";

export default function App() {

  // you can use variable names like `register` as-is, but this is more explicit
  // and will come in handy whenever you need more than 1 form in your component
  const {
    register: createEmployeeFormRegister,
    handleSubmit: createEmployeeFormHandleSubmit,
    getValues: createEmployeeFormGetValues,
    formState: createEmployeeFormState,
  } = useForm<EmployeeForm>({
    defaultValues: defaultEmployeeFormValues,
    mode: 'onBlur',
    resolver: zodResolver(createEmployeeSchema)
  });

  // we must ensure that errors are coerced to the right type
  const { errors: createEmployeeFormErrors } = createEmployeeFormState as {
    errors: Partial<DeepMap<EmployeeForm, FieldError>>
  };

  // simulate a request to the DB on submit
  const createEmployeeMutation = useCreateEmployee();
  const onCreateEmployeeFormSubmit = createEmployeeFormHandleSubmit(() => {
    const payload: EmployeeCreateRequest = { employee: createEmployeeFormGetValues() }
    createEmployeeMutation.mutate(payload);
  })

  return (
    <div className="w-96 p-4">
      <h1 className="text-indigo-500 mb-4">Form with basic inputs</h1>

      <form onSubmit={onCreateEmployeeFormSubmit} className="flex flex-col gap-2">
        <FormInput<EmployeeForm> // don't forget to pass in TFormValues to your FormInput!
          id="first_name"
          name="first_name" // note that here you might pass something like employees.[0].first_name as well
          label="First Name"
          register={createEmployeeFormRegister}
          errors={createEmployeeFormErrors}
          required={true}
        />

        <FormInput<EmployeeForm>
          type="number"
          id="employee_number"
          name="employee_number"
          label="Employee Number"
          register={createEmployeeFormRegister}
          errors={createEmployeeFormErrors}
          required={true}
        />

        <button type="submit" className="rounded-md text-white bg-blue-500 hover:bg-blue-600 p-2">Submit</button>
      </form>
    </div>
  )
}