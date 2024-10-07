import { useMutation } from "@tanstack/react-query"
import { EmployeeCreateRequest } from "./types"

const createEmployee = async(req: EmployeeCreateRequest) => {
  // normally you'd want to make an axios request to your backend API here
  console.log(req);
}

export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: (req: EmployeeCreateRequest) => createEmployee(req)
  })
}