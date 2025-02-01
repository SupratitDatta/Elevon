# Elevon

**Elevon** is a cutting-edge e-commerce platform specializing in electronic gadgets. Whether you're looking for the latest smartphones, laptops, smartwatches, or accessories, Elevon provides a seamless shopping experience with a modern, intuitive interface. Designed for performance and scalability.

## Key Features

- **User Authentication**  
  Secure login and signup with NextAuth.
  
- **Product Listing & Details**  
  Browse through an extensive collection of electronic gadgets with detailed specifications and high-quality images.
  
- **Shopping Cart Management**  
  Easily add, remove, and modify products in your cart before checkout.

- **Admin Dashboard** 
  Manage inventory, track sales, add, update, remove products and handle user order with an intuitive admin panel.
  
## Tech Stack

- **Frontend**: Next.js, TailwindCSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB
- **Authentication**: NextAuth

## Installation

Set up Elevon locally by following these steps:

### Step 1: Clone the Repository
```bash
git clone https://github.com/supratitdatta/Elevon.git
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set up MongoDB

- **MongoDB Atlas:**
  - Create an Database on MongoDB to manage products and other data.

### Step 4: Configure Environment Variables

- Create a `.env` file in the root directory.
- Add your MongoDB connection url.
- Add your GOOGLE_ID and GOOGLE_SECRET.
- Add your Cloundinary Api Key and Cloud name.

### Step 5: Start the Application
```bash
cd client
npm run dev
```

### Step 6: Start the Admin Panel
```bash
cd admin
npm run dev
```

Access the platform at [http://localhost:3000](http://localhost:3000).

## License & Contact

- This project is created by Supratit Datta in 2024. All rights reserved.
- **Email**: [supratitdatta@gmail.com](supratitdatta@gmail.com)