import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GenericTable from '../../../../components/GenericTable';
import { useAddMenuItem, useGetMenuItems, useUpdateMenuItem, useDeleteMenuItem } from './menuItemshook';
import { useGetMenuCategories } from '../MenuCategory/menuCategoryHook';

// Define validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  price: yup.number().required('Price is required').positive('Price must be positive'),
  menu_category_id: yup.string().required('Menu category is required'),
  image_file: yup.mixed().test('required', 'Image file is required', (value) => value || false),
});

function MenuItems() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null); // State to track item being edited

  // Fetch menu items and handle loading and error states
  const { data: menuItems, error: itemsError, isLoading: itemsLoading } = useGetMenuItems();
  const { mutate: addMenuItem } = useAddMenuItem();
  const { mutate: updateMenuItem } = useUpdateMenuItem();
  const { mutate: deleteMenuItem } = useDeleteMenuItem();

  // Fetch menu categories
  const { data: menuCategories, error: categoriesError, isLoading: categoriesLoading } = useGetMenuCategories();

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
    reset
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
    formData.append('price', data.price);
    formData.append('menu_category_id', data.menu_category_id);
    if (data.image_file) {
      formData.append('image_file', data.image_file);
    }
    const callback = () => {
      closeModal(); // Close modal after adding or updating
      reset(); // Reset the form
    };
    if (editItem) {
      updateMenuItem({ id: editItem._id, updatedMenuItem: formData }, {
        onSuccess: callback,
      });
    } else {
      addMenuItem(formData, {
        onSuccess: callback,
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
      Header: 'Price',
      accessor: 'price',
    },
    {
      Header: 'Category',
      accessor: (row) => row.menu_category_id.name, // Assumes menu category name is populated
    },
    {
      Header: 'Image',
      accessor: 'image_url', // Display the image URL or image itself
      Cell: ({ value }) => (
        value ? <img src={value} alt="Menu Item" className="w-16 h-16 object-cover" /> : 'No image'
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

  if (categoriesLoading) return <p>Loading menu categories...</p>;
  if (categoriesError) return <p>Error fetching menu categories: {categoriesError.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Menu Items Setup</h1>
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
                <label className="block text-gray-700">Description</label>
                <textarea
                  {...register('description')}
                  defaultValue={editItem?.description || ''}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                />
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
                <label className="block text-gray-700">Menu Category</label>
                <select
                  {...register('menu_category_id')}
                  defaultValue={editItem?.menu_category_id?._id || ''}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.menu_category_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">Select a category</option>
                  {menuCategories && menuCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.menu_category_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.menu_category_id.message}</p>
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

export default MenuItems;
