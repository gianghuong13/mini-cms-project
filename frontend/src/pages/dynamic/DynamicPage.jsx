import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import DynamicForm from '../../components/dynamic/DynamicForm';
import DynamicTable from '../../components/dynamic/DynamicTable';

const DynamicPage = () => {
    const { pageKey } = useParams();
    const [config, setConfig] = useState(null);
    const [data, setData] = useState([]); 
    const [total, setTotal] = useState(0);
    const [reload, setReload] = useState(0);
    const [editItem, setEditItem] = useState(null);

    const [showForm, setShowForm] = useState(false);

    // Fetch the page configuration based on the pageKey
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await api.get(`/page-configs/${pageKey}`);
                console.log('Page config:', res.data);
                setConfig(res.data);
            } catch (error) {
                console.error('Error fetching page config:', error);
            }
        };
        fetchConfig();
    }, [pageKey]);

    // Fetch data based on the config's API endpoint
    useEffect(() => {
        if (config?.api?.get) {
            console.log('Loading data from:', config.api.get);
            api.get(config.api.get)
            .then(res => {
                const key = config.api.responseKey;
                const totalKey = config.api.totalKey;
                const records = key ? res.data[key] : Array.isArray(res.data) ? res.data : [];
                const totalCount = totalKey ? res.data[totalKey] : records.length;

                console.log('Fetched data:', records);

                setData(records);
                setTotal(totalCount);
            })
            .catch(err => console.error('Load data failed: ', err));
        }
    }, [config, reload]);

    console.log('data:', data);

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
            if (editItem?.id && config.api.put) {
                await api.put(config.api.put.replace(':id', editItem.id), formData);
            } else if (config.api.post) {
                await api.post(config.api.post, formData);
            }
            setEditItem(null);
            setReload(r => r + 1);
        } catch (error) {
            console.error('Submit failed: ', error);
        }
    }

    const handleDelete = async (item) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(config.api.delete.replace(':id', item.id));
                setReload(r => r + 1);
            } catch (error) {
                console.error('Delete failed: ', error);
            } 
        }
    };

    if (!config) return <div>Loading config...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{config.title}</h1>

            {config.button && (
                <div className="mb-4 float-end">
                    {config.button.find(b => b.action === 'create') && (
                        <button 
                            onClick={handleCreate}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                            + Create
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
                <DynamicTable 
                    columns={config.grid.columns} 
                    data={data} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete}
                />
            )}

            <p>Total: {total}</p>
        </div>
  );
};

export default DynamicPage;
