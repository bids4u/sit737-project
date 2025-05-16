import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GenericTable from '../../../../components/GenericTable';
import { useAddMenuCategory, useGetMenuCategories } from './menuCategoryHook';

// Define validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

function MenuCategory() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch menu categories and handle loading and error states
  const { data: menuCategories, error, isLoading } = useGetMenuCategories();
  const { mutate: addMenuCategory } = useAddMenuCategory();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Initialize react-hook-form with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    addMenuCategory(data, {
      onSuccess: () => {
        closeModal(); // Close modal after submitting
      },
    });
  };

  // Define columns for the table
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
  ];

  // Show loading or error state
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching menu categories: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Menu Categories Setup</h1>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Menu Category
        </button>
      </div>
      <GenericTable columns={columns} data={menuCategories || []} />
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Add Menu Category</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 mr-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuCategory;
