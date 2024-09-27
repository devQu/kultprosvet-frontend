import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/UI/HomePage/HomePage'
// import Registration from '../components/Auth/Registration'
import AuthProvider from '../components/Auth/AuthProvider'
import Registration from '../components/Auth/Registration'
import IAAA from '../components/Auth/IAAA'
import AdminPanel from '../components/Admin/AdminPanel'



export const useRoutes = (isAuthenticated: boolean) => {
    console.log("############ useRoutes ############ isAuthenticated : " + isAuthenticated)
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" Component={HomePage} />
                <Route path="/admin" Component={AdminPanel} />
            </Routes>
        )
    }
    return (
        <main>
            <AuthProvider >
                <Routes>
                    {/* <Route path="/" Component={HomePage} /> */}
                    <Route path="/registration" element={<Registration />} Component={Registration} />
                    <Route path="/auth" element={<IAAA />} Component={IAAA} />
                </Routes>
            </ AuthProvider>
            <Routes>
                <Route path="/" Component={HomePage} />
                <Route path="/admin" Component={AdminPanel} />
            </Routes>
        </main>
    )
}