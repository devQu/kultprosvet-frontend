export const isActiveSession = () => {
    return !!localStorage.getItem("session_user_email") && !!localStorage.getItem("session_id")
}

export const getUserEmailFromLS = () => {
    const email = localStorage.getItem('session_user_email')
    return (email) ? JSON.parse(email) : ''
}