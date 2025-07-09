export const useHasRole = (roleName) => {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return roles.includes(roleName);
};