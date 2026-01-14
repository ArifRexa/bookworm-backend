# Bookworm Backend

The Bookworm backend is a RESTful API built with Node.js and Express. It manages user authentication, book data, reviews, and other core functionalities for the Bookworm digital library platform.

## Features

- **User Management**: Registration, login, profile management, and authentication
- **Book Catalog**: Comprehensive book database with search and filtering capabilities
- **Review System**: Allow users to rate and review books
- **File Upload**: Handle book cover image uploads
- **Tutorial Management**: Manage educational content and tutorials
- **Admin Panel**: Administrative functions for content moderation
- **Activity Tracking**: Monitor user activities and engagement
- **RESTful API**: Clean, well-documented API endpoints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Environment Variables**: dotenv
- **CORS**: cors middleware
- **Cookie Parsing**: cookie-parser

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or cloud instance like MongoDB Atlas)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bookworm-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookworm
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d
COOKIE_EXPIRE=30
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the development server:
```bash
npm run dev
```

5. The server will start on `http://localhost:5000`

## Environment Variables

- `NODE_ENV`: Environment mode (development/production)
- `PORT`: Port number for the server (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `JWT_EXPIRE`: JWT expiration time (e.g., 30d for 30 days)
- `COOKIE_EXPIRE`: Cookie expiration time in days
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name for image uploads
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## Available Scripts

- `npm run dev`: Starts the development server with nodemon
- `npm run start`: Starts the production server
- `npm run test`: Runs tests (currently not configured)

## API Endpoints

### User Routes (`/api/users`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `DELETE /profile` - Delete user account
- `POST /forgotpassword` - Forgot password
- `PUT /resetpassword/:resettoken` - Reset password

### Book Routes (`/api/books`)
- `GET /` - Get all books with pagination and filtering
- `GET /:id` - Get a single book
- `POST /` - Create a new book (admin only)
- `PUT /:id` - Update a book (admin only)
- `DELETE /:id` - Delete a book (admin only)
- `GET /genres` - Get all book genres
- `GET /mylibrary` - Get user's library
- `POST /mylibrary/:id` - Add book to user's library
- `DELETE /mylibrary/:id` - Remove book from user's library

### Review Routes (`/api/reviews`)
- `GET /:bookId` - Get reviews for a book
- `POST /` - Create a new review
- `PUT /:id` - Update a review
- `DELETE /:id` - Delete a review

### Upload Routes (`/api/upload`)
- `POST /` - Upload book cover image

### Tutorial Routes (`/api/tutorials`)
- `GET /` - Get all tutorials
- `GET /:id` - Get a single tutorial
- `POST /` - Create a new tutorial (admin only)
- `PUT /:id` - Update a tutorial (admin only)
- `DELETE /:id` - Delete a tutorial (admin only)

### Admin Routes (`/api/admin`)
- `GET /users` - Get all users (admin only)
- `GET /books` - Get all books (admin only)
- `PUT /users/:id` - Update user role (admin only)
- `DELETE /users/:id` - Delete a user (admin only)

### Activity Routes (`/api/activities`)
- `GET /` - Get user activities
- `POST /` - Log a new activity

## Database Models

- **User**: Stores user information, authentication data, and preferences
- **Book**: Contains book details like title, author, genre, description, ratings
- **Review**: Stores user reviews and ratings for books
- **Tutorial**: Educational content and guides
- **Activity**: Tracks user interactions and behaviors

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Input validation and sanitization
- CORS configured for secure cross-origin requests
- Cookie parsing for secure session management

## Error Handling

The application implements centralized error handling with appropriate HTTP status codes and meaningful error messages.

## Development

### Adding New Routes

1. Create a new route file in `/routes`
2. Define your routes with appropriate middleware
3. Import and use the route in `index.js`

### Adding New Models

1. Create a new model file in `/models`
2. Define your schema using Mongoose
3. Export the model for use in controllers

## Testing

Testing framework is not yet configured. To add tests:

1. Install Jest: `npm install --save-dev jest`
2. Configure test scripts in `package.json`
3. Create test files with `.test.js` extension

## Deployment

### Heroku

1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git or Heroku CLI

### DigitalOcean App Platform

1. Create a DigitalOcean app
2. Configure environment variables
3. Connect your GitHub repository

### Self-hosted

1. Ensure MongoDB is accessible
2. Set environment variables
3. Run `npm start` to start the server

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the ISC License.