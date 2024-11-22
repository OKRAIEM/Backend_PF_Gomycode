/* const express=require("express")
const { register, login, deleteUser, resetPassword, getAllUsers } = require("../controllers/user.controller")
const isAuth = require("../Middleware/isAuth")
const { registerValidations,validator } = require("../Middleware/Validator")

const router=express.Router()

router.post("/register",registerValidations(),validator,register)
router.post("/login",login)
router.delete("/delete/:_id",deleteUser)
router.put("/resetPassword/:_id",resetPassword)
router.post("/current",isAuth,(req,res)=>{
    res.status(200).send(req.user)
})
// Route pour récupérer tous les utilisateurs
router.get("/all_users", getAllUsers); // Nouvelle route pour lister tous les utilisateurs

module.exports=router  */
//==========================================================================================
const express = require("express");   
const { register, login, deleteUser, resetPassword, getAllUsers, updateUser } = require("../controllers/user.controller");
const  isAuth  = require("../middleware/isAuth"); // Middleware d'authentification
const { registerValidations, validator } = require("../middleware/validator");

// Importez les middlewares de rôle


const router = express.Router();

// Route pour l'inscription avec validations
router.post("/register", registerValidations(), validator, register);

// Route pour la connexion
router.post("/login", login);

// Route pour supprimer un utilisateur (accessibilité aux admins uniquement)
router.delete("/delete/:_id", deleteUser);

// Route pour réinitialiser le mot de passe (accessibilité à l'utilisateur authentifié uniquement)
router.put("/resetPassword/:_id", resetPassword);

// Route pour obtenir les informations de l'utilisateur actuel
router.post("/current", isAuth, (req, res) => {
    res.status(200).send(req.user);
});

// Route pour récupérer tous les utilisateurs (accessible uniquement aux admins)
router.get("/all_users", getAllUsers);

// Route PUT pour mettre à jour un utilisateur
router.put('/update/:id', updateUser);

module.exports = router;
