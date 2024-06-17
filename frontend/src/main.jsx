import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';

import './fonts.scss';

import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import Lesson from './pages/Lesson';
import CreateLessonPage from './pages/CreateLessonPage';

import { LessonContextProvider } from './context/LessonsContext';
import { NotificationContextProvider } from './context/NotificationContext';
import { AuthContextProvider } from './context/AuthContext';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "/lesson/:id",
        element: <Lesson/>,
      },
      {
        path: "/create",
        element: <CreateLessonPage/>
      },
      {
        path: "/update/:id",
        element: <CreateLessonPage/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <LessonContextProvider>
        <NotificationContextProvider>
            <CssBaseline enableColorScheme />
            <RouterProvider router={router} />
          </NotificationContextProvider>
      </LessonContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
