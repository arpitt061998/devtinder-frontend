import Home from './components/Home'
import { createBrowserRouter, RouterProvider } from 'react-router'

function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
  ])
  return (
    <>
      <RouterProvider route = {appRouter} />
    </>
  )
}

export default App;
