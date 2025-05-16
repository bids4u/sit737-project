import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useGetSlideshowImages,
  useAddSlideshowImage,
  useUpdateSlideshowImage,
  useDeleteSlideshowImage,
} from './slideShowSetupHook';
import GenericTable from '../../../components/GenericTable';
import ImageUploadComponent from '../../../components/ImageUploadComponent';

// Validation schema using Yup
const schema = yup.object().shape({
  image_url: yup.mixed().required('Image file is required'),
  caption: yup.string(),
  order: yup.number().required('Order is required').positive('Order must be a positive number'),
  link: yup.string().url('Must be a valid URL'),
});

function SlideshowSetup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const { data: slideshowImages, error: imagesError, isLoading: imagesLoading } = useGetSlideshowImages();
  const { mutate: addSlideshowImage } = useAddSlideshowImage();
  const { mutate: updateSlideshowImage } = useUpdateSlideshowImage();
  const { mutate: deleteSlideshowImage } = useDeleteSlideshowImage();

  const openModal = (item = null) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditItem(null);
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle image upload success
  const handleUploadSuccess = (url) => {
    setValue("image_url", url);
  };

  const onSubmit = (data) => {
    if (editItem) {
      updateSlideshowImage(
        { id: editItem._id, updatedSlideshowImage: data },
        {
          onSuccess: () => {
            closeModal();
            reset()
          },
        }
      );
    } else {
      addSlideshowImage(data, {
        onSuccess: () => {
          closeModal();
          reset()

        },
      });
    }
  };

  const columns = [
    {
      Header: 'Image',
      accessor: 'image_url',
      Cell: ({ value }) => (
        value ? <img src={value} alt="Slideshow" className="w-16 h-16 object-cover" /> : 'No image'
      ),
    },
    {
      Header: 'Caption',
      accessor: 'caption',
    },
    {
      Header: 'Order',
      accessor: 'order',
    },
    {
      Header: 'Link',
      accessor: 'link',
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
            onClick={() => deleteSlideshowImage(row.original._id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (imagesLoading) return <p>Loading slideshow images...</p>;
  if (imagesError) return <p>Error fetching slideshow images: {imagesError.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Slideshow Images</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Slideshow Image
        </button>
      </div>
      <GenericTable columns={columns} data={slideshowImages || []} />
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">{editItem ? 'Edit Slideshow Image' : 'Add Slideshow Image'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <ImageUploadComponent onUploadSuccess={handleUploadSuccess} />
                {errors.image_file && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image_file.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Caption</label>
                <input
                  type="text"
                  {...register('caption')}
                  defaultValue={editItem?.caption || ''}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Order</label>
                <input
                  type="number"
                  {...register('order')}
                  defaultValue={editItem?.order || ''}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.order ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.order && (
                  <p className="text-red-500 text-sm mt-1">{errors.order.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Link</label>
                <input
                  type="text"
                  {...register('link')}
                  defaultValue={editItem?.link || ''}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.link ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.link && (
                  <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {editItem ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SlideshowSetup;
