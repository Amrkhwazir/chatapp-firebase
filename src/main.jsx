import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import ChatRoom from "./compnents/ChatRoom.jsx"
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.jsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/inbox",
    element: <ChatRoom />
  },
  {
    path: "/login",
    element: <Login />
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
