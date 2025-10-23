import { object, string } from "joi";

const userValidationSchema = object({
    username: string().min(3).max(30).required(),
    email: string().email().required(),
    password: string().min(6).required(),
    firstName: string().min(2).max(50).required(),
    lastName: string().min(2).max(50).required(),
    phoneNumber: string().allow(""),
});

export default userValidationSchema;