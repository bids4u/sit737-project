import { useMutation } from 'react-query';
import axiosInstance from '../../../utils/axiosInstance';

const loginUser = async (data) => {
  const response = await axiosInstance.post('/users/login', data);
  return response.data;
};

export const useLogin = () => {
  return useMutation(loginUser);
};
