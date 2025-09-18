import * as Yup from "yup";

const phoneRegex = /^\+994(50|51|55|70|77|99|10)\d{7}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const registerValidationSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, "Too short")
        .max(100, "Too long")
        .required("Full name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    phone: Yup.string().matches(phoneRegex, "Invalid phone format").optional(),

    username: Yup.string()
        .min(2, "Too short")
        .max(100, "Too long")
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
        .test("fileSize", "File too large (max 5MB)", (value: any) => {
            if (!value) return true;
            return value.size <= 1 * 1024 * 1024;
        })
        .test("fileType", "Unsupported file type", (value: any) => {
            if (!value) return true;
            return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
                value.type
            );
        })
        .nullable(),
});

export default registerValidationSchema;
