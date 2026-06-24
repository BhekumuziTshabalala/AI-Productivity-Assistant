# 🚀 AI Productivity Assistant

A modern, responsive, and robust SaaS web application designed to help professionals automate and streamline their daily workplace tasks using Artificial Intelligence. Built with **React**, **Vite**, and **Tailwind CSS v4**, this application provides a sleek UI/UX similar to top-tier platforms like Notion or Asana.

---

## ✨ Key Features

The platform is divided into five core AI-powered modules:

1. **✉️ Smart Email Generator**
   Draft professional emails in seconds. Input your rough context and select a tone (Professional, Friendly, Persuasive, Urgent). The AI handles the rest.

2. **📝 Meeting Notes Summarizer**
   Turn messy, raw transcripts into structured documentation. Extracts an Executive Summary, interactive Action Items (checklists), and tracked Deadlines.

3. **📋 AI Task Planner**
   Brain-dump your daily to-dos in one chaotic paragraph and let the AI organize them into a clean, Kanban-style board categorized by priority (High, Medium, Low) and suggested time blocks.

4. **🔍 AI Research Assistant**
   Accelerate your learning. Input a topic or paste an article to receive a high-level summary, bulleted key insights, and actionable strategic recommendations.

5. **💬 AI Chatbot Interface**
   Your dedicated workplace companion. A conversational interface with persistent history and bouncy typing indicators for ad-hoc brainstorming and questions.

### 🌟 Global UX Features
- **Dark Mode**: Persistent Light/Dark theme toggling using a sleek custom variant and fluid transitions.
- **Responsive Layout**: A collapsible left sidebar for mobile devices, ensuring a seamless experience across desktop, tablet, and mobile.
- **Editable Outputs**: Every AI-generated response is placed in an editable text area so you can tweak it before copying.
- **Responsible AI Disclaimer**: A global footer reminding users to verify all AI outputs before professional use.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) via [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (`useState`, `useEffect`)

---

## 🚀 Getting Started

Follow these steps to run the application locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone the repository (or navigate to the project folder) and install the dependencies:
```bash
# Navigate to the project directory
cd AI-Productivity-Assistant

# Install dependencies
npm install
```

### 3. Running the Development Server
Start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## 🔌 Connecting to Real AI Models (LLMs)

Currently, the application uses **mock data** and simulated network latency to demonstrate functionality without requiring API keys.

To connect the application to a real Large Language Model (like OpenAI's GPT-4 or Anthropic's Claude):

1. Open `src/services/aiApi.js`.
2. Locate the placeholder functions (`generateEmail`, `summarizeMeetingNotes`, etc.).
3. Replace the `delay` and mock return objects with actual `fetch` or Axios calls to your preferred LLM provider's API.
4. *Tip: For production, ensure you proxy your API calls through a secure backend so you don't expose your API keys in the client-side code.*

---

## 🛡️ Disclaimer

**Responsible AI Disclaimer:** AI-generated content may be inaccurate or hallucinate facts. Please verify all outputs before relying on them for professional use.

---

*Designed and built by Antigravity.*
