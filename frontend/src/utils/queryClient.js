// src/utils/queryClient.js
import { QueryClient } from 'react-query';
import { toast } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    },
    mutations: {
      retry: 3,
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    },
  },
});

export default queryClient;
