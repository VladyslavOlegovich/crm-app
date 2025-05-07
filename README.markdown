# CRM Application

This is a full-stack application for managing GitHub repositories and user authentication. The backend is built with Node.js, Express, and MongoDB, deployed using Docker, while the frontend is developed with React and Vite.

## Prerequisites

- Node.js (v16.x or later)
- Docker
- Docker Compose
- Git
- npm or yarn

## Project Structure

- `backend/`: Contains the server-side logic, API, and MongoDB setup.
- `frontend/`: Contains the client-side React application.

## Installation

### Backend

1. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   - Create a `.env` file in the `backend/` directory.
   - Add the following variables (replace with your values):
     ```
     PORT=5000
     JWT_SECRET=your-secret-key
     MONGODB_URI=mongodb://mongo:27017/crm
     ```
   - Ensure `MONGODB_URI` matches your MongoDB setup if not using Docker.

4. **Run the backend**:
   - Start the backend and MongoDB using Docker Compose:
     ```bash
     docker-compose up --build
     ```
   - The backend will be available at `http://localhost:5000/api`.

### Frontend

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the frontend**:
   ```bash
   npm run dev
   ```
   - Open `http://localhost:5173` in your browser.

## API Endpoints

- **POST `/api/register`**: Register a new user.
  - Body: `{ email: string, password: string }`
  - Response: `{ token: string, user: { _id: string, email: string } }`
  - Status: 201
- **POST `/api/login`**: Login a user.
  - Body: `{ email: string, password: string }`
  - Response: `{ token: string, user: { _id: string, email: string } }`
  - Status: 200
- **POST `/api/repos`**: Add a GitHub repository.
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ path: string }`
  - Response: `{ ...repository }`
  - Status: 201
- **GET `/api/repos`**: Get user repositories.
  - Headers: `Authorization: Bearer <token>`
  - Response: `[{ ...repository }, ...]`
  - Status: 200
- **PUT `/api/repos/:id`**: Update a repository.
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ ...repository }`
  - Status: 200
- **DELETE `/api/repos/:id`**: Delete a repository.
  - Headers: `Authorization: Bearer <token>`
  - Response: `{}`
  - Status: 200

## Development

- **Backend**: Ensure Docker is running, then use `npm run dev` (if configured) in `backend/`.
- **Frontend**: Run `npm run dev` in `frontend/` for hot reloading.

## Testing

- Add tests using Jest for the backend:
  ```bash
  cd backend
  npm test
  ```
- (Currently no tests implemented; add as needed.)

## Deployment

- **Backend**: Use Docker Compose for production:
  ```bash
  cd backend
  docker-compose up -d
  ```
- **Frontend**: Build and serve the frontend:
  ```bash
  cd frontend
  npm run build
  npm install -g serve
  serve -s dist
  ```
- Ensure environment variables are set in production.

## Contributing

- Fork the repository.
- Create a feature branch (`git checkout -b feature-name`).
- Commit changes (`git commit -m "Add feature"`).
- Push to the branch (`git push origin feature-name`).
- Open a Pull Request.

## License

[MIT](LICENSE) (or specify your license)

## Acknowledgments

- Thanks to Chat GPT and Grok for assistance :)
