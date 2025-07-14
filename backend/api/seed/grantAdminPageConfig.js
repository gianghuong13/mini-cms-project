module.exports = async function grantPageConfigPermissions() {
  // 1. Tạo các permission cần thiết
  const managePermission = await Permission.findOrCreate(
    { resource: 'pageconfig', action: 'manage' },
    { resource: 'pageconfig', action: 'manage' }
  );

  const readPermission = await Permission.findOrCreate(
    { resource: 'pageconfig', action: 'read' },
    { resource: 'pageconfig', action: 'read' }
  );

  // 2. Gán quyền cho admin
  const admin = await Role.findOne({ name: 'admin' }).populate('permissions');
  if (admin) {
    const hasManage = admin.permissions.some(p => p.resource === 'pageconfig' && p.action === 'manage');
    if (!hasManage) {
      await Role.addToCollection(admin.id, 'permissions').members([managePermission.id]);
      sails.log.info('✅ Gán quyền pageconfig/manage cho admin');
    } else {
      sails.log.info('✅ Admin đã có quyền pageconfig/manage');
    }
  }

  // 3. Gán quyền cho viewer
  const viewer = await Role.findOne({ name: 'viewer' }).populate('permissions');
  if (viewer) {
    const hasRead = viewer.permissions.some(p => p.resource === 'pageconfig' && p.action === 'read');
    if (!hasRead) {
      await Role.addToCollection(viewer.id, 'permissions').members([readPermission.id]);
      sails.log.info('✅ Gán quyền pageconfig/read cho viewer');
    } else {
      sails.log.info('✅ Viewer đã có quyền pageconfig/read');
    }
  }

  // 4. Gán quyền cho editor
  const editor = await Role.findOne({ name: 'editor' }).populate('permissions');
  if (editor) {
    const hasRead = editor.permissions.some(p => p.resource === 'pageconfig' && p.action === 'read');
    if (!hasRead) {
      await Role.addToCollection(editor.id, 'permissions').members([readPermission.id]);
      sails.log.info('✅ Gán quyền pageconfig/read cho editor');
    } else {
      sails.log.info('✅ Editor đã có quyền pageconfig/read');
    }
  }
};
