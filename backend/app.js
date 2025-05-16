require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000; // Use PORT from .env or default to 3000
const connectDB = require('./config/db'); // Import the database connection function
const userRoutes = require('./routes/userRoutes'); // Import user routes
const menuCategoryRoutes = require('./routes/menuCategoryRoutes'); // Import menu category routes
const fixedMenuItemRoutes = require('./routes/fixedMenuItemRoutes');
const customizableMenuRoutes = require('./routes/customizableMenuRoutes');
const customizableItemRoutes = require('./routes/customizableItemRoutes');
const menuRoutes = require('./routes/menuRoutes');
const specialOfferRoutes = require('./routes/specialOfferRoutes')
const slideShowRoutes = require('./routes/slideshowImageRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes');
const homeRoutes = require('./routes/homeRoutes');
const contactRoutes = require('./routes/contactRoutes');


const cors = require('cors'); // Import cors for Cross-Origin Resource Sharing
const errorHandler = require('./middlewares/errorMiddleware'); // Import error handling middleware
const notFoundHandler = require('./middlewares/notFoundMiddleware'); // Import not found middleware

app.use(express.json());
app.use(cors()); // Enable all CORS requests

// Connect to MongoDB
connectDB();




// routes
app.use('/api/users', userRoutes);
app.use('/api/menu-categories', menuCategoryRoutes);
app.use('/api/fixed-menu-items', fixedMenuItemRoutes);
app.use('/api/customizable-menus', customizableMenuRoutes);
app.use('/api/customizable-items', customizableItemRoutes);
app.use('/api/menu',menuRoutes);
app.use('/api/special-offer',specialOfferRoutes);
app.use('/api/slide-show',slideShowRoutes);
app.use('/api/order',orderRoutes);
app.use('/api', uploadRoutes);
app.use('/api', homeRoutes);
app.use('/api', contactRoutes);

// Serve static files from the React app
// backend/app.js or backend/server.js
// app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')));
// Handle invalid paths
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
