
# 🏥 Mediloon Health Hub

AI-powered modern pharmacy web application built with React, TypeScript, and Tailwind CSS.
Mediloon provides smart medicine discovery, AI recommendations, cart management, and seamless checkout experience.

---

## ✨ Features

* 🤖 AI-powered medicine recommendations
* 🔍 Smart product search
* 🛒 Add to Cart functionality
* ⚡ Buy Now flow
* 📦 Dynamic Cart management
* 💳 Checkout flow
* 🎨 Modern responsive UI
* 📱 Mobile friendly design
* ⚛️ Built with React + TypeScript
* 🎯 Clean component architecture

---

## 🧠 Tech Stack

**Frontend**

* React + TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* React Router DOM
* TanStack React Query
* Lucide Icons


---

## 🚀 Getting Started

Follow these steps to run the project locally.

---

### ✅ 1. Clone the repository

```bash
git clone #url
```

---

### ✅ 2. Navigate to project folder

```bash
cd mediloon-health-hub
```

---

### ✅ 3. Install dependencies

```bash
npm install
```

or

```bash
bun install
```

---

### ✅ 4. Start development server

```bash
npm run dev
```

---

### ✅ 5. Open in browser

```
http://localhost:8080
```

---

## 🖥️ Running the Backend API

A simple Express server provides the `/medicines` endpoint on port 8000. It lives in the `server` folder and is completely separate from the frontend.

1. Open a new terminal in the repository root.
2. Change directory and install:
   ```bash
   cd server
   npm install
   ```
3. Start the API:
   ```bash
   npm start
   ```
4. The frontend will fetch product data from `http://localhost:8000/medicines`.

You can modify `server/index.js` if you want to connect to a real database later.

---

## 🛒 User Flow

1. Browse medicines on Dashboard
2. Click product → opens Product Detail
3. Add to Cart → item added with toast
4. View Cart → manage quantity
5. Checkout → place order

---

## 🔧 Available Scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview build
npm run lint     # run linter
```

---

## 🌟 Future Improvements

* 🔐 Authentication system
* 🧾 Order history
* 🤖 Real AI backend integration
* 💰 Payment gateway integration
* 📦 Inventory management
* 🔔 Notifications system

---

⭐ If you like this project, don't forget to star the repo!
