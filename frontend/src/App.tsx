import { createBrowserRouter,RouterProvider } from "react-router"
import Register from "./pages/Register"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "react-hot-toast"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div> Page Not Found</div>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      }
    ]
  }
])

const App = () => {

  return (
    <>
    <Toaster />
   <RouterProvider router={router} />
   </>
  )
}

export default App