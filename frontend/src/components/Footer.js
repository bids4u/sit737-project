import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Homemade Goodness. All rights reserved.</p>
        <div>
          <a href="/privacy-policy" className="mr-4 hover:underline">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
