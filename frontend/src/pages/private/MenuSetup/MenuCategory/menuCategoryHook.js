// src/hooks/useMenuCategories.js
import { useQuery,useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../utils/axiosInstance';

export const useGetMenuCategories = () => {
  return useQuery(
    'menuCategories',
    async () => {
      const response = await axiosInstance.get('/menu-categories');
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

export const useAddMenuCategory = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      async (newMenuCategory) => {
        const response = await axiosInstance.post('/menu-categories', newMenuCategory);
        return response.data;
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries('menuCategories');
          toast.success('Menu category added successfully');
        },
        onError: (error) => {
          toast.error(`Error adding menu category: ${error.message}`);
        },
      }
    );
  };