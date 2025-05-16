import { useQuery,useMutation } from 'react-query';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance'

export const useGetAllMenus = () => {
  return useQuery(
    'allMenus', // The query key
    async () => {
        const response = await axiosInstance.get('/menu');
        return response.data.data;
      }, // The function that fetches the data
    {
      onError: (error) => {
        toast.error(`Error fetching menus: ${error.message}`);
      },
      // Add any other options here, such as stale time, cache time, etc.
    }
  );
};


export const useBuyNow = () => {
  return useMutation(
    async (orderData) => {
      const response = await axiosInstance.post('/order', orderData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast.success('Order placed successfully!');
        // Optionally, you can redirect or clear the cart here
      },
      onError: (error) => {
        toast.error(`Error placing order: ${error.message}`);
      },
      // Add any other options here, such as onSettled, etc.
    }
  );
};



export const useUploadImage = () => {
  return useMutation(
    async (file) => {
      const formData = new FormData();
      formData.append('image', file);
      const response = await axiosInstance.post('/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.imageUrl; // Make sure this matches your API response
    },
    {
      onError: (error) => {
        toast.error(`Error uploading image: ${error.message}`);
      },
    }
  );
};

export const useGetHome = () => {
  return useQuery(
    'homedatas', // The query key
    async () => {
      const response = await axiosInstance.get('/home');
      return response.data; // Ensure this matches the structure of your API response
    },
    {
      onError: (error) => {
        toast.error(`Error fetching offers and images: ${error.message}`);
      },
      // Optionally, add other options such as stale time, cache time, etc.
    }
  );
};