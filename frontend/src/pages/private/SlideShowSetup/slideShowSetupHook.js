import { useQuery, useMutation, useQueryClient } from 'react-query';
import axiosInstance from '../../../utils/axiosInstance';

// Fetch all slideshow images
export const useGetSlideshowImages = () => {
  return useQuery('slideshowImages', async () => {
    const { data } = await axiosInstance.get('/slide-show');
    return data;
  });
};

// Add a new slideshow image
export const useAddSlideshowImage = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (formData) => {
      const { data } = await axiosInstance.post('/slide-show', formData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('slideshowImages');
      },
    }
  );
};

// Update an existing slideshow image
export const useUpdateSlideshowImage = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, updatedSlideshowImage }) => {
      const { data } = await axiosInstance.put(`/slide-show/${id}`, updatedSlideshowImage);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('slideshowImages');
      },
    }
  );
};

// Delete a slideshow image
export const useDeleteSlideshowImage = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      await axiosInstance.delete(`/slide-show/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('slideshowImages');
      },
    }
  );
};
