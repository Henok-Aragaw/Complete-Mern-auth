import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../hooks/useauth";

export default function Login() {
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginUser(form);
    setUser(res.data.user);
    alert("Logged In");
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
}
