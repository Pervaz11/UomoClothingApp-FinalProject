import axios from "axios";

export const getAllDestinations = async () => {
  const res = await axios.get("http://localhost:3000/destinations");
  return res.data;
};
