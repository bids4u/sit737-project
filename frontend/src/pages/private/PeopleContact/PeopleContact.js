import React from 'react';
import GenericTable from '../../../components/GenericTable';
import {useGetContacts} from "./peopleContactHook"

function PeopleContact() {
  const { data: contacts, error: contactsError } = useGetContacts();

  // Define columns for the contact table
  const columns = [
    {
      Header: 'Contact ID',
      accessor: '_id', // Accessor for the Contact ID
    },
    {
      Header: 'Name',
      accessor: 'name', // Accessor for the Name
    },
    {
      Header: 'Email',
      accessor: 'email', // Accessor for the Email
    },
    {
      Header: 'Phone',
      accessor: 'phone', // Accessor for the Phone
    },
    {
      Header: 'Message',
      accessor: 'message', // Accessor for the Message
    },
    {
      Header: 'Date',
      accessor: 'createdAt', // Accessor for the creation date
      Cell: ({ value }) => new Date(value).toLocaleString(), // Format the date
    },
  ];

  // Show loading or error state
  if (!contacts) return <p>Loading contacts...</p>;
  if (contactsError) return <p>Error fetching contacts: {contactsError.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Contact Management</h1>
      <GenericTable columns={columns} data={contacts || []} />
    </div>
  );
}

export default PeopleContact;
