const mongoose = require('mongoose');

const ressourceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {  // New field for category
      type: String, 
      enum: ['CONSTRUCTION',
          'COMPORTEMENT',
          'PROTOTYPAGE',
          'PROJETS',
          'STAGES',
          'MATHEMATIQUES',
          'PHYSIQUES',
          'ANGLAIS'],
      required: true,
  },
  contentUrl: {
    type: String, // Lien vers le fichier ou ressource (ex : PDF, vidéo, lien YouTube)
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Associe la ressource à l'utilisateur qui l'a créée
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String
  },
});

module.exports = mongoose.model('Ressource', ressourceSchema);
