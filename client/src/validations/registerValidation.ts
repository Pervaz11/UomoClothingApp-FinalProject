import * as Yup from "yup";

const phoneRegex = /^\+994(50|51|55|70|77|99|10)\d{7}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const registerValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Too short")
        .max(50, "Too long")
        .required("First name is required"),
    lastName: Yup.string()
        .min(2, "Too short")
        .max(50, "Too long")
        .required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
        .matches(phoneRegex, "Invalid phone format")
        .notRequired(),
    username: Yup.string()
        .min(3, "Too short")
        .max(30, "Too long")
        .required("Username is required"),
    password: Yup.string()
        .matches(
            passwordRegex,
            "Password must be at least 8 characters and include 1 uppercase, 1 lowercase, and 1 number"
        )
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    file: Yup.mixed()
        .test("fileSize", "File too large (max 5MB)", (value) => {
            if (!value) return true;
            return value instanceof File ? value.size <= 5 * 1024 * 1024 : true;
        })
        .test("fileType", "Unsupported file type", (value) => {
            if (!value) return true;
            return value instanceof File
                ? ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
                    value.type
                )
                : true;
        })
        .nullable(),
});

export default registerValidationSchema;
