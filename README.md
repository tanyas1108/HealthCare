# Healthcare API

A RESTful API for managing healthcare services, including patients, doctors, and their mappings.

## Features

- User Authentication (Register/Login)
- Patient Management (CRUD operations)
- Doctor Management (CRUD operations)
- Patient-Doctor Mapping
- JWT-based Authentication
- Input Validation
- Error Handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository

2. Install dependencies

3. Create a `.env` file in the root directory with the following variables:
```
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=24h
MONGODB_URI=your_mongodb_connection_string
```

4. Start the server
```bash
npm start
```

The server will start running on `http://localhost:5001`

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Patient Routes

- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get a specific patient
- `POST /api/patients` - Create a new patient
- `PUT /api/patients/:id` - Update a patient
- `DELETE /api/patients/:id` - Delete a patient

### Doctor Routes

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get a specific doctor
- `POST /api/doctors` - Create a new doctor
- `PUT /api/doctors/:id` - Update a doctor
- `DELETE /api/doctors/:id` - Delete a doctor

### Mapping Routes

- `GET /api/mappings` - Get all mappings
- `GET /api/mappings/:patientId` - Get doctors mapped to a patient
- `POST /api/mappings` - Create a new mapping
- `DELETE /api/mappings/:id` - Delete a mapping

## API Documentation

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Request Examples

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### Create Patient
```http
POST /api/patients
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Patient Name",
  "email": "patient@example.com",
  "phone": "1234567890",
  "age": 30,
  "gender": "Male",
  "address": "123 Main St"
}
```

#### Create Doctor
```http
POST /api/doctors
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Dr. Smith",
  "email": "smith@example.com",
  "phone": "9876543210",
  "specialization": "Cardiology",
  "experience": 10,
  "hospital": "City Hospital"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Project Structure

```
├── config/
│   └── database.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Doctor.js
│   ├── Mapping.js
│   ├── Patient.js
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── doctors.js
│   ├── mappings.js
│   └── patients.js
├── .env
├── package.json
└── server.js
```


## License

This project is licensed under the MIT License.
