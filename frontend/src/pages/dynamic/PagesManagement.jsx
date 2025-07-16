import { useState, useEffect } from 'react';
import api from '../../api/api'; 
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const PagesManagement = () => {

    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuth();
    const canManagePages = user && user.roles && user.roles.includes('admin');

    useEffect(() => {
        const fetchPages = async () => {
            try {
                setLoading(true);
                const response = await api.get('/page-configs');
                setPages(response.data);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };
        fetchPages();
    }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>List of Pages to Config</h1>
            {canManagePages && (
                <div className='float-right'>
                    <Link to="/pages/create" className="mb-4 inline-block">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                            + Create Page
                        </button>
                    </Link>
                </div>
            )}
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Page Key</th>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Active</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Created By</th>
                        {canManagePages && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {pages.map(page => (
                        <tr key={page.pageKey} className="hover:bg-gray-50">
                            <td className="border p-2">{page.pageKey}</td>
                            <td className="border p-2">{page.title}</td>
                            <td className="border p-2">
                                {page.isActive ? (
                                <span className="text-green-600 font-semibold">✔</span>
                                ) : (
                                <span className="text-red-600 font-semibold">✘</span>
                                )}
                            </td>
                            <td className="border p-2">{page.description || 'No description'}</td>
                            <td className="border p-2">{page.createdBy ? page.createdBy.name : 'Unknown'}</td>
                            {canManagePages && (
                                <td>
                                    <Link to={`/pages/edit/${page.pageKey}`} className="text-blue-500 hover:underline">
                                        <button className="bg-blue-600 hover:underline text-white px-3 py-1 ml-3 rounded">
                                            Edit
                                        </button>
                                    </Link>
                                    
                                    <button 
                                        className="bg-red-500 hover:underline ml-2 text-white px-3 py-1 rounded"
                                        onClick={async () => {
                                            if (window.confirm(`Are you sure you want to delete the page ${page.title}?`)) {
                                                try {
                                                    await api.delete(`/page-configs/${page.pageKey}`);
                                                    setPages(pages.filter(p => p.pageKey !== page.pageKey));
                                                } catch (err) {
                                                    setError(err.message);
                                                }
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PagesManagement