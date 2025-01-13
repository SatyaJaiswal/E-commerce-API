**E-Commerce API**
This is a RESTful API for an e-commerce platform built using Node.js, Express.js, and MongoDB. The API handles user authentication, product management, and shopping cart functionalities.

**Features**
User Authentication: Register, login, and authenticate users using JWT.
Product Management (Admin-only): Add, update, delete, and view products.
Shopping Cart Management: Add/remove items, and view cart contents.
**API Endpoints**
1. User Authentication
POST /register: Register a new user.
POST /login: Login a user and receive a JWT token.
2. Product Management (Admin Only)
GET /products: Get all products.
GET /products/:name: Get a specific product by Name.
POST /products: Add a new product (Admin only).
PUT /products/:name: Update an existing product (Admin only).
DELETE /products/:name: Delete a product (Admin only).
3. Shopping Cart
GET /cart: Get the user's shopping cart.
POST /cart: Add an item to the cart.
DELETE /cart/:name: Remove an item from the cart.

**Install Dependices**
npm start
The API will be available at http://localhost:5000.

Technologies Used
Node.js
Express.js
MongoDB
Mongoose
JWT
