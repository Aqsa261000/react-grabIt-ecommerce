import * as yup from "yup";

export const signUpSchema = yup.object({
  fullName: yup
    .string()
    .matches(
      /^(\w+)\s+(\w+.*)$/, 
      'Please enter your full name (example: firoz danish)'
    )
    .min(3,"Full Name should be atleast 4 characters")
    .required("Full Name is required"),
  emailAddress: yup
    .string()
    .email("You have entered invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain one uppercase letter")
    .matches(/[0-9]/, "Must contain one number")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
