import React, { useState } from 'react'
import { registerUser } from '../api/auth';

const Register = () => {
    const [ form, setForm ] = useState({
        username: "",
        email: "",
        password: ""
    });

    const submit = async(e: React.FormEvent) => {
        e.preventDefault();

        await registerUser(form);
        alert("Registered! Now Login")
    }

  return (
    <form onSubmit={submit}>
        <input
         placeholder='Username'
         value={form.username}
         onChange={e => setForm({ ...form, username: e.target.value})}
        />
          <input 
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

        <input 
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button type='submit' className='cursor-pointer'>Register</button>
    </form>
  )
}

export default Register