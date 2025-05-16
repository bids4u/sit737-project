import { useQuery, useMutation, useQueryClient } from'react-query';
import { toast } from'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';

// Hook to get all orders
export const useGetOrders = () => {
  return useQuery(
    'orders',
    async () => {
      const response = await axiosInstance.get('/order');
      return response.data;
    },
    {
      onError: (error) => {
        toast.error(`Error fetching orders: ${error.message}`);
      },
    }
  );
};

// Hook to get a specific order by ID
export const useGetOrderById = (id) => {
  return useQuery(
    ['order', id],
    async () => {
      const response = await axiosInstance.get(`/order/${id}`);
      return response.data.data;
    },
    {
      enabled: !!id,
      onError: (error) => {
        toast.error(`Error fetching order: ${error.message}`);
      },
    }
  );
};

// Hook to add a new order
export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newOrder) => {
      const response = await axiosInstance.post('/order', newOrder);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('orders');
        toast.success('Order added successfully');
      },
      onError: (error) => {
        toast.error(`Error adding order: ${error.message}`);
      },
    }
  );
};

// Hook to update an existing order
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, updatedOrder }) => {
      const response = await axiosInstance.put(`/order/${id}`, updatedOrder);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('orders');
        toast.success('Order updated successfully');
      },
      onError: (error) => {
        toast.error(`Error updating order: ${error.message}`);
      },
    }
  );
};

// Hook to delete an order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const response = await axiosInstance.delete(`/order/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('orders');
        toast.success('Order deleted successfully');
      },
      onError: (error) => {
        toast.error(`Error deleting order: ${error.message}`);
      },
    }
  );
};
