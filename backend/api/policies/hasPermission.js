// check user's permissions
// in database: create, read, update, delete, manage(admin can manage user and role, manage = crud)
module.exports = async function (req, res, proceed) {
    const user = req.user;

    if (!user) return res.status(403).json({ message: 'No user found'});

    // Map các hành động của Sails sang chuẩn CRUD
    const ACTION_ALIASES = {
        find: 'read',
        findone: 'read',
        create: 'create',
        update: 'update',
        destroy: 'delete'
    };

    let resource = 'unknown';
    let action = 'unknown';

    if (req.options.action) {
        const parts = req.options.action.split('/');
        if (parts.length === 2) {
            [resource, action] = parts;
        } else {
            action = req.options.action;
        }
    }

    console.log("action", action);
    console.log("resource/controller/model", resource);

    action = ACTION_ALIASES[action] || action;

    console.log("Checking permission for:", `${resource}/${action}`);

    const fullUser = await User.findOne({ id: user.id }).populate('roles');
    const fullRoles = await Promise.all(
        fullUser.roles.map(r => Role.findOne({ id: r.id }).populate('permissions'))
    );

    const permissions = fullRoles.flatMap(r => r.permissions);

    console.log("User permissions:", permissions.map(p => `${p.resource}/${p.action}`));

    const hasPermission = permissions.some(p => 
        p.resource === resource && 
        (p.action === action || p.action === 'manage')
    );

    if (!hasPermission) {
        return res.status(403).json({ message: `Do not have permission to ${action} ${resource}`});
    }

    return proceed();
}