import { useAuth } from "../contexts/AuthContext";

export const useHasRole = (roleName) => {
    const { user } = useAuth();
    if (!user || !user.roles) return false;
    return user.roles.includes(roleName);
};