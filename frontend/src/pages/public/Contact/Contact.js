import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAddContact } from './contactHook';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').max(100, 'Name must be at most 100 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  message: yup.string().required('Message is required').max(5000, 'Message must be at most 5000 characters'),
  phone: yup.string().max(15, 'Phone number must be at most 15 characters'),
});

function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate: addContact } = useAddContact();

  const onSubmit = (data) => {
    addContact(data, {
      onSuccess: () => {
        reset();
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Homemade Goodness Catering</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Owner: Chandra Shah</h2>
        <p className="text-lg">Address: 16 Cousens Street, Tarneit, VIC</p>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-6 mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                {...register('name')}
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <div>
              <label className="block text-gray-700">Phone (Optional)</label>
              <input
                {...register('phone')}
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-red-500 text-sm">{errors.phone?.message}</p>
            </div>

            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                {...register('message')}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
              />
              <p className="text-red-500 text-sm">{errors.message?.message}</p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
          <iframe
          title='homemade goodness'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.4876554140187!2d144.67366997608528!3d-37.82546803470745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad68ebfe9daf837%3A0xcca0ade758a2baad!2s16%20Cousens%20St%2C%20Tarneit%20VIC%203029!5e0!3m2!1sen!2sau!4v1723958280748!5m2!1sen!2sau"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
