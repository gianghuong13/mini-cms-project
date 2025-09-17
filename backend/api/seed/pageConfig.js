module.exports = async function seedPageConfig() {
    const exists = await PageConfig.findOne({ pageKey: 'productPage'});
    if (exists) {
        sails.log('PageConfig for productPage already exists, skipping seed.');
        return;
    }

    await PageConfig.create({
        pageKey: 'productPage',

        title: 'Product Page',

        form: {
            fields: [
                { name: 'name', type: 'text', label: 'Product Name', required: true },
                { name: 'price', type: 'number', label: 'Product Price', required: true },
            ]
        }, 

        grid: {
            columns: [
                { title: 'Prouduct Name', dataIndex: 'name', allowFiltering: true, filterType: 'text' },
                { title: 'Product Price', dataIndex: 'price', allowFiltering: false, filterType: 'number' },
                { title: 'Created At', dataIndex: 'createdAt', allowFiltering: false },
            ]
        },

        button: [
            { label: 'Create', action: 'create', callApi: 'create' },
            { label: 'Edit', action: 'update', callApi: 'update' },
            { label: 'Delete', action: 'delete', callApi: 'delete' },
        ],

        apiEndpoints: {
            list: {
                method: 'GET',
                url: '/products',
                responseKey: 'products',
                totalKey: 'total',
                type: 'find'
            },
            create:{
                method: 'POST',
                url: '/products',
                type: 'create'
            },
            update: {	
                method: 'PUT',
                url: '/products/:id',
                type: 'updateOne'
            },
            delete:{
                method: 'DELETE',
                url: '/products/:id',
                type: 'destroyOne'
            },
        },

        isActive: true,
        description: 'Config-driven UI for product management page',
        createdBy: '686e2d315b5dc101b6e292e1', 
    });

    sails.log('PageConfig for productPage seeded successfully.');
}