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

