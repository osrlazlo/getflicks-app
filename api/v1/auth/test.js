const register = await fetch('http://localhost:3000/api/v1/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    username: 'osrlazlo',
    password: 'pass123P$',
    passwordConfirm: 'pass123P$'
  })
})
const data = await register.json()
console.log(data)

const login = await fetch('http://localhost:3000/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    emailOrUsername: 'test@example.com',
    password: 'pass123P$',
  })
})
const data2 = await login.json()
console.log(data2)