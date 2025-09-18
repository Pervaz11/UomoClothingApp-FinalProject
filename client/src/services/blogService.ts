import axios from 'axios';

export const getAllBlogs = async (page = 1, limit = 100) => {
  const res = await axios.get(`http://localhost:3000/blogs?page=${page}&limit=${limit}`);
  // Əgər blogs array-dırsa onu, yoxsa köhnə backend üçün array kimi qaytar
  const data = res.data as any;
  if (Array.isArray(data)) return data;
  if (data.blogs) return data.blogs;
  return [];
};
