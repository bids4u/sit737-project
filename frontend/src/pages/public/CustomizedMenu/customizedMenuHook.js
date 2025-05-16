import { useQuery } from "react-query";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

export const useGetCustomizedMenu = (id) => {
    return useQuery(
      'customizedMenuAll',
      async () => {
        const response = await axiosInstance.get(`/menu/customized-menu/${id}`);
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