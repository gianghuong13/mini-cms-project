import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import FormConfigEditor from '../../components/pageConfig/FormConfigEditor';
import GridConfigEditor from '../../components/pageConfig/GridConfigEditor';
import ApiConfigEditor from '../../components/pageConfig/ApiConfigEditor';
import ButtonConfigEditor from '../../components/pageConfig/ButtonConfigEditor';

const tabs = ['form', 'grid', 'api', 'button'];

const EditPageConfig = () => {
    const { pageKey } = useParams();
    const [pageConfig, setPageConfig] = useState(null);
    const [currentTab, setCurrentTab] = useState('form');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConfig = async () => {
        try {
            const res = await api.get(`/page-configs/${pageKey}`);
            setPageConfig(res.data);
        } catch (err) {
            setError('Failed to fetch config');
        }
        setLoading(false);
        };
        fetchConfig();
    }, [pageKey]);

    const handleSave = async () => {
        try {
            setSaving(true);
            await api.put(`/page-configs/${pageKey}`, pageConfig);
            alert('Saved successfully!');
        } catch (err) {
            alert('Save failed: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!pageConfig) return null;

    return (
        <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Edit Page: {pageConfig.title}</h1>
        
        <input 
            type="text"
            value={pageConfig.title}
            onChange={(e) => setPageConfig(prev => ({ ...prev, title: e.target.value }))}
            className="border p-2 mb-4"
        />
        
        {/* Tab Navigation */}
        <div className="flex border-b mb-4">
            {tabs.map(tab => (
                <button
                    key={tab}
                    className={`px-4 py-2 ${currentTab === tab ? 'border-b-2 border-blue-500 font-bold' : 'text-gray-500'}`}
                    onClick={() => setCurrentTab(tab)}
                >
                    {tab.toUpperCase()}
                </button>
            ))}
        </div>

        {/* Tab Content */}
        <div className="border p-4 bg-gray-50 rounded">
            {currentTab === 'form' && (
                <FormConfigEditor
                    formConfig={pageConfig.form}
                    onChange={(updatedForm) => setPageConfig(prev => ({ ...prev, form: updatedForm }))}
                />
            )}

            {currentTab === 'grid' && (
                <GridConfigEditor
                    gridConfig={pageConfig.grid}
                    onChange={(updatedGrid) => setPageConfig(prev => ({ ...prev, grid: updatedGrid }))}
                />
            )}

            {currentTab === 'api' && (
                <ApiConfigEditor
                    apiConfig={pageConfig.api}
                    onChange={(updatedApi) => setPageConfig(prev => ({ ...prev, api: updatedApi }))}
                />
            )}

            {currentTab === 'button' && (
                <ButtonConfigEditor
                    buttonConfig={pageConfig.button}
                    onChange={(updatedButton) => setPageConfig(prev => ({ ...prev, button: updatedButton }))}
                />
            )}
        </div>

        {/* Save button */}
        <div className="mt-4">
            <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
            {saving ? 'Saving...' : 'Save Config'}
            </button>
        </div>
        </div>
    );
};

export default EditPageConfig;
