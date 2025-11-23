import { useAuthStore } from "../store/authstore";

export const useAuth = () => {
    const { user, loading, setUser, logout, loadUser } = useAuthStore();
    return {
        user,
        loading,
        setUser,
        logout,
        loadUser
    }
}