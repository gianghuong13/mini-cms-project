import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import DynamicForm from './DynamicForm';
import DynamicTable from './DynamicTable';

const DynamicPage = () => {
    const { pageKey } = useParams();
    const [config, setConfig] = useState(null);
    const [data, setData] = useState([]); 
    const [total, setTotal] = useState(0);
    const [reload, setReload] = useState(0);
    const [editItem, setEditItem] = useState(null);
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [showForm, setShowForm] = useState(false);

    const getApiByAction = (action) => config?.apiEndpoints?.[action];
    const getButtonByAction = (action) => config?.button?.find(b => b.action === action);
    const inTableButtons = config?.button?.filter(b => b.action !== 'create') || [];

    // Fetch config
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await api.get(`/page-configs/${pageKey}`);
                // console.log('Page config:', res.data);
                setConfig(res.data);
            } catch (error) {
                console.error('Error fetching page config:', error);
            }
        };
        fetchConfig();
    }, [pageKey]);

    // Fetch data
    useEffect(() => {
        const listApi = getApiByAction('list');
        if (listApi?.url) {
            // console.log('Loading data from:', config.api.get);
            api.get(listApi.url, { params: {...filters, page, limit} })
            .then(res => {
                const records = listApi.responseKey ? res.data[listApi.responseKey] : res.data;
                const totalCount = listApi.totalKey ? res.data[listApi.totalKey] : records.length;

                // console.log('Fetched data:', records);

                setData(records);
                setTotal(totalCount);
            })
            .catch(err => console.error('Load data failed: ', err));
        }
    }, [config, filters, page, limit, reload]);

    // console.log('data:', data);

    const handleEdit = (item) => {
        setEditItem(item);
        setShowForm(true);
    }

    const handleCreate = () => {
        setEditItem(null);
        setShowForm(true);
    }

    const handleCancel = () => {
        setShowForm(false);
        setEditItem(null);
    }

    const handleSubmit = async (formData) => {
        // console.log('Submitting form data:', formData);
        try {
            if (editItem?.id && getApiByAction('update')) {
                const url = getApiByAction('update').url.replace(':id', editItem.id);
                await api.put(url, formData);
            } else if (getApiByAction('create')) {
                const url = getApiByAction('create').url;
                await api.post(url, formData);
            }
            setShowForm(false);
            setEditItem(null);
            setReload(r => r + 1);
        } catch (error) {
            console.error('Submit failed: ', error);
        }
    }

    const handleDelete = async (item) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const url = getApiByAction('delete').url.replace(':id', item.id);
                await api.delete(url);
                setReload(r => r + 1);
            } catch (error) {
                console.error('Delete failed: ', error);
            } 
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPage(1);
        setReload(r => r + 1);
    }

    if (!config) return <div>Loading config...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{config.title}</h1>

            {config.button && (
                <div className="mb-4 float-end">
                    {getButtonByAction('create') && (
                        <button 
                            onClick={handleCreate}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                            + {getButtonByAction('create').label}
                        </button>
                    )}
                </div>
            )}

            {/* Form */}
            {showForm && config.form && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-6 rounded shadow-lg w-full max-w-md relative'>
                        <button 
                            onClick={handleCancel} 
                            className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
                        >
                            &times;
                        </button>

                        <h2 className='text-xl font-semibold mb-4'>
                            {editItem ? 'Edit' : 'Create'}
                        </h2>
            
                        <DynamicForm 
                            config={config.form} 
                            initialData={editItem} 
                            onSubmit={(formData) => {
                                handleSubmit(formData)
                                setShowForm(false);
                            }}
                            onCancel={handleCancel}
                        />
                    </div>
                </div>
            )}
            

            {/* Table */}
            {config.grid && (
                <div>
                    <p>({total} records)</p>
                    <DynamicTable 
                        columns={config.grid.columns} 
                        data={data} 
                        onFilterChange={handleFilterChange}
                        buttonConfig={inTableButtons}
                        onAction={(action, item) => {
                            if (action === 'update') return handleEdit(item);
                            if (action === 'delete') return handleDelete(item);
                        }}
                    />
                </div>
            )}

            <div className="mt-4 flex items-center gap-2">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Prev
                </button>
                <span>Page {page}</span>
                <button
                    disabled={page * limit >= total}
                    onClick={() => setPage(p => p + 1)}
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
  );
};

export default DynamicPage;
