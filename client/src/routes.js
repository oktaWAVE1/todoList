import IndexPage from "./pages/IndexPage";
import AuthPage from "./pages/AuthPage";

export const publicRoutes = [
    {path: '/', element: <IndexPage/>},
    {path: '/login', element: <AuthPage/>},
    {path: '/reg', element: <AuthPage/>},
]

export const authRoutes = [
    {path: '/', element: <IndexPage/>},
    {path: '/login', element: <AuthPage/>},
    {path: '/reg', element: <AuthPage/>},
]