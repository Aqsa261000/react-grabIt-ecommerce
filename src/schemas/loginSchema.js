import * as yup from "yup"

export const loginSchema=yup.object({
    emailAddress: yup
        .string()
        .email("You have entered an invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required"),
})