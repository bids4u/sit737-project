import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../utils/axiosInstance';

export const useGetSpecialOfferById = (id) => {
  return useQuery(
    ['specialOffer', id],
    async () => {
      const response = await axiosInstance.get(`/special-offer/${id}`);
      return response.data;
    },
    {
      enabled: !!id, // Only run the query if `id` is truthy
      onError: (error) => {
        toast.error(`Error fetching special offer: ${error.message}`);
      },
    }
  );
};

export const useUpdateSpecialOffer = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, updatedSpecialOffer }) => {
      const response = await axiosInstance.put(`/special-offer/${id}`, updatedSpecialOffer);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('specialOffers');
        toast.success('Special offer updated successfully');
      },
      onError: (error) => {
        toast.error(`Error updating special offer: ${error.message}`);
      },
    }
  );
};

export const useDeleteSpecialOffer = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const response = await axiosInstance.delete(`/special-offer/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('specialOffers');
        toast.success('Special offer deleted successfully');
      },
      onError: (error) => {
        toast.error(`Error deleting special offer: ${error.message}`);
      },
    }
  );
};

export const useGetAllActiveOffersTillToday = () => {
  return useQuery(
    'activeOffers',
    async () => {
      const response = await axiosInstance.get('/special-offer/active-till-today');
      return response.data.data;
    },
    {
      onError: (error) => {
        toast.error(`Error fetching active offers: ${error.message}`);
      },
    }
  );
};

export const useGetAllSpecialOffers= () => {
    return useQuery(
      'specialOffers',
      async () => {
        const response = await axiosInstance.get('/special-offer');
        return response.data;
      },
      {
        onError: (error) => {
          toast.error(`Error fetching active offers: ${error.message}`);
        },
      }
    );
  };

export const usePostSpecialOffer = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      async (newSpecialOffer) => {
        const response = await axiosInstance.post('/special-offer', newSpecialOffer);
        return response.data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('specialOffers');
          toast.success('Special offer created successfully');
        },
        onError: (error) => {
          toast.error(`Error creating special offer: ${error.message}`);
        },
      }
    );
  };