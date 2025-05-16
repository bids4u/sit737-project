import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../utils/axiosInstance';

// Hook to get all customizable menu items
export const useGetCustomizableMenus = () => {
  return useQuery(
    'customizableMenu',
    async () => {
      const response = await axiosInstance.get('/customizable-menus');
      return response.data.data;
    },
    {
      onError: (error) => {
        toast.error(`Error fetching customizable menu items: ${error.message}`);
      },
    }
  );
};

// Hook to add a new customizable menu item
export const useAddCustomizableMenu = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newCustomizableMenuItem) => {
      // Ensure newCustomizableMenuItem is a FormData object
      if (!(newCustomizableMenuItem instanceof FormData)) {
        throw new Error("Expected FormData object");
      }

      const response = await axiosInstance.post('/customizable-menus', newCustomizableMenuItem, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('customizableMenu');
        toast.success('Customizable menu item added successfully');
      },
      onError: (error) => {
        toast.error(`Error adding customizable menu item: ${error.message}`);
      },
    }
  );
};

// Hook to update a customizable menu item
export const useUpdateCustomizableMenu = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, updatedCustomizableMenuItem }) => {
      // Ensure updatedCustomizableMenuItem is a FormData object
      if (!(updatedCustomizableMenuItem instanceof FormData)) {
        throw new Error("Expected FormData object");
      }

      const response = await axiosInstance.put(`/customizable-menus/${id}`, updatedCustomizableMenuItem, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('customizableMenu');
        toast.success('Customizable menu item updated successfully');
      },
      onError: (error) => {
        toast.error(`Error updating customizable menu item: ${error.message}`);
      },
    }
  );
};

// Hook to delete a customizable menu item
export const useDeleteCustomizableMenu = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const response = await axiosInstance.delete(`/customizable-menus/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('customizableMenu');
        toast.success('Customizable menu item deleted successfully');
      },
      onError: (error) => {
        toast.error(`Error deleting customizable menu item: ${error.message}`);
      },
    }
  );
};
