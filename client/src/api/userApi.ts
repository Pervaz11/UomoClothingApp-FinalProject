const API_URL = "http://localhost:3000/";

// Send forgot password email
export async function forgotPassword(email: string): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error("Failed to send password reset email");

    return res.json();
}

// Get all users
import type { User } from "../types/userTypes";

export async function getAllUsers(): Promise<User[]> {
    const res = await fetch(`${API_URL}auth/users`);

    if (!res.ok) throw new Error("Failed to fetch users list");

    const data = await res.json();

    return data.data || [];
}

// Ban a user
export async function banUser(id: string): Promise<User> {
    const res = await fetch(`${API_URL}auth/users/ban/${id}`, {
        method: "PATCH",
    });

    if (!res.ok) throw new Error("Failed to ban user");

    return res.json();
}

// Unban a user
export async function unbanUser(id: string): Promise<User> {
    const res = await fetch(`${API_URL}auth/users/unban/${id}`, {
        method: "PATCH",
    });

    if (!res.ok) throw new Error("Failed to unban user");

    return res.json();
}
