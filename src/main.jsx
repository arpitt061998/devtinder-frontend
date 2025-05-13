import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Login from './components/Login.jsx';
import { Provider } from 'react-redux';
import appStore from './utils/appStore.js';
import Profile from './components/Profile.jsx';
import Feed from './components/Feed.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute> 
            <Feed/>
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute> 
            <Profile/>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>,
)
