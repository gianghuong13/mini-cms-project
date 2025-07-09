// check user's permissions
module.exports = async function (req, res, proceed) {
    const user = req.user;

    if (!user) return res.status(403).json({ message: 'No user found'});

    const resource = req.options.controller.replace('controller', '').toLowerCase();
    const action = req.options.action.toLowerCase();

    const fullUser = await User.findOne({ id: user.id }).populate('roles');
    const fullRoles = await Promise.all(
        fullUser.roles.map(r => Role.findOne({ id: r.id }).populate('permissions'))
    );

    const permissions = fullRoles.flatMap(r => r.permissions);
    const hasPermission = permissions.some(p => p.resourse === resource && p.action === action);

    if (!hasPermission) {
        return res.status(403).json({ message: `Do not have permission to ${action} ${resource}`});
    }

    return proceed();
}