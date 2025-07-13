const bcrypt = require('bcrypt');

module.exports.bootstrap = async function (done) {
  // 1. Tạo role và permission nếu chưa có
  const roleCount = await Role.count();
  if (roleCount === 0) {
    const roleNames = ['admin', 'editor', 'viewer'];
    for (const name of roleNames) {
      await Role.findOrCreate({ name }, { name });
    }

    const permissionsToSeed = [
      { resource: 'product', action: 'create' },
      { resource: 'product', action: 'read' },
      { resource: 'product', action: 'update' },
      { resource: 'product', action: 'delete' },
      { resource: 'user', action: 'manage' },
      { resource: 'role', action: 'manage' }
    ];

    for (const perm of permissionsToSeed) {
      await Permission.findOrCreate(perm, perm);
    }

    for (const roleName of roleNames) {
      const role = await Role.findOne({ name: roleName });

      if (roleName === 'admin') {
        const allPermissions = await Permission.find();
        await Role.replaceCollection(role.id, 'permissions').members(allPermissions.map(p => p.id));
      } else if (roleName === 'editor') {
        const editorPerms = await Permission.find({
          where: {
            resource: 'product',
            action: ['create', 'read', 'update']
          }
        });
        await Role.replaceCollection(role.id, 'permissions').members(editorPerms.map(p => p.id));
      } else if (roleName === 'viewer') {
        const readPerm = await Permission.findOne({ resource: 'product', action: 'read' });
        if (readPerm) {
          await Role.replaceCollection(role.id, 'permissions').members([readPerm.id]);
        }
      }
    }

    sails.log.info('✅ Seeded roles and permissions.');
  }

  // 2. Luôn tạo admin user nếu chưa có
  const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('123456', 10);
    const adminUser = await User.create({
      email: 'admin@gmail.com',
      name: 'Admin',
      password: hashedPassword
    }).fetch();

    const adminRole = await Role.findOne({ name: 'admin' });
    if (adminRole) {
      await User.addToCollection(adminUser.id, 'roles').members([adminRole.id]);
      sails.log.info('✅ Admin user created and role assigned.');
    }
  } else {
    // 👀 Kiểm tra nếu chưa có role thì gán lại
    const populated = await User.findOne({ id: existingAdmin.id }).populate('roles');
    if (!populated.roles.some(role => role.name === 'admin')) {
      const adminRole = await Role.findOne({ name: 'admin' });
      if (adminRole) {
        await User.addToCollection(existingAdmin.id, 'roles').members([adminRole.id]);
        sails.log.info('Admin role added to existing admin user.');
      }
    }
  }

  await require('../api/seed/pageConfig')();
  await require('../api/seed/userPageConfig')();
  await require('../api/seed/grantAdminPageConfig')();

  return done();
};
