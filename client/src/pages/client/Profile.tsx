// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface FormData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profileImage?: File;
  email?: string;
  role?: string;
}

interface ProfilePageProps {
  userId: string;
  token: string;
}

interface User {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phoneNumber?: string;
  profileImage?: string;
  email?: string;
  role?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId, token }) => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [previewImage, setPreviewImage] = useState("");

  // Backend URL
  const API_URL = `http://localhost:3000/auth/users/${userId}`;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data);
        setFormData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [API_URL, token]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const form = new FormData();
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      // Only append if value is not undefined
      if (formData[key] !== undefined) {
        form.append(key, formData[key] as any);
      }
    });

    try {
      const res = await axios.patch(
        `http://localhost:3000/auth/users/update/${userId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser(res.data.data);
      setEditMode(false);
      alert("Profil uğurla yeniləndi!");
    } catch (err) {
      console.error(err);
      alert("Xəta baş verdi!");
    }
  };

  if (!user) return <div className="text-center mt-10">Yüklənir...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-10">
      <div className="flex flex-col items-center">
        <img
          src={previewImage || user.profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4 border"
        />
        {!editMode ? (
          <>
            <h2 className="text-2xl font-bold mb-2">{user.fullName}</h2>
            <p className="text-gray-600 mb-1">Email: {user.email}</p>
            <p className="text-gray-600 mb-1">Telefon: {user.phoneNumber || "-"}</p>
            <p className="text-gray-600 mb-4">Rol: {user.role}</p>
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Redaktə Et
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                placeholder="Ad"
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                placeholder="Soyad"
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                placeholder="Telefon nömrəsi"
                className="border p-2 rounded-lg col-span-2"
              />
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="col-span-2"
              />
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Ləğv et
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Yadda saxla
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
