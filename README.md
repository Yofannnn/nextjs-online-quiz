# Questify

Questify is a full-stack online quiz platform built with Next.js, TypeScript, Tailwind CSS, shadcn, and MongoDB Atlas

## Features

- **Quiz Creation**: Create quizzes with multiple questions and define correct answers.
- **Role-Based Access**: Role-specific dashboards for admins and users.
- **Authentication**: Secure login and user management using server-side session handling.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, shadcn
- **Backend:** Next.js API Routes, MongoDB Atlas
- **Authentication:** JWT
- **Database:** MongoDB Atlas
- **Forms & Validation:** Zod Schema Validation

## Installation

#### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

1. Clone the repository:
   ```bash
   git clone https://github.com/Yofannnn/nextjs-online-quiz.git
   ```
2. Navigate to the project directory:
   ```bash
   cd nextjs-online-quiz
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to.
   ```bash
   http://localhost:3000
   ```

## Environment Variables

Before running the application, you need to configure the environment variables. Create a `.env.local` file in the root directory and add the following variables:

#### Base URL for your application

```bash
BASE_URL=http://localhost:3000
```

#### MongoDB Atlas connection URI

```bash
MONGODB_URI=mongodb+srv://<db_username>:<db_password>@cluster0.tspgi2t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

#### Session secret key (Generate a SESSION_SECRET by opening your terminal and running the following command)

```bash
openssl rand -base64 32
```

```bash
SESSION_SECRET=your_generated_secret_key
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [MongoDb Atlas](https://www.mongodb.com/cloud/atlas)
- [TypeScript](https://www.typescriptlang.org/)
- [UI Shadcn](https://ui.shadcn.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://github.com/colinhacks/zod)
- [JWT](https://jwt.io/)
