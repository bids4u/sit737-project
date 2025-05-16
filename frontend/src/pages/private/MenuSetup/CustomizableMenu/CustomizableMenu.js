import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GenericTable from '../../../../components/GenericTable';
import { useAddCustomizableMenu, useDeleteCustomizableMenu, useGetCustomizableMenus, useUpdateCustomizableMenu } from './customizableMenuHook';

// Define validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  base_price: yup.number().required('Base price is required').positive('Base price must be positive'),
  image_file: yup.mixed().test('required', 'Image file is required', (value) => value || false),
});

function CustomizableMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null); // State to track item being edited

  // Fetch customizable menus and handle loading and error states
  const { data: customizableMenus, error: menusError, isLoading: menusLoading } = useGetCustomizableMenus();
  const { mutate: addCustomizableMenu } = useAddCustomizableMenu();
  const { mutate: updateCustomizableMenu } = useUpdateCustomizableMenu();
  const { mutate: deleteCustomizableMenu } = useDeleteCustomizableMenu();

  const openModal = (item = null) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditItem(null);
    setIsModalOpen(false);
  };

  // Initialize react-hook-form with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue('image_file', file);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('base_price', data.base_price);
    if (data.image_file) {
      formData.append('image_file', data.image_file);
    }

    if (editItem) {
      updateCustomizableMenu({ id: editItem._id, updatedCustomizableMenu: formData }, {
        onSuccess: () => {
          closeModal(); // Close modal after updating
        },
      });
    } else {
      addCustomizableMenu(formData, {
        onSuccess: () => {
          closeModal(); // Close modal after adding
        },
      });
    }
  };

  // Define columns for the table
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Base Price',
      accessor: 'base_price',
    },
    {
      Header: 'Image',
      accessor: 'image_url', // Display the image URL or image itself
      Cell: ({ value }) => (
        value ? <img src={value} alt="Customizable Menu" className="w-16 h-16 object-cover" /> : 'No image'
      ),
    },
    {
      Header: 'Action',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => openModal(row.original)}
            className="text-blue-600 hover:text-blue-900"
          >
            Edit
          </button>
          <button
            onClick={() => deleteCustomizableMenu(row.original._id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Show loading or error state
  if (menusLoading) return <p>Loading customizable menus...</p>;
  if (menusError) return <p>Error fetching customizable menus: {menusError.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Customizable Menus Setup</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Customizable Menu
        </button>
      </div>
      <GenericTable columns={columns} data={customizableMenus || []} />
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">{editItem ? 'Edit Customizable Menu' : 'Add Customizable Menu'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  {...register('name')}
                  defaultValue={editItem?.name || ''}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  {...register('description')}
                  defaultValue={editItem?.description || ''}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Base Price</label>
                <input
                  type="number"
                  {...register('base_price')}
                  defaultValue={editItem?.base_price || ''}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.base_price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.base_price && (
                  <p className="text-red-500 text-sm mt-1">{errors.base_price.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.image_file ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.image_file && (
                  <p className="text-red-500 text-sm mt-1">{errors.image_file.message}</p>
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

export default CustomizableMenu;
