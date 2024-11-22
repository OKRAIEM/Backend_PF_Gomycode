const Category = require("../models/Category.model");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Créer une catégorie
exports.createCategory = async (req, res) => {
    try {
        // Récupérer les données de la requête
        const { name, description } = req.body;

        // Validation des champs
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Tous les champs sont requis",
            });
        }

        // Création de la catégorie dans la base de données
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });

        // Retourner la réponse
        return res.status(200).json({
            success: true,
            message: "Catégorie créée avec succès",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Une erreur s'est produite lors de la création de la catégorie",
        });
    }
};

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({});

        res.status(200).json({
            success: true,
            message: "Toutes les catégories ont été récupérées avec succès",
            allCategories,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Une erreur s'est produite lors de la récupération des catégories",
        });
    }
};

// Détails de la page d'une catégorie
exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Recherche de la catégorie par ID et ses cours associés
        const selectedCategory = await Category.findById({ _id: categoryId })
            .populate({
                path: "course",
                match: { status: "Published" },
                populate: {
                    path: "ratingAndReviews",
                },
                populate: {
                    path: "instructor",
                },
            })
            .exec();

        // Validation si la catégorie n'existe pas
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "La catégorie sélectionnée n'a pas été trouvée",
            });
        }

        // Vérifier si la catégorie n'a pas de cours associés
        if (selectedCategory?.course?.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Aucun cours trouvé pour la catégorie sélectionnée.",
            });
        }

        // Récupérer une autre catégorie aléatoire
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        });
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        )
            .populate({
                path: "course",
                match: { status: "Published" },
                populate: {
                    path: "ratingAndReviews",
                },
                populate: {
                    path: "instructor",
                },
            })
            .exec();

        // Récupérer les meilleurs cours vendus à travers toutes les catégories
        const allCategories = await Category.find({})
            .populate({
                path: "course",
                match: { status: "Published" },
                populate: {
                    path: "ratingAndReviews",
                },
                populate: {
                    path: "instructor",
                },
            })
            .exec();

        const allCourses = allCategories.flatMap((category) => category.course);
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);

        // Retourner la réponse avec les données
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Une erreur s'est produite lors de la récupération des détails de la catégorie",
        });
    }
};

// Mettre à jour une catégorie
exports.updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params; // Récupérer l'ID de la catégorie
        const { name, description } = req.body;

        // Vérification des champs
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Les champs nom et description sont requis",
            });
        }

        // Mise à jour de la catégorie
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,  // On recherche la catégorie par son ID
            { name, description },  // On met à jour les champs
            { new: true }  // Retourne la catégorie mise à jour
        );

        // Si la catégorie n'existe pas
        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Catégorie introuvable",
            });
        }

        // Si la mise à jour réussit
        return res.status(200).json({
            success: true,
            message: "Catégorie mise à jour avec succès",
            updatedCategory,  // Retourne la catégorie mise à jour
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Une erreur s'est produite lors de la mise à jour de la catégorie",
        });
    }
};

// Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params; // Récupérer l'ID de la catégorie

        // Supprimer la catégorie par ID
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        // Si la catégorie n'existe pas
        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Catégorie introuvable",
            });
        }

        // Si la suppression réussit
        return res.status(200).json({
            success: true,
            message: "Catégorie supprimée avec succès",
            deletedCategory,  // Retourne la catégorie supprimée
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Une erreur s'est produite lors de la suppression de la catégorie",
        });
    }
};
