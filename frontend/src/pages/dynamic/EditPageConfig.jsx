import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';

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

  const handleChange = (e, path) => {
    const value = e.target.value;
    const updated = { ...pageConfig };
    // Giả sử path là ['form', 'fields', 0, 'name']
    let target = updated;
    for (let i = 0; i < path.length - 1; i++) {
      target = target[path[i]];
    }
    target[path[path.length - 1]] = value;
    setPageConfig(updated);
  };

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
          <>
            <h2 className="font-semibold mb-2">Form Fields</h2>
            {pageConfig.form?.fields?.map((field, index) => (
              <div key={index} className="mb-2">
                <input
                  className="border p-2 mr-2"
                  value={field.name}
                  onChange={(e) => handleChange(e, ['form', 'fields', index, 'name'])}
                  placeholder="Field name"
                />
                <input
                  className="border p-2"
                  value={field.label}
                  onChange={(e) => handleChange(e, ['form', 'fields', index, 'label'])}
                  placeholder="Label"
                />
              </div>
            ))}
          </>
        )}

        {currentTab === 'grid' && (
          <>
            <h2 className="font-semibold mb-2">Grid Columns</h2>
            {pageConfig.grid?.columns?.map((col, index) => (
              <div key={index} className="mb-2">
                <input
                  className="border p-2 mr-2"
                  value={col.title}
                  onChange={(e) => handleChange(e, ['grid', 'columns', index, 'title'])}
                  placeholder="Column title"
                />
                <input
                  className="border p-2"
                  value={col.dataIndex}
                  onChange={(e) => handleChange(e, ['grid', 'columns', index, 'dataIndex'])}
                  placeholder="dataIndex"
                />
              </div>
            ))}
          </>
        )}

        {currentTab === 'api' && (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(pageConfig.api || {}).map(([key, value]) => (
              <div key={key}>
                <label className="block font-medium mb-1">{key.toUpperCase()}</label>
                <input
                  className="border p-2 w-full"
                  value={value}
                  onChange={(e) => handleChange(e, ['api', key])}
                />
              </div>
            ))}
          </div>
        )}

        {currentTab === 'button' && (
          <>
            <h2 className="font-semibold mb-2">Buttons</h2>
            {pageConfig.button?.map((btn, index) => (
              <div key={index} className="mb-2">
                <input
                  className="border p-2 mr-2"
                  value={btn.label}
                  onChange={(e) => handleChange(e, ['button', index, 'label'])}
                  placeholder="Label"
                />
                <input
                  className="border p-2 mr-2"
                  value={btn.action}
                  onChange={(e) => handleChange(e, ['button', index, 'action'])}
                  placeholder="Action"
                />
                <input
                  className="border p-2"
                  value={btn.apiEndpoint}
                  onChange={(e) => handleChange(e, ['button', index, 'apiEndpoint'])}
                  placeholder="API Endpoint"
                />
              </div>
            ))}
          </>
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
