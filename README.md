
# Liven User Address Backend

## Description

This project is a backend service built with **Express.js** and **TypeScript**. It handles user registration, login, and management of addresses, with authentication via **JWT**. The application uses **SQLite** as the database (configured through Prisma ORM), and it also comes with API documentation using **Swagger**.

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **TypeScript**: Type safety
- **JWT**: Authentication and authorization
- **Prisma**: ORM (Object-Relational Mapping)
- **SQLite**: Database for development
- **Swagger**: API documentation
- **Jest**: Testing framework
- **Supertest**: HTTP assertions for integration tests

## Installation

1. Clone the repository
2. Navigate to the project directory:

   ```bash
   cd liven-user-address-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Prisma Setup

1. To initialize Prisma and configure the SQLite database:

   ```bash
   npx prisma init
   ```

2. Run database migrations to create tables:

   ```bash
   npm run prisma:migrate
   ```

   This will create the `User` and `Address` tables in your database.

## Environment Variables

Make sure to create a `.env` file in the root of your project with the following contents:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret"
```

- `DATABASE_URL`: Path to the SQLite database file.
- `JWT_SECRET`: Secret key for JWT token generation.

## Running the Application

### Development Mode

To run the app in development mode, use:

```bash
npm run dev
```

The app will start at `http://localhost:3000`.

### Production Mode

To build the application and run it in production mode:

1. Build the app:

   ```bash
   npm run build
   ```

2. Start the app:

   ```bash
   npm start
   ```

## API Documentation (Swagger)

Swagger is set up to automatically generate API documentation. You can access it at:

```
http://localhost:3000/api-docs
```

This provides an interactive interface to explore and test the API endpoints.

## Testing

Unit tests are written using **Jest** and **Supertest**. To run the tests:

```bash
npm run test
```

To watch tests as you make changes:

```bash
npm run test:watch
```

## Available Endpoints

### Users

- **POST /users/register**: Register a new user
  - Body: `{ "email": "test@example.com", "password": "password123", "name": "Test User" }`
- **POST /users/login**: Login with user credentials (returns JWT token)
  - Body: `{ "email": "test@example.com", "password": "password123" }`

### Addresses

- **POST /addresses**: Create a new address (JWT required)
  - Body: `{ "street": "123 Main St", "city": "New York", "country": "USA" }`
- **GET /addresses**: Get all addresses for the authenticated user (JWT required)
  - Query: `?country=BR`
- **PUT /addresses/:id**: Update an address by ID (JWT required)
  - Body: `{ "street": "456 Elm St", "city": "Los Angeles", "country": "USA" }`
- **DELETE /addresses/:id**: Delete an address by ID (JWT required)

## License

This project is licensed under the MIT License.
