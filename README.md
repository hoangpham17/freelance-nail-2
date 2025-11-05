# Madison Nail Lounge

A modern, luxurious nail salon website built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Luxurious Design** - Elegant and modern UI with gold accents
- **Responsive Layout** - Works perfectly on all devices
- **Dynamic Content** - Content fetched from Airtable using official API
- **Multiple Pages** - Home, Services, Host A Party, Gallery, About Us, Our Policies
- **Image Gallery** - Beautiful filterable gallery using Picsum Photos

## 🛠 Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe code
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Airtable.js** - Official Airtable API library
- **ESLint** - Code quality and linting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

## Available Scripts

### `npm run dev`

Runs the app in development mode with hot module replacement (HMR).\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run preview`

Locally preview the production build.\
Make sure to run `npm run build` first.

### `npm run lint`

Runs ESLint to check for code quality issues.

## 📁 Project Structure

```
freelance-nail-2/
├── public/                          # Static assets
├── src/
│   ├── components/                  # Reusable components
│   │   ├── Navigation.tsx          # Header navigation
│   │   └── Footer.tsx              # Footer with contact info
│   ├── pages/                      # Page components
│   │   ├── Home/
│   │   ├── Services/
│   │   ├── HostAParty/
│   │   ├── Gallery/
│   │   ├── AboutUs/
│   │   └── OurPolicies/
│   ├── hooks/                      # Custom React hooks
│   │   └── useAirtable.ts         # Hook for fetching Airtable data
│   ├── services/                   # API services
│   │   └── airtable.service.ts    # Airtable.js integration
│   ├── routes/                     # Route definitions
│   │   └── Routes.ts
│   ├── types/                      # TypeScript type definitions
│   │   └── airtable.types.ts
│   ├── App.tsx                     # Main App component
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global Tailwind styles
├── AIRTABLE_INTEGRATION.md         # Airtable setup guide
├── .env                            # Environment variables (git-ignored)
├── .env.example                    # Environment variables template
├── index.html                      # HTML template
├── package.json                    # Project dependencies
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite configuration
└── .eslintrc.cjs                   # ESLint configuration
```

## 🔌 Airtable Integration

This project uses **Airtable.js official library** to fetch data from Airtable.

### Quick Setup

1. **Get API Key**:

   - Go to https://airtable.com/create/tokens
   - Create a new token with `data.records:read` scope
   - Add access to base `appj9Es9rfmtwnDZn`
   - Copy the token

2. **Create `.env` File**:

   ```env
   VITE_AIRTABLE_API_KEY=your_api_key_here
   ```

3. **Configure Table IDs**:

   ```typescript
   // src/services/airtable.service.ts
   export const AIRTABLE_ENDPOINTS = {
     aboutUs: "tblWIqcxLfO7p3Vgs", // Your table ID
   };
   ```

4. **Use in Components**:

   ```tsx
   import { useAirtable } from "../../hooks/useAirtable";
   import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";

   const { data, loading, error } = useAirtable(AIRTABLE_ENDPOINTS.aboutUs);
   ```

📖 For detailed instructions, see [AIRTABLE_INTEGRATION.md](./AIRTABLE_INTEGRATION.md)

## 🎨 Design System

### Colors

- **Primary Gold**: `#C9A05C` - Elegant luxury
- **Secondary Dark**: `#2C2C2C` - Sophisticated contrast
- **Accent Cream**: `#FFF8F0` - Soft background

### Fonts

- **Headings**: Playfair Display (serif) - Classic elegance
- **Body**: Inter (sans-serif) - Modern readability

### Components

- Custom navigation with mobile menu
- Responsive footer with business info
- Reusable page layouts
- Interactive gallery with filters

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` folder, ready to deploy to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Environment Variables

For production deployment, add `VITE_AIRTABLE_API_KEY` to your hosting platform's environment variables:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **GitHub Pages**: Use GitHub Actions secrets

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Airtable API](https://airtable.com/developers/web/api/introduction)
- [Airtable.js Library](https://github.com/Airtable/airtable.js)

## 📝 License

This project is private and proprietary.
