import { useQuery,useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../utils/axiosInstance';

export const useGetMenuItems = () => {

  return useQuery(
    'menuItems',
    async () => {
      const response = await axiosInstance.get('/fixed-menu-items');
      return response.data.data;
    },
    {
      onError: (error) => {
        toast.error(`Error fetching menu items: ${error.message}`);
      },
    }
  );
};

export const useAddMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newMenuItem) => {
      // Ensure newMenuItem is a FormData object
      if (!(newMenuItem instanceof FormData)) {
        throw new Error("Expected FormData object");
      }

      const response = await axiosInstance.post('/fixed-menu-items', newMenuItem, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('menuItems');
        toast.success('Menu item added successfully');
      },
      onError: (error) => {
        toast.error(`Error adding menu item: ${error.message}`);
      },
    }
  );
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, updatedMenuItem }) => {
      // Ensure updatedMenuItem is a FormData object
      if (!(updatedMenuItem instanceof FormData)) {
        throw new Error("Expected FormData object");
      }

      const response = await axiosInstance.put(`/fixed-menu-items/${id}`, updatedMenuItem, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('menuItems');
        toast.success('Menu item updated successfully');
      },
      onError: (error) => {
        toast.error(`Error updating menu item: ${error.message}`);
      },
    }
  );
};

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const response = await axiosInstance.delete(`/fixed-menu-items/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('menuItems');
        toast.success('Menu item deleted successfully');
      },
      onError: (error) => {
        toast.error(`Error deleting menu item: ${error.message}`);
      },
    }
  );
};
