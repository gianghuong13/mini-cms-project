module.exports = async function grantAdminManagePageConfig() {
  // 1. Tìm hoặc tạo permission
  const permission = await Permission.findOrCreate(
    { resource: 'pageconfig', action: 'manage' },
    { resource: 'pageconfig', action: 'manage' }
  );

  // 2. Tìm role admin
  const adminRole = await Role.findOne({ name: 'admin' }).populate('permissions');

  if (!adminRole) {
    sails.log.warn('⚠️ Không tìm thấy role admin');
    return;
  }

  const hasAlready = adminRole.permissions.some(p =>
    p.resource === 'pageconfig' && p.action === 'manage'
  );

  if (!hasAlready) {
    await Role.addToCollection(adminRole.id, 'permissions').members([permission.id]);
    sails.log.info('✅ Gán quyền pageconfig/manage cho role admin thành công');
  } else {
    sails.log.info('✅ Quyền pageconfig/manage đã được gán cho admin trước đó');
  }
};
