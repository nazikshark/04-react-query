# React Movies Search — TanStack Query & Pagination 🚀

This project is an advanced version of the Movie Search application, refactored to use **TanStack Query** for state management and **React Paginate** for seamless navigation through movie collections.

## 📋 Project Updates & Features
- **TanStack Query Integration**: Completely refactored data fetching logic. No more manual `useState` and `useEffect` for API calls.
- **Server State Management**: Automatic caching, background updates, and built-in handling of loading and error states.
- **Advanced Pagination**: Implemented `page`-based fetching using TMDB API.
- **Enhanced UI**: Integrated `react-paginate` for intuitive navigation through multiple result pages.
- **Persistent Search**: Synchronized pagination state with search queries.

## 🚀 Technical Highlights:

### 1. TanStack Query (React Query)
- **Query Client Setup**: Configured at the root level in `main.tsx`.
- **`useQuery` Hook**: Utilized for fetching data, where the `queryKey` includes both the search term and the current page number to ensure unique caching.
- **Optimized Fetching**: Automatic re-fetching and data synchronization without manual intervention.

### 2. Pagination Logic
- **`total_pages` Awareness**: The application now respects the total number of pages provided by the TMDB API.
- **Dynamic Controls**: The pagination bar only appears when `total_pages > 1`.
- **Zero-indexed Handling**: Seamless conversion between React Paginate's 0-based indexing and TMDB's 1-based page system.

### 3. TypeScript & Clean Code
- **Response Typing**: Updated interfaces to include `total_pages` and `total_results`.
- **Strict Prop Typing**: All components, including the new pagination integration, are strictly typed with TypeScript interfaces.
- **Prettier & Modules**: Maintained high code standards with CSS Modules and Prettier formatting.

## 🛠 Tech Stack:
- **Framework**: React 18 (Vite)
- **Data Fetching**: TanStack Query (React Query), Axios
- **Pagination**: React Paginate
- **Notifications**: React Hot Toast
- **Language**: TypeScript
- **Deployment**: Vercel

## 🔗 Live Demo:
[Link to your Vercel deployment here]
