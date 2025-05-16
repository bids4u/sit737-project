import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useGetOrders, useUpdateOrder } from './orderHook';
import GenericTable from '../../../components/GenericTable';

// Define validation schema using Yup
const schema = yup.object().shape({
  status: yup.string().oneOf(['pending', 'completed', 'cancelled'], 'Invalid status').required('Status is required'),
});

function Order() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editOrder, setEditOrder] = useState(null); // State to track the order being edited
  const { data: orders, error: ordersError } = useGetOrders();
  const { mutate: updateOrder } = useUpdateOrder();

  const openModal = (order = null) => {
    setEditOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditOrder(null);
    setIsModalOpen(false);
  };

  // Initialize react-hook-form with validation schema
  const { register, handleSubmit, formState: { errors },reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (editOrder) {
      updateOrder({ id: editOrder._id, updatedOrder: { status: data.status } }, {
        onSuccess: () => {
          closeModal(); // Close modal after updating
          reset()
        },
      });
    }
  };

  // Define columns for the table
  const columns = [
    {
      Header: 'Order ID',
      accessor: '_id', // Accessor for the Order ID
    },
    {
      Header: 'Customer Name',
      accessor: 'customer.name', // Accessor for the Customer Name
    },
    {
      Header: 'Items',
      accessor: 'items', // Accessor for the Items
      Cell: ({ value }) => (
        <ul className="list-disc pl-5">
          {value.map((item, index) => (
            <li key={index}><strong>{item.item?.name || 'Unknown Item'}</strong> - Quantity: {item.quantity}</li>
          ))}
        </ul>
      ),
    },
    {
      Header: 'Custom Items',
      accessor: 'customItems', // Accessor for the Custom Items
      Cell: ({ value }) => (
        <ul className="list-disc pl-5">
          {value.map((customItem, index) => (
            <li key={index}><strong>{customItem.item?.name || 'Unknown Custom Item'}</strong> - Quantity: {customItem.quantity}</li>
          ))}
        </ul>
      ),
    },
    {
      Header: 'Special Offer',
      accessor: 'specialOffer', // Accessor for the Special Offer
      Cell: ({ value }) => (
        value ? (
          <div>
           <p><strong>{value?.item?.title || 'Unknown Special Offer'}</strong> </p> 
            <strong>Quantity:</strong> {value.quantity}
          </div>
        ) : (
          'N/A'
        )
      ),
    },
    {
      Header: 'Total Price',
      accessor: 'totalPrice', // Accessor for the Total Price
    },
    {
      Header: 'Status',
      accessor: 'status', // Accessor for the Status
      Cell: ({ value, row }) => (
        <select disabled defaultValue={value} onChange={(e) => openModal({ ...row.original, status: e.target.value })}
          className="border rounded-md p-1"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
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
        </div>
      ),
    },
  ];

  if (ordersError) return <p>Error fetching orders: {ordersError.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Order Management</h1>
      <GenericTable columns={columns} data={orders || []} />
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Edit Order Status</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  {...register('status')}
                  defaultValue={editOrder?.status || ''}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.status ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
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

export default Order;
