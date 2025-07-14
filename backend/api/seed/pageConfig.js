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
                { title: 'Prouduct Name', dataIndex: 'name'},
                { title: 'Product Price', dataIndex: 'price' },
            ],
            filters: [
                { name: 'name', type: 'text' },
                { name: 'price', type: 'number' },
            ],
        },

        button: [
            { label: 'Add Product', action: 'create', method: 'POST', apiEndpoint: '/api/products' },
            { label: 'Edit Product', action: 'edit', method: 'PUT', apiEndpoint: '/api/products/:id' },
            { label: 'Delete Product', action: 'deleteProduct', method: 'DELETE', apiEndpoint: '/api/products/:id' },
        ],

        api: {
            get: '/products',
            responseKey: "products",
            totalKey: "total",
            post: '/products',
            put: '/products/:id',
            delete: '/products/:id',
        },

        layout: {
            header: 'Product Management',
            footer: '© 2023 Mini CMS Project',
            sidebar: true,
            sections: ['form', 'grid', 'buttons'],
        },

        isActive: true,
        description: 'Config-driven UI for product management page',
        createdBy: '686e2d315b5dc101b6e292e1', 
    });

    sails.log('PageConfig for productPage seeded successfully.');
}