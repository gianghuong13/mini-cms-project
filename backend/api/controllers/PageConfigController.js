/**
 * PageConfigController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    find: async function (req, res) {
        try {
            const pageConfigs = await PageConfig.find().populate('createdBy');
            return res.json(pageConfigs);
        } catch (error) {
            return res.status(500).json({ error: 'Server error', details: error.message });
        }
    },
  
    findOne: async function (req, res) {
        const { pageKey } = req.params;
        if (!pageKey) {
            return res.status(400).json({ error: 'Page key is required' });
        }

        try {
            
            const pageConfig = await PageConfig.findOne({ pageKey });
            if (!pageConfig) {
                return res.status(404).json({ error: 'Page config not found' });
            }

            return res.json(pageConfig);
        } catch (error) {
            return res.status(500).json({ error: 'Server error', details: error.message });
        }
    },

    create: async function (req, res) {
        const { 
            pageKey, 
            title, 
            form,
            grid,
            api, 
            button, 
            isActive,
            description
        } = req.body;

        if (!pageKey || !title) {
            return res.status(400).json({ error: 'Page key and title are required' });
        }

        const existing = await PageConfig.findOne({ pageKey });
        if (existing) {
            return res.status(400).json({ error: 'Page config with this key already exists' });
        }

        try {
            const newConfig = await PageConfig.create({
                pageKey,
                title,
                form,
                grid,
                api,
                button,
                isActive,
                description,
                createdBy: req.user.id // Assuming req.user is set by authentication middleware
            }).fetch();

            return res.status(201).json(newConfig);
        } catch (error) {
            return res.status(500).json({ error: 'Fail to create new pageconfig', details: error.message });
        }
    },

    update: async function (req, res) {
        try {
            const { pageKey } = req.params;
            const { 
                title, 
                form,
                grid,
                api, 
                button, 
                isActive,
                description
            } = req.body;

            const existing = await PageConfig.findOne({ pageKey });
            if (!existing) {
                return res.status(404).json({ error: 'Page config not found' });
            }

            const updatedConfig = await PageConfig.updateOne({ pageKey }).set({
                title,
                form,
                grid,
                api,
                button,
                isActive,
                description
            });

            return res.json({
                message: 'Page config updated successfully',
                pageConfig: updatedConfig
            });
        } catch (error) {
            return res.status(500).json({ error: 'Fail to update page config', details: error.message });
        }
    },

    destroy: async function (req, res) {
        const { pageKey } = req.params;
        if (!pageKey) {
            return res.status(400).json({ error: 'Page key is required' });
        }

        try {
            const deletedConfig = await PageConfig.destroyOne({ pageKey });
            if (!deletedConfig) {
                return res.status(404).json({ error: 'Page config not found' });
            }

            return res.json({ message: 'Page config deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Server error', details: error.message });
        }
    }
};

