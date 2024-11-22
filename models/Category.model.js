const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Le nom de la catégorie est obligatoire
    },

    description: {
        type: String,
        trim: true, // Permet de supprimer les espaces avant et après la description
    },

    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", // Référence au modèle "Course" pour lier cette catégorie aux cours
        required: true, // La catégorie doit être associée à au moins un cours
    }]
});

module.exports = mongoose.model("Category", categorySchema);
