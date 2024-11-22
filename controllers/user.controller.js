const user = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        // Désormais, on utilise firstName et lastName à la place de username
        const { firstName, lastName, email, password, role, phone, photo } = req.body;

        // Vérification si l'email existe déjà
        const foundUserEmail = await user.find({ email });
        if (foundUserEmail[0]) {
            return res.status(400).send({ msg: "Email already exists!" });
        }

        // Crée un nouvel utilisateur avec les données reçues
        const newUser = new user(req.body);
        // console.log(req.body);
        // Hachage du mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        newUser.password = hashedPassword;

        // Sauvegarde de l'utilisateur dans la base de données
        await newUser.save();

        // Générer un token pour l'utilisateur
        const token = jwt.sign({ _id: newUser._id }, process.env.SEKRET_KEY);

        // Réponse après l'inscription réussie
        res.status(200).send({ msg: "User registered successfully!", newUser, token });
    } catch (error) {
        res.status(500).send({ msg: "Error during registration", error });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Trouver l'utilisateur par email
        const foundUser = await user.find({ email });
        if (!foundUser[0]) {
            return res.status(400).send({ msg: "Email or password invalid!" });
        }

        // Vérification du mot de passe
        const checkedPassword = await bcrypt.compare(password, foundUser[0].password);
        if (!checkedPassword) {
            return res.status(400).send({ msg: "Email or password invalid!" });
        }

        // Génération d'un token
        const token = jwt.sign({ _id: foundUser[0]._id }, process.env.SEKRET_KEY);

        // Réponse après connexion réussie
        res.status(200).send({ msg: "Login successful", foundUser:foundUser[0] , token });
    } catch (error) {
        res.status(500).send({ msg: "Error during login", error });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { _id } = req.params;  // Récupérer l'_id de l'URL
        const deletedUser = await user.deleteOne({ _id });  // Supprimer l'utilisateur correspondant
        if (deletedUser.deletedCount === 0) {
            return res.status(404).send({ msg: "User not found" });
        }
        res.status(200).send({ msg: "User deleted successfully!" });
    } catch (error) {
        res.status(500).send({ msg: "Error deleting user", error });
    }
}; 

exports.resetPassword = async (req, res) => {
    try {
        const { _id } = req.params;
        const { newPassword } = req.body;

        // Vérification que le mot de passe est fourni
        if (!newPassword) {
            return res.status(400).send({ msg: "New password is required!" });
        }

        // Hachage du nouveau mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Mise à jour du mot de passe
        await user.updateOne({ _id }, { $set: { password: hashedPassword } });

        res.status(200).send({ msg: "Password updated successfully!" });
    } catch (error) {
        res.status(500).send({ msg: "Error updating password", error });
    }
}
// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await user.find(); // Recherche tous les utilisateurs dans la base de données
        res.status(200).send({ msg: "Users retrieved successfully", users });
    } catch (error) {
        res.status(500).send({ msg: "Error retrieving users", error });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params; // Récupère l'ID depuis l'URL
    const updatedData = req.body; // Récupère les données du corps de la requête

    try {
        const NewUser = await user.findByIdAndUpdate(id, updatedData, { new: true });
        if (!NewUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(NewUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
        console.log(error)
    }
};