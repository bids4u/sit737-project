import { useQuery } from "react-query";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

export const useGetFixedMenu = (id) => {
    return useQuery(
      'fixedMenu',
      async () => {
        const response = await axiosInstance.get(`/menu/fixed-menu/${id}`);
        console.log(response)
        return response.data.data;
      },
      {
        onError: (error) => {
          toast.error(`Error fetching menu categories: ${error.message}`);
        },
      }
    );
  };