import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import FormConfigEditor from '../../components/pageConfig/FormConfigEditor';
import GridConfigEditor from '../../components/pageConfig/GridConfigEditor';
import ApiConfigEditor from '../../components/pageConfig/ApiConfigEditor';
import ButtonConfigEditor from '../../components/pageConfig/ButtonConfigEditor';

const tabs = ['form', 'grid', 'api', 'button'];

const CreatePageConfig = () => {
    const navigate = useNavigate();

    const [pageConfig, setPageConfig] = useState({
        pageKey: '',
        title: '',
        form: { fields: [] },
        grid: { columns: [] },
        apiEndpoints: {},
        button: [],
        isActive: true,
        description: ''
    });

    const [currentTab, setCurrentTab] = useState('form');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = async (e) => {
        if (!pageConfig.pageKey || !pageConfig.title) {
            alert('PageKey and Title required');
            return;
        }

        try {
            setSaving(true);
            await api.post('/page-configs', pageConfig);
            alert('Page config created successfully!');
            navigate(`/pages/${pageConfig.pageKey}`);
        } catch (error) {
            setError("Failed to create config: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Create New Page</h1>

            <div className='flex'>
                <div className="flex items-center mb-4 space-x-10 mr-10">
                    <div>
                        <label className="block font-medium">Page Key</label>
                        <input 
                            type="text" 
                            value={pageConfig.pageKey}
                            onChange={(e) => setPageConfig(prev => ({...prev, pageKey: e.target.value}))}
                            className='bg-green-200 border border-gray-600 p-2 w-full rounded'
                            placeholder='e.g: userPage, productPage, ...'
                        />
                    </div>

                    <div>
                        <label className='block font-medium'>Title</label>
                        <input 
                            type="text"
                            value={pageConfig.title}
                            onChange={(e) => setPageConfig(prev => ({...prev, title: e.target.value}))}
                            className='bg-green-200 border border-gray-600 p-2 w-full rounded'
                            placeholder='e.g: User, Product, ...'
                        />
                    </div>
                </div>
                
                <div className='flex-1'>
                    <label className='block font-medium'>Description</label>
                    <input 
                        type="text"
                        value={pageConfig.description}
                        onChange={(e) => setPageConfig(prev => ({...prev, description: e.target.value}))}
                        className='bg-green-200 border border-gray-600 p-2 w-full rounded'
                        placeholder='e.g: Config-driven UI page showing users'
                    />
                </div>
            </div>

            <div className="flex border-b mb-4">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setCurrentTab(tab)}
                        className={`px-4 py-2 ${currentTab === tab ? 'border-b-2 border-green-500 font-bold' : 'text-gray-500'}`}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="border p-4 bg-gray-50 rounded">
                {currentTab === "form" && (
                    <FormConfigEditor 
                        formConfig={pageConfig.form}
                        onChange={(updatedForm) => setPageConfig(prev => ({...prev, form: updatedForm}))}
                    />
                )}

                {currentTab === "grid" && (
                    <GridConfigEditor 
                        gridConfig={pageConfig.grid}
                        onChange={(updatedGrid) => setPageConfig(prev => ({...prev, grid: updatedGrid}))}
                    />
                )}

                {currentTab === "api" && (
                    <ApiConfigEditor 
                        apiConfig={pageConfig.apiEndpoints}
                        onChange={(updatedApi) => setPageConfig(prev => ({...prev, apiEndpoints: updatedApi}))}
                    />
                )}

                {currentTab === "button" && (
                    <ButtonConfigEditor 
                        buttonConfig={pageConfig.button}
                        onChange={(updatedButton) => setPageConfig(prev => ({...prev, button: updatedButton}))}
                    />
                )}
            </div>

            <div className="mt-4">
                <button
                    onClick={handleCreate}
                    disabled={saving}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    {saving ? 'Creating...' : 'Create Page'}
                </button>

                {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>

        </div>
    )
}

export default CreatePageConfig