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

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
if(!process.env.NEXTAUTH_SECRET){
  throw new Error("please provide process.env.NEXTAUTH_SECRET environment variable");
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        }, // You can customize this label to 'Email'
        password: { label: "Password", type: "password" }, // You can customize this label to 'Password'
      },
      authorize: async (credentials) => {
        // Add your own authentication logic here
        if (
          credentials.email === "john.wanyoike@belvadigital.com" &&
          credentials.password === "12345678"
        ) {
          // If credentials are valid, return the user object
          return Promise.resolve({ email: credentials.email });
        } else {
          // If credentials are invalid, return null
          return Promise.resolve(null);
        }
      },
    }),
  ],
session:{
  strategy: "jwt",
}

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

Contributions are welcome. Please make sure to update tests as appropriate.