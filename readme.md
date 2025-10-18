# Screenarchive - Entertainment Web App

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Authentication**: NextAuth.js
- **API**: The Movie Database (TMDB) API

## 📋 Prerequisites

- Node.js 20.10.0 (see `.nvmrc`)
- npm or yarn package manager
- The Movie Database (TMDB) API key

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Entertainment-web-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# The Movie Database API
NEXT_PUBLIC_MOVIEDB_API_KEY=your_tmdb_api_key_here
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (defaultLayout)/   # Layout group for main pages
│   │   ├── details/       # Detail pages (movie, tv, person)
│   │   ├── Movies/        # Movies listing page
│   │   ├── Tv/            # TV shows listing page
│   │   └── page.tsx       # Home page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # App providers
├── components/            # Reusable components
│   ├── details/          # Detail page components
│   ├── filter/           # Filter components
│   ├── input/            # Input components
│   ├── layout/           # Layout components
│   ├── links/            # Link components
│   ├── MediaCard/        # Media card components
│   ├── svgs/             # SVG icons
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
│   ├── client.ts         # API client setup
│   ├── config.ts         # Site configuration
│   ├── Provider.tsx      # App providers
│   ├── TheMovieAPI.tsx   # TMDB API functions
│   └── utils.ts          # Utility functions
```
