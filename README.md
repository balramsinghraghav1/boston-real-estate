# 🏠 Boston Real Estate – AI-Powered Property Marketplace

![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![ONNX](https://img.shields.io/badge/ONNX_Runtime-005CED?style=for-the-badge&logo=onnx&logoColor=white)

A modern, full-stack real estate application featuring role-based access control, real-time database management, and **client-side AI price prediction**.

Built with **React + Vite** and **Firebase**, this project integrates a pre-trained Random Forest model using **ONNX Runtime Web** to predict housing prices in real-time directly in the browser, without needing a backend Python server.

---

## 🚀 Key Features

### 🔐 Authentication & Roles
- **Secure Login:** Email/Password authentication via Firebase Auth.
- **Role-Based Access:**
  - **Buyers:** Can browse listings and save properties to "Favorites".
  - **Dealers:** Can upload, edit, and delete their own property listings.

### 🏘 Property Management
- **CRUD Operations:** Dealers can manage listings with real-time updates using Firestore.
- **Image Storage:** Property images are securely uploaded and retrieved via Firebase Storage.
- **Glassmorphic UI:** A modern, responsive interface designed for mobile and desktop.

### 📈 AI Price Predictor (ONNX)
- **Client-Side Inference:** Runs a Machine Learning model directly in the browser using WebAssembly.
- **Zero Latency:** No API calls to external ML servers; predictions happen instantly.
- **Dataset:** Trained on the standard 13-feature Boston Housing dataset.

---

## 🛠 Tech Stack

* **Frontend:** React (v18), Vite, React Router DOM
* **Backend as a Service:** Firebase (Auth, Firestore, Storage)
* **Machine Learning:** Scikit-Learn (Training), ONNX Runtime Web (Inference)
* **Styling:** CSS3 (Glassmorphism design system)
* **Deployment:** Vercel

---

## 📂 Project Structure

```bash
boston-real-estate/
│
├── public/
│   ├── model.onnx            # AI Model file
│   └── ort-wasm-simd.wasm    # ONNX WebAssembly backend (v1.18.0)
│
├── src/
│   ├── assets/               # Backgrounds (web_bg.png, web_bg2.png)
│   │
│   ├── components/           # Reusable UI Components
│   │   ├── Header.jsx
│   │   ├── Loader.jsx
│   │   ├── PropertyCard.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/                # Application Routes
│   │   ├── Calculator.jsx    # AI Inference Logic
│   │   ├── Dashboard.jsx     # Dealer Management
│   │   ├── Detail.jsx        # Property Details
│   │   ├── Edit.jsx          # Edit Property
│   │   ├── Favorites.jsx     # User Favorites
│   │   ├── Home.jsx          # Landing Page
│   │   ├── Login.jsx         # Authentication
│   │   ├── Profile.jsx       # User Profile
│   │   ├── Properties.jsx    # Listing Feed
│   │   ├── Signup.jsx        # Registration
│   │   └── Upload.jsx        # Add New Property
│   │
│   ├── App.jsx               # Main App Layout
│   ├── auth.jsx              # Authentication Context
│   ├── firebase.js           # Firebase Configuration
│   ├── index.css             # Global Styles
│   └── main.jsx              # Entry Point
│
├── .gitignore
├── index.html
├── package.json
└── vite.config.js

No problem. I have removed the MIT License badge and the License section from the README below to make it accurate for your current repository status.

Here is the corrected, full README.md:

Markdown

# 🏠 Boston Real Estate – AI-Powered Property Marketplace

![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![ONNX](https://img.shields.io/badge/ONNX_Runtime-005CED?style=for-the-badge&logo=onnx&logoColor=white)

A modern, full-stack real estate application featuring role-based access control, real-time database management, and **client-side AI price prediction**.

Built with **React + Vite** and **Firebase**, this project integrates a pre-trained Random Forest model using **ONNX Runtime Web** to predict housing prices in real-time directly in the browser, without needing a backend Python server.

---

## 🚀 Key Features

### 🔐 Authentication & Roles
- **Secure Login:** Email/Password authentication via Firebase Auth.
- **Role-Based Access:**
  - **Buyers:** Can browse listings and save properties to "Favorites".
  - **Dealers:** Can upload, edit, and delete their own property listings.

### 🏘 Property Management
- **CRUD Operations:** Dealers can manage listings with real-time updates using Firestore.
- **Image Storage:** Property images are securely uploaded and retrieved via Firebase Storage.
- **Glassmorphic UI:** A modern, responsive interface designed for mobile and desktop.

### 📈 AI Price Predictor (ONNX)
- **Client-Side Inference:** Runs a Machine Learning model directly in the browser using WebAssembly.
- **Zero Latency:** No API calls to external ML servers; predictions happen instantly.
- **Dataset:** Trained on the standard 13-feature Boston Housing dataset.

---

## 🛠 Tech Stack

* **Frontend:** React (v18), Vite, React Router DOM
* **Backend as a Service:** Firebase (Auth, Firestore, Storage)
* **Machine Learning:** Scikit-Learn (Training), ONNX Runtime Web (Inference)
* **Styling:** CSS3 (Glassmorphism design system)
* **Deployment:** Vercel

---

## 📂 Project Structure

```bash
boston-real-estate/
│
├── public/
│   ├── model.onnx            # AI Model file
│   └── ort-wasm-simd.wasm    # ONNX WebAssembly backend (v1.18.0)
│
├── src/
│   ├── assets/               # Backgrounds (web_bg.png, web_bg2.png)
│   │
│   ├── components/           # Reusable UI Components
│   │   ├── Header.jsx
│   │   ├── Loader.jsx
│   │   ├── PropertyCard.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/                # Application Routes
│   │   ├── Calculator.jsx    # AI Inference Logic
│   │   ├── Dashboard.jsx     # Dealer Management
│   │   ├── Detail.jsx        # Property Details
│   │   ├── Edit.jsx          # Edit Property
│   │   ├── Favorites.jsx     # User Favorites
│   │   ├── Home.jsx          # Landing Page
│   │   ├── Login.jsx         # Authentication
│   │   ├── Profile.jsx       # User Profile
│   │   ├── Properties.jsx    # Listing Feed
│   │   ├── Signup.jsx        # Registration
│   │   └── Upload.jsx        # Add New Property
│   │
│   ├── App.jsx               # Main App Layout
│   ├── auth.jsx              # Authentication Context
│   ├── firebase.js           # Firebase Configuration
│   ├── index.css             # Global Styles
│   └── main.jsx              # Entry Point
│
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
⚡ Installation & Setup
1. Clone the repository
Bash

git clone [https://github.com/balramsinghraghav1/boston-real-estate.git](https://github.com/balramsinghraghav1/boston-real-estate.git)
cd boston-real-estate
2. Install dependencies
Bash

npm install
3. Configure Environment Variables
Create a .env file in the root directory and add your Firebase credentials:

Code snippet

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
4. Run Locally
Bash

npm run dev
The app will launch at http://localhost:5173.

🤖 AI Model Usage
The application uses ONNX Runtime Web to load the model.onnx file located in the public folder. It uses a specific WASM backend (ort-wasm-simd.wasm) for performance.

Features utilized for prediction:

CRIM (Crime rate)

ZN (Residential land zone)

INDUS (Business acres)

CHAS (Charles River dummy var)

NOX (Nitric oxides concentration)

RM (Average rooms)

AGE (Age of units)

DIS (Distance to employment)

RAD (Highway accessibility)

TAX (Tax rate)

PTRATIO (Pupil-teacher ratio)

B (Black proportion)

LSTAT (% lower status population)

🚀 Deployment
This project is optimized for deployment on Vercel.

Push your code to GitHub.

Import the project in Vercel.

Add the Environment Variables in the Vercel Dashboard.

Important: Ensure model.onnx and ort-wasm-simd.wasm are present in the public/ folder before deploying.

Deploy!

❤️ Credits
Developer & UI Design: Balram Singh

Machine Learning Dataset: Boston Housing Dataset (CMU StatLib)

Technical Assistance: ChatGPT (OpenAI)
