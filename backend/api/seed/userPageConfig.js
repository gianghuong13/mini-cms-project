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
        { name: 'fullName', type: 'text', label: 'Full Name', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'role', type: 'select', label: 'Role', options: ['admin', 'editor', 'viewer'], required: true },
      ]
    },

    grid: {
      columns: [
        { title: 'Full Name', dataIndex: 'fullName' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Role', dataIndex: 'role' },
      ],
      filters: [
        { name: 'email', type: 'text' },
        { name: 'role', type: 'select', options: ['admin', 'editor', 'viewer'] },
      ]
    },

    button: [
      { label: 'Add User', action: 'create', method: 'POST', apiEndpoint: '/api/users' },
      { label: 'Edit User', action: 'edit', method: 'PUT', apiEndpoint: '/api/users/:id' },
      { label: 'Delete User', action: 'delete', method: 'DELETE', apiEndpoint: '/api/users/:id' },
    ],

    api: {
      get: '/api/users',
      post: '/api/users',
      put: '/api/users/:id',
      delete: '/api/users/:id',
    },

    layout: {
      header: 'User Management',
      footer: '© 2023 Mini CMS Project',
      sidebar: true,
      sections: ['form', 'grid', 'buttons'],
    },

    isActive: true,
    description: 'Config-driven UI for user management page',
    createdBy: '686e2d315b5dc101b6e292e1', 
  });

  sails.log('PageConfig for userPage seeded successfully.');
};
