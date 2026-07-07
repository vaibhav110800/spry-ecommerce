# Spry E-commerce

A modern, responsive e-commerce application built with **React, TypeScript, and Zustand**. The application allows users to browse products, search, filter, sort, mark favorites, switch themes, and enjoy a smooth shopping experience with a clean and reusable architecture.

---

## Live Demo

- **Application:** [Live Vercel Link](https://spry-ecommerce.vercel.app/)
- **Demo Video:** [G-drive Link](https://shorturl.at/eaTYK)

---

## Tech Stack

- React 19
- TypeScript
- Vite
- Zustand
- React Router DOM
- CSS Modules
- React Icons
- React Toastify

---

## Features

- Browse products in a responsive grid
- Search products (Debounced Search)
- Filter by category
- Filter by minimum rating
- Sort products by price (Ascending / Descending)
- Pagination
- Mark/Unmark favorite products
- Favorites page
- Favorites persisted using Local Storage
- Light/Dark theme with persistence
- Loading state
- Empty state for no products/favorites
- Toast notifications for user actions
- Fully responsive across desktop, tablet, and mobile devices

---

## Architecture

The project follows a modular and scalable folder structure.

- **components/** – Reusable UI components (Header, Product Card, Dropdown, Input, Pagination, Empty State, etc.)
- **hooks/** – Custom reusable hooks (e.g. `useDebounce`)
- **pages/** – Route-level components
- **services/** – Mock API and Local Storage services
- **store/** – Zustand global state management
- **types/** – Shared TypeScript interfaces and types
- **utils/** – Pure helper functions (filtering, sorting, formatting, constants)

---

## State Management

The application uses **Zustand** for global state management.

### Why Zustand?

- Minimal boilerplate compared to Redux
- Simpler and more lightweight than Context API for application-wide state
- Easy to read and maintain
- Avoids unnecessary Provider nesting
- Perfect for the scale of this application

Global state includes:

- Products
- Search
- Filters
- Sorting
- Favorites
- Theme
- Loading & Error states

---

## Reusable Hooks & Utilities

### Custom Hook

- **useDebounce**
  - Optimizes product search by reducing unnecessary state updates while typing.

### Utility Functions

- `filterProducts` – Filters products based on search, category, and rating.
- `sortProducts` – Sorts products by price.
- `formatCurrency` – Formats product prices consistently.
- `constants` – Centralized application constants.

Keeping business logic outside components improves readability, reusability, and testability.

---

## Accessibility & SEO

The application follows basic accessibility and semantic HTML best practices.

- Semantic HTML (`header`, `main`, etc.)
- Descriptive image `alt` attributes
- `aria-label` added to icon-only buttons
- Proper heading hierarchy
- Meaningful page structure for improved SEO

---

## Theme Support

- Light and Dark mode
- Theme persisted using Local Storage
- Implemented using CSS Variables
- Smooth transition between themes

---

## Responsive Design

The application is responsive across:

- Desktop
- Tablet
- Mobile devices

The layout adapts using flexible grids and responsive CSS to provide a consistent user experience across screen sizes.

---

## Loading & Empty States

To improve user experience:

- Simulated API loading state while fetching products
- Dedicated Empty State component for:
  - No search results
  - No favorite products

---

## Code Quality

The project emphasizes maintainability by following clean coding practices.

- TypeScript throughout the project
- Reusable components
- Modular CSS using CSS Modules
- Reusable hooks and utility functions
- Consistent folder structure
- Comments added across the codebase where necessary to improve readability and explain important implementation decisions

---

## Installation

```bash
npm install
npm run dev
```

---

## Future Improvements

- Skeleton loaders
- Unit testing
- Product details page
- Server-side pagination
- Wishlist synchronization with backend
- Product API integration

---

Thank you for reviewing the project!
