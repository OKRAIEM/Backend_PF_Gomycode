const { check, validationResult } = require("express-validator");

exports.registerValidations = () => [
    // Validation de firstName (anciennement username)
    check("firstName", "This field must contain a character").notEmpty(),
    
    // Validation de lastName
    check("lastName", "This field must contain a character").notEmpty(),

    // Validation de l'email
    check("email", "This field must be a valid email").isEmail().notEmpty(),

    // Validation du mot de passe
    check("password", "This field must be minimum 8 characters with at least 1 uppercase, 2 numbers, and 1 symbol")
        .isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 2, minSymbols: 1 }),

    // Validation du numéro de téléphone
    check("phone", "Phone number is required and must be a valid number").isNumeric().notEmpty(),
];

// Middleware pour vérifier les erreurs de validation
exports.validator = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(400).send(errors);
    }
}
