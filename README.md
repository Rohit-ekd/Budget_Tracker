# Expense Tracker (Full-Stack)

A simple full-stack Expense Tracker web app with a React + Vite frontend and a Node/Express backend. It supports user authentication, adding and listing transactions, and basic expense summaries. Live Demo : https://budget-tracker-client-pmzw.onrender.com

## Features

- User registration and login (JWT)
- Create, read, update, delete transactions
- Dashboard with summary cards and charts
- Protected routes for authenticated users

## Tech Stack

- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Auth: JSON Web Tokens (JWT)

## Project Structure

- client/ — React frontend (Vite)
- server/ — Express API and server code
- config/ — database configuration
- controllers/ — request handlers
- models/ — Mongoose models (`User`, `Transaction`)
- routes/ — API routes (auth, transactions)

## Environment Variables

Create a `.env` file in `server/` containing at minimum:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `PORT` — port for the server (optional)

## Setup & Run (local)

Prerequisites: Node.js (16+), npm, MongoDB instance (local or Atlas).

Server

1. Open a terminal and run:

```bash
cd server
npm install
# create .env with MONGO_URI and JWT_SECRET
# then start
npm run dev # or `node server.js` / `npm start` depending on scripts
```

Client

1. In another terminal:

```bash
cd client
npm install
npm run dev
```

Open the browser at the Vite dev URL (usually http://localhost:5173) and ensure the server is running at the configured API URL.

## API (Common Endpoints)

Authentication

- `POST /api/auth/register` — register new user
- `POST /api/auth/login` — login, returns JWT

Transactions (authenticated)

- `GET /api/transactions` — list user's transactions
- `POST /api/transactions` — create a transaction
- `PUT /api/transactions/:id` — update a transaction
- `DELETE /api/transactions/:id` — delete a transaction

Check `server/routes/` for exact route paths and request shapes.

## Notes

- If you changed API base paths or ports, update the client `services/api.js` to point to the correct server URL.
- Add `.env.example` to the `server/` folder to document required env vars for other developers.

## Contributing

Feel free to open issues or pull requests. For local contributions, run both server and client locally and ensure endpoints still work.

## License

This project does not include a license by default. Add a LICENSE file if you want to specify one.
