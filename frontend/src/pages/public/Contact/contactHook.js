import { useMutation, useQueryClient } from'react-query';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';


export const useAddContact = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newOrder) => {
      const response = await axiosInstance.post("/contact", newOrder);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("contacts");
        toast.success("Message sent successfully");
      },
      onError: (error) => {
        toast.error(`Error adding contact: ${error.message}`);
      },
    }
  );
};
