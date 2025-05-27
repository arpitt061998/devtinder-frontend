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
import Connections from './components/Connections.jsx';
import Requests from './components/Requests.jsx';
import Signup from './components/Signup.jsx';
import Chat from './components/Chat.jsx';

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
        path: "signup",
        element: <Signup/>
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute> 
            <Profile/>
          </ProtectedRoute>
        ),
      },
      {
        path: "connections",
        element: (
          <ProtectedRoute> 
            <Connections/>
          </ProtectedRoute>
        ),
      },
      {
        path: "requests",
        element: (
          <ProtectedRoute> 
            <Requests/>
          </ProtectedRoute>
        ),
      },
      {
        path: "chat/:targetUserId",
        element: (
          <ProtectedRoute> 
            <Chat/>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
)
