const express = require('express');
const router = express.Router();
const ressourceController = require('../controllers/ressourceController'); // Assurez-vous d'avoir le bon chemin vers le contrôleur



// Ajouter une ressource
router.post('/create', ressourceController.addRessource);
// Obtenir toutes les ressources
router.get("/getAll", ressourceController.getAllRessources); 
// Obtenir une ressource par ID
router.get('/getbyID/:_id', ressourceController.getRessourceById);
// Mettre à jour une ressource
router.put('/update/:_id', ressourceController.updateRessource);
// Supprimer une ressource
router.delete('/delete/:_id', ressourceController.deleteRessource);

module.exports = router;  