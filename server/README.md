# Express TypeScript API Boilerplate

A production-ready Express.js API boilerplate with TypeScript support and best practices included.

## Features

- TypeScript support
- Express.js framework
- Security middleware with Helmet
- CORS enabled
- Request logging with Morgan
- Environment variable configuration with dotenv
- Error handling middleware
- Basic API structure
- Development tools (ts-node-dev, Jest, ESLint)
- Type definitions

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone this repository
```
git clone https://github.com/yourusername/express-typescript-api-boilerplate.git
```

2. Install dependencies
```
npm install
```

3. Create your `.env` file based on the `.env` example
```
cp .env.example .env
```

4. Start the development server
```
npm run dev
```

The server will be running at http://localhost:5000

## Project Structure

```
.
├── src/                  # Source code
│   ├── api/              # API routes
│   │   └── index.ts
│   ├── middlewares/      # Custom middleware functions
│   │   └── index.ts
│   ├── types/            # Type definitions
│   │   └── index.ts
│   ├── __tests__/        # Tests
│   │   └── api.test.ts
│   └── server.ts         # Entry point
├── .env                  # Environment variables
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore rules
├── jest.config.js        # Jest configuration
├── nodemon.json          # Nodemon configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## Scripts

- `npm run build` - Build the TypeScript code
- `npm start` - Start the compiled server
- `npm run dev` - Start the server with hot-reload
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm test` - Run tests with coverage
- `npm run test:watch` - Run tests in watch mode

## Extending the Boilerplate

### Adding Routes

Create new route files in the `src/api` directory and import them in the `src/api/index.ts` file.

Example:
```typescript
// src/api/users.ts
import express, { Router, Request, Response } from 'express';
import { User } from '../types';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const users: User[] = [];
  res.json({ users });
});

export default router;

// src/api/index.ts
import express, { Router } from 'express';
import users from './users';

const router: Router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋'
  });
});

router.use('/users', users);

export default router;
```

### Adding Database Connection

For MongoDB with Mongoose:

1. Install mongoose and types
```
npm install mongoose
npm install --save-dev @types/mongoose
```

2. Create a database connection file
```typescript
// src/db.ts
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not defined');
    }

    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
```

3. Import and call the connection in server.ts
```typescript
import connectDB from './db';
connectDB();
```

## TypeScript Best Practices

1. Use type annotations for all variables, parameters, and return types
2. Create custom types or interfaces for complex objects
3. Use enums for predefined values
4. Leverage TypeScript's type inference when appropriate
5. Use async/await with proper error handling

## Security Best Practices

1. Always validate and sanitize user input
2. Use environment variables for sensitive information
3. Implement rate limiting for API endpoints
4. Set up proper authentication and authorization
5. Keep dependencies updated

## License

MIT