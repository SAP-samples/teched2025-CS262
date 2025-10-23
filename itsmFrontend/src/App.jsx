import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import SAPSelfService from "./pages/SAPSelfService.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-indigo-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
          <div className="flex items-center">
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-indigo-500 rounded-lg sm:hidden hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-200">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
              </svg>
            </button>
            <span className="flex items-center gap-3 ml-2">
              <span className="text-3xl font-extrabold text-indigo-700">ACME Inc.</span>
              <span className="text-xl font-semibold text-indigo-400 ml-2 mt-1">IT-Service Management</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-indigo-50 border-r border-indigo-200 sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg font-bold group transition ${isActive ? "text-indigo-700 bg-indigo-200" : "text-indigo-700 hover:bg-indigo-100"}`
                }
              >
                <svg className="w-5 h-5 text-indigo-400 transition duration-75 group-hover:text-indigo-700" viewBox="0 0 96.21 96.21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M73.36 96.21H22.85c-9.28 0-16.84-7.55-16.84-16.84V40.2c0-4.68 1.97-9.18 5.4-12.36L36.67 4.48c6.41-5.93 16.46-5.93 22.87 0L84.8 27.85c3.43 3.18 5.4 7.68 5.4 12.36v39.17c0 9.28-7.55 16.84-16.84 16.84Zm-6.73-9.62h6.73c3.98 0 7.22-3.24 7.22-7.22V40.2c0-2-.84-3.93-2.32-5.3L53 11.53c-2.75-2.54-7.05-2.54-9.8 0L17.94 34.9c-1.47 1.36-2.31 3.29-2.31 5.3v39.17c0 3.98 3.24 7.22 7.22 7.22h7.11V58.76c0-5.97 4.86-10.82 10.82-10.82h15.03c5.97 0 10.82 4.86 10.82 10.82v27.83Zm-27.05 0h17.43V58.76c0-.66-.54-1.2-1.2-1.2H40.78c-.66 0-1.2.54-1.2 1.2v27.83Z" />
                </svg>
                <span className="ms-3">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sap-self-service"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg font-bold group transition ${isActive ? "text-indigo-700 bg-indigo-200" : "text-indigo-700 hover:bg-indigo-100"}`
                }
              >
                <svg className="w-5 h-5 text-indigo-400 transition duration-75 group-hover:text-indigo-700" viewBox="0 0 96.21 96.21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M62.96 58.78c4.17 1.4 4.17 7.35 0 8.76C48.62 72.38 42.25 78.76 37.4 93.09c-1.41 4.16-7.31 4.16-8.72 0C23.83 78.76 17.46 72.38 3.12 67.54c-4.17-1.4-4.17-7.35 0-8.76 14.34-4.84 20.71-11.22 25.56-25.55 1.41-4.16 7.31-4.16 8.72 0 4.85 14.33 11.22 20.71 25.56 25.55ZM94.5 20.44c2.27-.76 2.27-4.01 0-4.78-7.82-2.64-11.3-6.12-13.95-13.95-.77-2.27-3.99-2.27-4.76 0-2.64 7.82-6.12 11.3-13.95 13.95-2.27.76-2.27 4.01 0 4.78 7.82 2.64 11.3 6.12 13.95 13.95.77 2.27 3.99 2.27 4.76 0 2.64-7.82 6.12-11.3 13.95-13.95Z" />
                </svg>
                <span className="ms-3">SAP Self-Service</span>
              </NavLink>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-indigo-200">
            <li>
              <a href="https://github.com/SAP-samples/teched2025-CS262" target="_blank" rel="noopener noreferrer" className="flex items-center p-2 text-indigo-700 rounded-lg hover:bg-indigo-100 group">
                <svg className="w-5 h-5 text-indigo-400 transition duration-75 group-hover:text-indigo-700" aria-hidden="true" viewBox="0 0 96.21 96.21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M48.1 9.62c21.22 0 38.48 17.26 38.48 38.48S69.32 86.58 48.1 86.58 9.62 69.32 9.62 48.1 26.89 9.62 48.1 9.62M48.1 0C21.65 0 0 21.65 0 48.1s21.65 48.1 48.1 48.1 48.1-21.65 48.1-48.1S74.56 0 48.1 0Zm.13 66.14h-.06c-3.32 0-5.98 2.69-5.98 6.01s2.72 6.01 6.04 6.01 6.01-2.69 6.01-6.01-2.69-6.01-6.01-6.01Zm-.13-48.1c-9.95 0-18.04 8.09-18.04 18.04 0 2.66 2.16 4.81 4.81 4.81s4.81-2.15 4.81-4.81c0-4.64 3.78-8.42 8.42-8.42s8.42 3.78 8.42 8.42-3.78 8.42-8.42 8.42c-2.66 0-4.81 2.16-4.81 4.81v6.01c0 2.65 2.15 4.81 4.81 4.81s4.81-2.16 4.81-4.81v-1.94c7.6-2.12 13.23-9.03 13.23-17.31 0-9.95-8.09-18.04-18.04-18.04Z" />
                </svg>
                <span className="ms-3">Help</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="p-4 sm:ml-64 mt-20">
        <main className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-3xl shadow-2xl border-2 border-indigo-200 mb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sap-self-service" element={<SAPSelfService />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
