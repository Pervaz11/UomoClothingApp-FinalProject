export type User = {
    _id?: string;
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber?: string;
    profileImage?: string;
    role?: string;
    isBanned?: boolean;
    banUntil?: Date | null;
    lastLogin?: Date | null;
};

// Register form üçün interface
export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    username: string;
    password: string;
    confirmPassword: string;
    file?: File | null;
}

// File upload üçün interface
export interface FileUpload {
    file: File;
    preview?: string;
    isValid?: boolean;
}