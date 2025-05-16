import { useQuery } from "react-query";
import axiosInstance from "../../../utils/axiosInstance";

// Fetch all slideshow images
export const useGetContacts = () => {
    return useQuery('contacts', async () => {
      const { data } = await axiosInstance.get('/contacts');
      return data;
    });
  };