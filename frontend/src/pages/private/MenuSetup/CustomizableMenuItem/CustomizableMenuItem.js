import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GenericTable from '../../../../components/GenericTable';
import { useAddCustomizableMenuItem, useGetCustomizableMenuItems, useUpdateCustomizableMenuItem, useDeleteCustomizableMenuItem } from './customizableMenuItemHook';
import {useGetCustomizableMenus} from "../CustomizableMenu/customizableMenuHook";

// Define validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  price: yup.number().required('Price is required').positive('Price must be positive'),
  customizable_menu_id: yup.string().required('Customizable Menu is required'),
});

function CustomizableMenuItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null); // State to track item being edited

  // Fetch menu items and handle loading and error states
  const { data: menuItems, error: itemsError, isLoading: itemsLoading } = useGetCustomizableMenuItems();
  const { mutate: addMenuItem } = useAddCustomizableMenuItem();
  const { mutate: updateMenuItem } = useUpdateCustomizableMenuItem();
  const { mutate: deleteMenuItem } = useDeleteCustomizableMenuItem();

  // Fetch customizable menu 
  const { data: customizableMenu, error: customizableMenuError, isLoading: customizableMenuLoading } = useGetCustomizableMenus();

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
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

 

  const onSubmit = (data) => {
  

    if (editItem) {
      updateMenuItem({ id: editItem._id, updatedMenuItem: data }, {
        onSuccess: () => {
          closeModal(); // Close modal after updating
          reset()
        },
      });
    } else {
      addMenuItem(data, {
        onSuccess: () => {
          closeModal(); // Close modal after adding
          reset()
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
      Header: 'Price',
      accessor: 'price',
    },
    {
      Header: 'Customizbale Menu',
      accessor: (row) => row.customizable_menu_id.name, // Assumes menu category name is populated
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
            onClick={() => deleteMenuItem(row.original._id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Show loading or error state
  if (itemsLoading) return <p>Loading menu items...</p>;
  if (itemsError) return <p>Error fetching menu items: {itemsError.message}</p>;

  if (customizableMenuLoading) return <p>Loading menu categories...</p>;
  if (customizableMenuError) return <p>Error fetching menu categories: {customizableMenuError.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Customizable Menu Items Setup</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Menu Item
        </button>
      </div>
      <GenericTable columns={columns} data={menuItems || []} />
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">{editItem ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
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
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  {...register('price')}
                  defaultValue={editItem?.price || ''}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Customizable Menu</label>
                <select
                  {...register('customizable_menu_id')}
                  defaultValue={editItem?.customizable_menu_id?._id || ''}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.customizable_menu_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">Select a customizable menu</option>
                  {customizableMenu && customizableMenu.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.customizable_menu_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.customizable_menu_id.message}</p>
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

export default CustomizableMenuItem;
