import { useState, useEffect } from "react";
import api from "../api/api";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data.users);
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await api.get('/roles');
      setRoles(res.data.roles);
    } catch (err) {
      setError(err.messge);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignRole = async (userId) => {
    const roleId = selectedRoles[userId];
    if (!roleId) return alert("Please select a role!");
    try {
      await api.put("/users/assign-role", { userId, roleId });
      alert("Role assigned");
      fetchUsers();
    } catch (err) {
      alert("Failed to assign role: " + err.message);
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <table className="table-auto w-full border border-collapse border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Email</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Current Roles</th>
            <th className="border px-4 py-2">Assign New Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="px-4 py-2 border">
                    {user.roles && user.roles.length > 0
                    ? user.roles.map((role) => role.name).join(", ")
                    : "No role"}
                </td>
                <td className="border px-4 py-2 flex gap-2">
                  <select
                    className="border p-1"
                    value={selectedRoles[user.id] || ""}
                    onChange={(e) =>
                      setSelectedRoles((prev) => ({
                        ...prev,
                        [user.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">-- Select Role --</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="bg-green-500 text-white px-1 py-1 rounded"
                    onClick={() => handleAssignRole(user.id)}
                  >
                    Assign
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
