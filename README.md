# 💰 ExpenseTracker Pro

[![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)

A premium, state-of-the-art financial management dashboard designed to provide deep insights into your spending habits. Built with **React 19**, **Firebase**, and **Tailwind CSS 4.0**, ExpenseTracker Pro combines rich aesthetics with powerful analytics.

---

## ✨ Key Features

- **🔐 Dual-Mode Authentication**: Seamlessly switch between **Firebase Auth** and a robust **LocalStorage Fallback** mode for offline-first capabilities.
- **📊 Advanced Analytics**: Interactive bar and pie charts powered by **Recharts** to visualize income vs. expense trends and category breakdowns.
- **💸 Financial Tracking**:
  - Full CRUD operations for Expenses and Incomes.
  - Smart categorization (Food, Transport, Salary, Freelance, etc.).
  - Transaction history with real-time filtering.
- **🎨 Premium UI/UX**:
  - **Glassmorphism Design**: High-end frosted glass effects and vibrant gradients.
  - **Micro-animations**: Smooth transitions powered by **Framer Motion**.
  - **Dark Mode Optimized**: Built from the ground up for a sleek dark aesthetic.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/)
- **Backend / Database**: [Firebase](https://firebase.google.com/) (Firestore & Auth), [Appwrite](https://appwrite.io/) (Legacy support)
- **Visualizations**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/darshan3187/Expense_Tracker.git
   cd Expense_Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY="your_api_key"
   VITE_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="your_project_id"
   VITE_FIREBASE_STORAGE_BUCKET="your_project.appspot.com"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
   VITE_FIREBASE_APP_ID="your_app_id"
   ```
   *Note: If environment variables are missing, the app will automatically default to LocalStorage Mode.*

4. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```text
├── src/
│   ├── appwrite/      # Legacy Appwrite configuration
│   ├── components/    # Reusable UI components & layouts
│   ├── firebase/      # Firebase Auth & Firestore services
│   ├── lib/           # Utility functions & mock data
│   ├── pages/         # Application views (Dashboard, Analytics, etc.)
│   ├── store/         # Redux Toolkit slices & store config
│   ├── App.jsx        # Main routing & application logic
│   └── index.css      # Global Tailwind design system
├── public/            # Static assets
└── index.html         # Entry point
```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact

Project Link: [https://github.com/darshan3187/Expense_Tracker](https://github.com/darshan3187/Expense_Tracker)

Developed with ❤️ by [Darshan](https://github.com/darshan3187)
