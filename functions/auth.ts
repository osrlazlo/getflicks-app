const API_PATH = import.meta.env.VITE_API_PATH
export async function handleLogin(emailOrUsername:string, password:string) {
    
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            emailOrUsername,
            password,
    })}
    
    const login = await fetch(`${API_PATH}/auth/login`, options)
    const result = await login.json()
    return result
}

export async function handleRegister(email:string, username:string, password:string, passwordConfirm:string) {
    
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            username,
            password,
            passwordConfirm,
    })}
    
    const register = await fetch(`${API_PATH}/auth/register`, options)
    const result = await register.json()
    return result
}