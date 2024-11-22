const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller'); // Assurez-vous d'avoir le bon chemin vers le contrôleur

// Créer une catégorie
router.post('/create', categoryController.createCategory);
// Récupérer toutes les catégories
router.get('/', categoryController.getAllCategories);
// Récupérer les détails d'une catégorie (avec ses cours, etc.)
router.post('/details', categoryController.categoryPageDetails);
// Mettre à jour une catégorie
router.put('/update/:categoryId', categoryController.updateCategory);
// Supprimer une catégorie
router.delete('/delete/:categoryId', categoryController.deleteCategory);

module.exports = router;