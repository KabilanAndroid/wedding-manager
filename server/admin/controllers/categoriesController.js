
const { modelNameValidation, modelAddCategories } = require("../models/Categories");

const addCategories = async (req, res) => {

    try {
        const { name, description, status, image } = req.body;
        const nameValidation = modelNameValidation(name);

        if (!nameValidation) {
            return res.status(400).json({
                message: 'please enter valid name'
            })
        }
        const AddCategories = await modelAddCategories({ name, description, status, image })
        return res.status(201).json({
            message: 'Category added successfully',
            AddCategories
        })
    }
    catch (error) {
        console.error('addCategories error:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
}


module.exports = { addCategories };


