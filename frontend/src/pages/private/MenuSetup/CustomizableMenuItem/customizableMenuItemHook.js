import { useQuery,useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../utils/axiosInstance';

export const useGetCustomizableMenuItems = () => {

  return useQuery(
    'customizableMenuItems',
    async () => {
      const response = await axiosInstance.get('/customizable-items');
      return response.data.data;
    },
    {
      onError: (error) => {
        toast.error(`Error fetching customizable menu items: ${error.message}`);
      },
    }
  );
};

export const useAddCustomizableMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newMenuItem) => {
      const response = await axiosInstance.post('/customizable-items', newMenuItem);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('customizableMenuItems');
        toast.success('Customizable Menu item added successfully');
      },
      onError: (error) => {
        toast.error(`Error adding customizable menu item: ${error.message}`);
      },
    }
  );
};

export const useUpdateCustomizableMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, updatedMenuItem }) => {

      const response = await axiosInstance.put(`/customizable-items/${id}`, updatedMenuItem);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('customizableMenuItems');
        toast.success('Customizable Menu item updated successfully');
      },
      onError: (error) => {
        toast.error(`Error updating customizable menu item: ${error.message}`);
      },
    }
  );
};

export const useDeleteCustomizableMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const response = await axiosInstance.delete(`/customizable-items/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('customizableMenuItems');
        toast.success('Customizable Menu item deleted successfully');
      },
      onError: (error) => {
        toast.error(`Error deleting customizable menu item: ${error.message}`);
      },
    }
  );
};
