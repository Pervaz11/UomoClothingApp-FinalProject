import instance from "./instance";


type ApiResponse<T> = Promise<T>;

export const getAll = async <T>(endpoint: string): ApiResponse<T> => {
  try {
    const response = await instance.get(endpoint);
    return response.data as T;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch data.");
  }
};

export const getOne = async <T>(
  endpoint: string,
  id: string | number
): ApiResponse<T> => {
  try {
    const response = await instance.get(`${endpoint}/${id}`);
    return response.data as T;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch item.");
  }
};

export const post = async <T, D>(
  endpoint: string,
  data: D,
  options?: object
): ApiResponse<T> => {
  try {
    const response = await instance.post(
      endpoint,
      data,
      options
    );
    return response.data as T;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create item.");
  }
};

export const patch = async <T, D>(
  endpoint: string,
  id: string | number,
  data: D
): ApiResponse<T> => {
  try {
    const response = await instance.patch(
      `${endpoint}/${id}`,
      data
    );
    return response.data as T;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update item.");
  }
};

export const remove = async <T>(
  endpoint: string,
  id: string | number
): ApiResponse<T> => {
  try {
    const response = await instance.delete(
      `${endpoint}/${id}`
    );
    return response.data as T;
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete item.");
  }
};