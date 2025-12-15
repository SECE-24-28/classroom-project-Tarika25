# Mobile Recharge Backend

## Folder Structure

```
backend/
├── config/          # Database configuration files
│   └── database.js  # MongoDB connection setup
├── models/          # Mongoose schemas and models
│   ├── User.js      # User model with validation
│   └── Recharge.js  # Recharge transaction model
├── routes/          # API route definitions
│   └── userRoutes.js # User-related routes
├── controllers/     # Request handling logic
│   └── userController.js # User business logic
├── server.js        # Main Express server file
└── package.json     # Project dependencies and scripts
```

## Purpose of Each Folder

- **config/**: Contains database configuration and connection setup
- **models/**: Mongoose schemas defining data structure and validation
- **routes/**: API endpoint definitions and routing logic
- **controllers/**: Business logic and request/response handling
- **server.js**: Main application entry point

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Start production server: `npm start`

## Database Connection

- Local MongoDB: `mongodb://localhost:27017/mobile-recharge`
- Ensure MongoDB is running before starting the server