# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 windsurf statistics web application that displays professional windsurf competition data from a MySQL database. The app provides various views including athlete profiles, event calendars, head-to-head comparisons, and statistical analysis with interactive charts.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Database Configuration

The application connects to a MySQL database called `jfa_heatwave_db`. Create a `.env.local` file with:

```bash
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=jfa_heatwave_db
```

The main database view used is `athlete_profile_results` which contains columns for event dates, locations, athlete names, rankings, and event IDs.

## Architecture

### API Structure
- **Next.js App Router**: All API routes in `src/app/api/`
- **Database Layer**: MySQL connections using `mysql2/promise`
- **API Endpoints**:
  - `/api/athlete-profile-results` - Main athlete data with filtering
  - `/api/athlete-filters` - Available athletes for filtering
  - `/api/calendar` - Event calendar data
  - `/api/heat-data` - Detailed heat/competition data
  - `/api/heatsheets` - Heat sheet information

### Frontend Structure
- **Pages**: `src/app/[page]/page.tsx` for main routes
- **Components**: 
  - `components/athletes/` - Athlete-specific UI components
  - `components/charts/` - Chart components using Recharts
  - `components/ui/` - Reusable UI components
- **Types**: `lib/types.ts` - TypeScript interfaces for data models
- **Utilities**: `lib/data-utils.ts` - Data processing functions

### Key Technologies
- **Next.js 15** with App Router and Turbopack
- **TypeScript** with strict configuration
- **Tailwind CSS 4** for styling
- **Recharts** for data visualization
- **MySQL2** for database connectivity
- **PapaParse** for CSV data handling
- **React 19** with latest features

### Data Flow
1. API routes query MySQL database views
2. Data is transformed and typed using interfaces from `lib/types.ts`
3. Components consume API data via fetch requests
4. Charts and tables render processed data using Recharts and custom components

### Path Aliases
- `@/*` maps to `./src/*` for clean imports