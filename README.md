#  Personal Finance Tracker

A full-stack web app that helps you track expenses, incomes, debts, set budget & savings goals, and gain insights with intuitive graphs and progress bars.

##  Features

*  **Authentication** using JWT
*  **Expense, Income & Debt Management**
*  **Budget & Saving Goals** with progress tracking
*  **Data Visualizations** (Pie chart + Timeline)
*  Fully **responsive design**
*  Built with a clean modular architecture (frontend & backend)

## 🎥 Demo

![Demo GIF](./assets/demo.gif)

---

## 🛠️ Tech Stack

### Frontend

* [React](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [react-router-dom](https://reactrouter.com/)
* [react-icons](https://react-icons.github.io/react-icons)

### Backend

* [Express.js](https://expressjs.com/)
* [Prisma ORM](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [JWT Authentication](https://jwt.io/)

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/adityavinod/finance-tracker.git
cd finance-tracker
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Set up the database

```bash
# Go to backend/
cd ../backend

# Create a .env file
cp .env.example .env
```

Edit `.env` and set:

```
DATABASE_URL=postgresql://<your-db-url>
JWT_SECRET=your-secret-key
```

Run Prisma migrations:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run the app

```bash
# In backend/
npm run dev

# In frontend/
cd ../frontend
npm run dev
```

---


## ✅ Todo / Improvements

* [ ] Google OAuth login
* [ ] Email reminders for budget goals
* [ ] Export reports as CSV/PDF
* [ ] Mobile app version (React Native or Flutter)

