# PO Manager App

A React Native application for Production Order (PO) management built with Expo, TypeScript, and Tamagui.

## Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- Yarn package manager
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository and install dependencies:**
```bash
git clone <repository-url>
cd po-manager
yarn install
```

2. **Set up environment variables:**
Create a `.env` file in the root directory and add your OpenAI API key:
```bash
cp .env.example .env
# Edit .env file and add your OpenAI API key
```

Example `.env` content:
```
OPENAI_API_KEY=your_openai_api_key_here
```

3. **Start the development server:**
```bash
yarn start
```

4. **Run on specific platforms:**
```bash
yarn ios         # Run on iOS simulator
yarn android     # Run on Android simulator/device
```


## Technical Notes

### Architecture Overview

The application follows a modern React Native architecture with the following key components:

#### Core Technologies
- **React Native with Expo**: Cross-platform mobile development framework
- **TypeScript**: Type safety and enhanced development experience
- **Tamagui**: Performance-optimized design system with compile-time styling
- **SQLite**: Local database for production order management
- **React Navigation**: Navigation library with Bottom Tab and Stack navigators
- **React Hook Form**: Form validation and state management

#### Project Structure

```
app/
├── components/          # Reusable UI components
├── screens/            # Screen components and navigation
├── database/           # SQLite database layer
├── hooks/             # Custom React hooks
├── navigators/        # Navigation configuration
├── services/          # API and external services
├── context/           # React Context providers
├── utils/             # Utility functions
└── theme/             # Tamagui theme configuration
```

#### Database Architecture

The application uses SQLite with a functional approach for data management:

- **Schema**: Production orders with fields for customer details, items, quantities, and status
- **Operations**: CRUD operations with optimized queries (ORDER BY id DESC for latest-first)
- **Connection Management**: Single database connection with proper initialization
- **Data Flow**: Functional approach with exported database functions

#### Key Features Implementation

1. **Production Order Management**
   - Create new production orders with form validation
   - View all orders in dashboard (latest first)
   - Update order status (Pending → In Progress → Completed)
   - Search functionality across all order fields

2. **Form Handling**
   - React Hook Form integration with TypeScript
   - Real-time validation with custom error messages
   - Date picker integration for delivery dates
   - Multiline text input for raw materials

3. **UI/UX Design**
   - Tamagui design system with consistent spacing and colors
   - Bottom sheet navigation for enhanced mobile experience
   - Toast notifications for user feedback
   - Responsive layouts with safe area handling

4. **State Management**
   - React Context for authentication state
   - Custom hooks for data fetching and caching
   - useFocusEffect for screen refresh on navigation

### Database Logic

The database layer implements a functional pattern with the following structure:

#### Core Functions
- `initDatabase()`: Initialize SQLite database and create tables
- `getAllProductionOrders()`: Fetch all orders with latest-first ordering
- `getProductionOrderById(id)`: Fetch specific order by ID
- `createProductionOrder(order)`: Insert new production order
- `updateProductionOrderStatus(id, status)`: Update order status
- `searchProductionOrders(query)`: Search across order fields


#### Query Optimization
- All list queries use `ORDER BY id DESC` for latest-first display
- Search functionality uses LIKE operators with wildcards
- Proper error handling with try-catch blocks
- Type-safe TypeScript interfaces for all database operations


##  AI Usage Log

This section documents how AI assistance was applied throughout the development process, including prompt objectives, responses, and real implementation outcomes.

| **Prompt** | **AI Response Summary** | **How You Applied It** |
|-------------|--------------------------|--------------------------|
| **Digest this. (SuDu AI React Native Mobile Developer Pre-Task document)** | Summarized the full pre-task document into a structured breakdown covering overview, requirements, deliverables, and evaluation criteria. | Used the digest to clearly understand task scope and plan the development flow (screens, SQLite schema, README requirements). |
| **Have a look at the AI Assistant task. I will need to have a system prompt for this AI Agent, I will be using GPT for this task. Use COSTAR template.** | Created a COSTAR-based system prompt defining Context, Objective, Style, Tone, Audience, and Response for the AI Assistant. | Used this prompt to shape the AI assistant’s behavior and ensure consistent output aligned with factory-use context. |
| **I will pull the needed data from database in JSON format and feed to GPT via API input.** | Suggested best practice for feeding SQLite data as JSON into GPT API input, maintaining structured and safe integration. | Implemented the design by preparing production orders in JSON format before sending to GPT. |
| **Output the system prompt in code for me to copy and paste.** | Provided the system prompt wrapped in a TypeScript constant (`SYSTEM_PROMPT`) for direct import into the codebase. | Added the exported constant into the project for GPT API calls, improving modularity and maintainability. |
| **Currently like this (showed OpenAI client code)** | Adjusted the GPT call to fit the new `responses.create()` OpenAI SDK format, integrating the system prompt and SQLite data. | Replaced sample “Talk like a pirate” with `SYSTEM_PROMPT` and SQLite JSON input to generate contextual insights. |
| **I want the response format in JSON so that I can pick the items and render in my own UI components.** | Revised the system prompt to enforce strict JSON output with `summary` and `insights` structure. | Implemented this structure to easily parse GPT output and render insights dynamically in the app UI. |
| **Make the New Order screen capable of submitting the form using React Hook Form** | Implemented React Hook Form integration with TypeScript validation, form controllers, and database service connection for production order creation. | Added comprehensive form handling with validation rules, Controller components, form submission logic, and database integration in `NewOrderScreen` component. |
| **Fix issues with DateInput and Calendar components** | Diagnosed `RangeError` issues in the Calendar component caused by undefined Tamagui design tokens. Implemented fallback values and null safety checks. | Fixed Calendar component crashes by adding token fallbacks, error boundaries, and proper handling of undefined design system tokens in DateInput implementation. |
| **Replace Alert dialogs with Toast messages** | Provided `react-native-toast-message` setup, configuration, and migration strategy from native Alert dialogs to toast notifications for better UX. | Replaced all `Alert.alert()` calls with `Toast.show()` throughout the application, implemented Toast provider setup, and created consistent success/error notification patterns. |
| **Display latest data first on the Dashboard** | Modified SQLite database queries to implement `ORDER BY id DESC` sorting for chronological data display with the latest entries first. | Updated `getAllProductionOrders()`, `searchProductionOrders()`, and related database functions to show the newest production orders first in the dashboard interface. |
| **Enable multiline input for raw materials field** | Extended the `TextInput` component architecture with an `isMultiline` prop while maintaining form validation and styling consistency. | Implemented multiline capability in the `TextInput` component with proper React Hook Form integration for the raw materials input field in the order creation form. |
