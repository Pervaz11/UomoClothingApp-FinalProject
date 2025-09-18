import instance from './instance';

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await instance.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return (res.data as { url: string }).url;
};