

````markdown
# Buyers Lead Management App

A web application for managing property buyers and their leads, built with **Next.js**, **TypeScript**, **Supabase**, and **Tailwind CSS**. This app helps real estate agents or property dealers manage buyer information, track property interests, and export leads efficiently.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Environment Variables](#environment-variables)  
- [Available Scripts](#available-scripts)  
- [Folder Structure](#folder-structure)  
- [Usage](#usage)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- Add, edit, and manage buyer details
- Track buyer interests (city, property type, budget, BHK, etc.)
- Export buyer leads to CSV
- Property management (add/update/delete properties)
- Authentication using Supabase
- Role-based access (Admin, HR, Employee)
- Responsive UI with Tailwind CSS
- Client-side form validation with React Hook Form and Zod
- Toast notifications for user feedback

---

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript  
- **Backend / Database:** Supabase (PostgreSQL)  
- **UI Components:** Tailwind CSS, Radix UI  
- **Form Validation:** React Hook Form, Zod  
- **Utilities:** Lodash, UUID, clsx  
- **Deployment:** Netlify  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sowmitraguho/buyers-lead-management-app.git
cd buyers-lead-management-app
````

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
supabase_project_password=your_project_password
```

> Make sure your Supabase URL is a valid `https://` URL, and server-only keys do **not** have `NEXT_PUBLIC_` prefix.

---

## Available Scripts

* **Development server:**

```bash
npm run dev
```

* **Build for production:**

```bash
npm run build
```

* **Start production server:**

```bash
npm run start
```

* **Export static site (optional):**

```bash
npm run export
```

---

## Folder Structure

```
/src
  /app
    /api           # API routes for buyers, properties, auth
    /buyers        # Pages for buyer listing, details, and new buyer form
    /properties    # Property pages
    layout.tsx     # Main layout
  /components      # Reusable components (Navbar, Testimonial, etc.)
  /lib             # Utility functions, middleware, Supabase client
```

---

## Usage

1. Start the development server:

```bash
npm run dev
```

2. Open `http://localhost:3000` in your browser.
3. Use the app to manage buyers, properties, and export leads.

> Make sure your Supabase project is correctly configured with the database tables for buyers and properties.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your message"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License**.

```

---

```
