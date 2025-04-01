## Build and Run Instructions

### Prerequisites

- Node.js (v18.x or higher)
- npm (v10.2.3 or higher)
- Angular CLI (v16.2.14)

### Installation

Clone the repository:

```bash
git clone https://github.com/nathanielb91/cypris.git
cd cypris
```

Install dependencies:

```bash
npm install
```

Set up Tailwind CSS:  
This project uses Tailwind CSS for styling. It's included in the dependencies and should be configured automatically during installation.

## Development Server

Run the development server:

```bash
ng serve
```

Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser.  
The application will automatically reload if you change any of the source files.

## Build for Production

To build the application for production:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/app/components/   → All UI components
src/app/services/     → API services and business logic
```

## API Integration

This project uses the CORE API to fetch academic research papers.  
To use a different API key:

1. Update the `coreApiKey` value in the environment file:

```
src/environments/environment.ts
```

2. If you don't have an environment file, create one based on the environment.template.ts in the project:

```typescript
export const environment = {
  production: false,
  coreApiKey: "YOUR_API_KEY_HERE",
};
```

## Features

- Search for academic research papers using boolean queries
- View paper details including authors, year, and publisher
- Filter by results per page (10, 25, 50, 100)
- Pagination support
- Data visualization by publication year

> **Note:** This repository was recreated on March 31, 2025 to clean up the commit history.
