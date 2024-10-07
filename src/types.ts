export type EmployeeForm = {
  first_name: String;
  employee_number: Number;
}

export type EmployeeCreateRequest = {
  employee: EmployeeForm;
}

export const defaultEmployeeFormValues = {
  first_name: '',
  employee_number: 0,
}