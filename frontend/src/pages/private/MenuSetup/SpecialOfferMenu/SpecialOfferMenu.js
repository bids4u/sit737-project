import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GenericTable from "../../../../components/GenericTable";
import {
  usePostSpecialOffer,
  useGetAllSpecialOffers,
  useUpdateSpecialOffer,
  useDeleteSpecialOffer,
} from "./specialOfferHook";
import ImageUploadComponent from "../../../../components/ImageUploadComponent";

// Define validation schema using Yup
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  startDate: yup
    .date()
    .required("Start date is required")
    .typeError("Invalid date"),
  endDate: yup
    .date()
    .required("End date is required")
    .typeError("Invalid date"),
  discount: yup
    .number()
    .optional()
    .positive("Discount must be positive")
    .typeError("Discount must be a number"),
  price: yup
    .number()
    .positive("Price must be positive")
    .typeError("Price must be a number"),
  image_file: yup
    .mixed()
    .test("required", "Image file is required", (value) => value || false),
});

function SpecialOfferMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null); // State to track item being edited

  // Fetch special offers and handle loading and error states
  const {
    data: specialOffers,
    error: offersError,
    isLoading: offersLoading,
  } = useGetAllSpecialOffers();
  const { mutate: addSpecialOffer } = usePostSpecialOffer();
  const { mutate: updateSpecialOffer } = useUpdateSpecialOffer();
  const { mutate: deleteSpecialOffer } = useDeleteSpecialOffer();

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

  // Handle image upload success
  const handleUploadSuccess = (url) => {
    setValue("image_file", url);
  };

  const onSubmit = (data) => {
    const formData = {
      ...data,
      image_url: data.image_file,
    };

    if (editItem) {
      updateSpecialOffer(
        { id: editItem._id, updatedSpecialOffer: formData },
        {
          onSuccess: () => {
            closeModal(); // Close modal after updating
            reset()
          },
        }
      );
    } else {
      addSpecialOffer(formData, {
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
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Start Date",
      accessor: "startDate",
    },
    {
      Header: "End Date",
      accessor: "endDate",
    },
    {
      Header: "Discount",
      accessor: "discount",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Image",
      accessor: "image_url", // Display the image URL or image itself
      Cell: ({ value }) =>
        value ? (
          <img
            src={value}
            alt="Special Offer"
            className="w-16 h-16 object-cover"
          />
        ) : (
          "No image"
        ),
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => openModal(row.original)}
            className="text-blue-600 hover:text-blue-900"
          >
            Edit
          </button>
          <button
            onClick={() => deleteSpecialOffer(row.original._id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Show loading or error state
  if (offersLoading) return <p>Loading special offers...</p>;
  if (offersError)
    return <p>Error fetching special offers: {offersError.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Special Offers Setup</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Special Offer
        </button>
      </div>
      <GenericTable columns={columns} data={specialOffers || []} />
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">
              {editItem ? "Edit Special Offer" : "Add Special Offer"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  {...register("title")}
                  defaultValue={editItem?.title || ""}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.title
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  {...register("description")}
                  defaultValue={editItem?.description || ""}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Start Date</label>
                <input
                  type="date"
                  {...register("startDate")}
                  defaultValue={
                    editItem?.startDate
                      ? new Date(editItem.startDate).toISOString().split("T")[0]
                      : ""
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.startDate
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">End Date</label>
                <input
                  type="date"
                  {...register("endDate")}
                  defaultValue={
                    editItem?.endDate
                      ? new Date(editItem.endDate).toISOString().split("T")[0]
                      : ""
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.endDate
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.endDate.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Discount</label>
                <input
                  type="number"
                  {...register("discount")}
                  defaultValue={editItem?.discount || ""}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.discount
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.discount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.discount.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  {...register("price")}
                  defaultValue={editItem?.price || ""}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.price
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <ImageUploadComponent onUploadSuccess={handleUploadSuccess} />
                {errors.image_file && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image_file.message}
                  </p>
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

export default SpecialOfferMenu;
