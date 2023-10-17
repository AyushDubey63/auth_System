import React from 'react'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import './index.css'

import Username from './components/Username'
import Password from './components/Password'
import Reset from './components/Reset'
import Register from './components/Register'
import Recovery from './components/Recovery'
import Profile from './components/Profile'
import PageNotFound from './components/PageNotFound'

/** auth middleware */
import { AuthorizeUser,ProtectRoute } from './middleware/auth'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>
  },{
    path: '/password',
    element: <ProtectRoute>  <Password/> </ProtectRoute>
  },{
    path: '/register',
    element: <Register></Register>
  },{
    path: '/profile',
    element: <AuthorizeUser> <Profile/> </AuthorizeUser> 
  },{
    path: '/recovery',
    element: <Recovery></Recovery>
  },{
    path: '/reset',
    element: <Reset></Reset>
  },{
    path: '*',
    element: <PageNotFound></PageNotFound>
  }
])
function App() {
  return (
    <main className="App">
      <RouterProvider router={router}></RouterProvider>
      
    </main>
  );
}

export default App;
