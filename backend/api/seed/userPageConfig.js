module.exports = async function seedUserPageConfig() {
  const exists = await PageConfig.findOne({ pageKey: 'userPage' });
  if (exists) {
    sails.log('PageConfig for userPage already exists, skipping seed.');
    return;
  }

  await PageConfig.create({
    pageKey: 'userPage',

    title: 'User Page',

    form: {
      fields: [
        { name: 'name', type: 'text', label: 'Name', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'roles', type: 'select', label: 'Roles', options: ['admin', 'editor', 'viewer'], required: true },
        { name: 'password', type: 'password', label: 'Password', required: true },
      ]
    },

    grid: {
      columns: [
        { title: 'Name', dataIndex: 'name', allowFiltering: true, filterType: 'text' },
        { title: 'Email', dataIndex: 'email', allowFiltering: true, filterType: 'text' },
        { title: 'Roles', dataIndex: 'roles', allowFiltering: false, filterType: 'text' },
      ],
    },

    button: [
      { label: 'Add User', action: 'create', method: 'POST', apiEndpoint: '/api/users' },
      { label: 'Edit User', action: 'edit', method: 'PUT', apiEndpoint: '/api/users/:id' },
      { label: 'Delete User', action: 'delete', method: 'DELETE', apiEndpoint: '/api/users/:id' },
    ],

    api: {
      get: '/users',
      responseKey: "users",
      totalKey: "total",
      post: '/users',
      put: '/users/:id',
      delete: '/users/:id',
    },

    isActive: true,
    description: 'Config-driven UI for user management page',
    createdBy: '686e2d315b5dc101b6e292e1', 
  });

  sails.log('PageConfig for userPage seeded successfully.');
};
