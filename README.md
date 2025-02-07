<img width="1426" alt="Screenshot 2025-02-07 at 12 13 46" src="https://github.com/user-attachments/assets/aea7ac83-416d-43a6-b16f-0ec80c061fea" />


## Frontend Application Test

Frontend Application Test is a web application that allows users to login in using an [API](https://app.axis.africa/api/user/login). The application is built using Next.js, a popular React framework, and Tailwind CSS for styling. 

### Features

- User authentication

### Installation

To install the application, you need to have Node.js and npm installed on your machine. Then, you can clone the repository and install the dependencies:

```
git clone https://github.com/your-repo/frontend-application-test.git
cd frontend-application-test
npm install
```

### Running the Application

You can start the application in development mode with:

```
npm run dev
```
And build the application for production with:

```
npm run build
```
Then, you can start the application in production mode with:

```
npm run start
```

### Code Structure

The main parts of the application are:

* package.json: This file contains the list of project dependencies and scripts.
* app/: This directory contains the main application code.
* components/: This directory contains the React components used in the application. 

### User Authentication

User authentication is handled using NextAuth.js. The application uses a custom credentials provider for authentication. The logic for this can be found in:

```javascript

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log("Attempting login with:", credentials);

          const res = await fetch("https://app.axis.africa/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          });

          console.log("Response status:", res.status);

          if (!res.ok) throw new Error("Invalid credentials");

          const user = await res.json();
          console.log("API Response:", user);

          if (user.access_token) {
            return {
              id: user.id || "1", // Ensure `id` exists
              name: user.name || "John Wanyoike", // Default name
              email: user.email || credentials.email, // Ensure email exists
              token: user.access_token,
            };
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user; // Store user data
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user; // Pass user data to session
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };


```

### Styling

The application uses Tailwind CSS for styling. The global styles can be found in:

```javascript
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

html,
body,
:root {
  color-scheme: light;
  scroll-behavior: smooth;
  background-color: #f0f0f0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #171717;
}

```
The Tailwind configuration can be found in:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
     
    },
  },
  plugins: [],
}
```
### Contributing

Contributions are welcome. 
