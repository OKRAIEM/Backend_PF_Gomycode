const Ressource = require("../models/RessourceModel");

// Add a resource
exports.addRessource = async (req, res) => {
    try {
        const { title, description, category, contentUrl, createdBy, photo } = req.body;

        if (!title || !description || !category) {
            return res.status(400).send({ msg: "Title, description, and category are required." });
        }

        // Create the resource
        const newRessource = new Ressource({ title, description, category, contentUrl, createdBy, photo });
        await newRessource.save();
        console.log(newRessource)

        res.status(200).send({ msg: "Resource added successfully", newRessource });
    } catch (error) {
        res.status(500).send({ msg: "Error adding resource", error });
        console.error(error);
    }
};

// Delete a resource
exports.deleteRessource = async (req, res) => {
    try {
        const resource = await Ressource.findByIdAndDelete(req.params.id);
        if (!resource) {
            return res.status(404).send({ msg: "Resource not found" });
        }
        res.status(200).send({ msg: "Resource deleted successfully" });
    } catch (error) {
        res.status(500).send({ msg: "Error deleting resource", error });
        console.error(error);
    }
};

// Get all resources
exports.getAllRessources = async (req, res) => {
    try {
        const ressources = await Ressource.find();
        res.status(200).send({ ressources });
    } catch (error) {
        res.status(500).send({ msg: "Error fetching resources", error });
        console.error(error);
    }
};

// Get a resource by ID
exports.getRessourceById = async (req, res) => {
    try {
        const resource = await Ressource.findById(req.params.id);
        if (!resource) {
            return res.status(404).send({ msg: "Resource not found" });
        }
        res.status(200).send({ ressource: resource });
    } catch (error) {
        res.status(500).send({ msg: "Error fetching resource", error });
        console.error(error);
    }
};

// Update a resource
exports.updateRessource = async (req, res) => {
    try {
        const { id } = req.params; // Get the resource ID from the request parameters
        const updatedData = req.body; // The updated data from the request body

        // Find the resource by ID
        const resource = await Ressource.findById(id);
        if (!resource) {
            return res.status(404).send({ msg: "Resource not found" });
        }

        // Update the resource with the new data
        const updatedRessource = await Ressource.findByIdAndUpdate(id, updatedData, { new: true });

        // Return the updated resource
        res.status(200).send({ msg: "Resource updated successfully", updatedRessource });
    } catch (error) {
        res.status(500).send({ msg: "Error updating resource", error });
        console.error(error);
    }
};
