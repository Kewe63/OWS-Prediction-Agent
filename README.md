# OWS Prediction Agent

The OWS Prediction Agent is an AI-powered prediction market tool developed for the OpenWallet Standard (OWS) Hackathon. With OWS Wallet, your private keys always remain secure. AI agents simply send transaction requests, and the system signs them according to the rules.

## 🚀 Features

- **AI-Powered Predictions:** Smart market analysis and an AI-driven prediction engine.
- **OWS Wallet Integration:** Secure, keyless, and seamless transaction experience.
- **AI integration:** AI agents can be integrated, which you can train in the areas you want..
- **Real-time Data Visualization:** Interactive charts powered by `recharts` and `lightweight-charts`.
- **Next-Gen Tech Stack:** High-performance application built with Vite + React.

## 🛠 Tech Stack

- [**React**](https://reactjs.org/) (v19) - UI Library
- [**Vite**](https://vitejs.dev/) - Fast development build tool
- [**Recharts**](https://recharts.org/) & [**Lightweight Charts**](https://tradingview.github.io/lightweight-charts/) - Data visualization and charting
- [**Lucide React**](https://lucide.dev/) - Iconography
- **OpenWallet Standard (OWS)** - Web3 Wallet infrastructure (Hackathon compliant)

## 📦 Installation & Setup

Follow these steps to run the project locally:

### 1. Prerequisites
Make sure you have Node.js (v18 or newer) installed on your system.

### 2. Install Dependencies

Open your terminal in the project directory (`ows-predic`) and run:

```bash
npm install
```

### 3. Start the Development Server

To launch the application in development mode:

```bash
npm run dev
```
## 📂 Project Structure

```text
OWS-Prediction-Agent/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── assets/             # Images, icons, and media
│   ├── components/         # Reusable React components (e.g., Entropy.jsx)
│   ├── App.jsx             # Main container & UI orchestration
│   ├── App.css             # Global styles and layout
│   ├── index.css           # Custom CSS and design tokens (Glassmorphism)
│   └── main.jsx            # Application entry point
├── agent-server.js         # Backend / Agent communication interface
├── index.html              # Vite entry HTML
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration

Your application will usually start at [http://localhost:5173](http://localhost:5173). Open this address in your browser to view the project.

### 4. Production Build

To build the project for production:

```bash
npm run build
```

## 📂 System Architecture & Workflow

```text
+------------------------------+
|           1. User            |
+--------------+---------------+
               |
             opens
               v
+--------------+---------------+
|   2. OWS Wallet Connection   |
+--------------+---------------+
               |
           connected
               v
+--------------+---------------+
|    3. Fetch Market Data      | <-----+
+--------------+---------------+       |
               |                       |
           data ready                  |
               v                       |
+--------------+---------------+       |
|   4. AI Prediction Engine    |       |
+--------------+---------------+       |
               |                       |
         recommendation             monitors
               v                       |
+--------------+---------------+       |
|        5. UI Display         |       |
+--------------+---------------+       |
               |                       |
            decision                   |
               v                       |
+--------------+---------------+       |
|      6. Execute Trade?       |  No   |
|        < YES / NO >          |-------+
+--------------+---------------+
               |
              Yes
               v
+--------------+---------------+
|     7. Create Tx Request     |
+--------------+---------------+
               |
        forward request
               v
+--------------+---------------+
|      8. OWS Rule Engine      |
+--------------+---------------+
               |
             signed
               v
+--------------+---------------+
|    9. Send to Blockchain     |
+--------------+---------------+
               |
               v
+--------------+---------------+
|    Transaction Completed     |
+------------------------------+
```

## 🏗️ Deployment

Since the project uses Vite, the `dist/` folder generated after the `build` command can be easily deployed to static hosts like Vercel, Netlify, or GitHub Pages.

## 🤝 Hackathon Objectives
This project is actively being developed to meet the goals of the **OpenWallet Hackathon**, combining the power of artificial intelligence with Web3 technologies.

---

- Built with ❤️ for the OWS Hackathon.
