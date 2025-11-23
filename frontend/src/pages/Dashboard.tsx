import { logoutUser } from "../api/auth";
import { useAuth } from "../hooks/useauth";

export default function Dashboard() {
  const { user, setUser} = useAuth();

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
