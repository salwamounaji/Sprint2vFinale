export interface UniteEnseignement{

  description  :   string  ,
      designation  :   string  ,
      enseignant  : {
        adresse  :   string  ,
        codePostal  :   string  ,
        emailPerso  :   string  ,
        emailUbo  :   string  ,
        mobile  :   string  ,
        noEnseignant  : 0,
        nom  :   string  ,
        pays  :   string  ,
        prenom  :   string  ,
        sexe  :   string  ,
        telephone  :   string  ,
        type  :   string  ,
        ville  :   string  
    },
      formation  : {
        codeFormation  :   string  ,
        debutAccreditation  :   string  ,
        diplome  :   string  ,
        doubleDiplome  :   string  ,
        finAccreditation  :   string  ,
        n0Annee  : 0,
        nomFormation  :   string  
    },
      id  : {
        codeFormation  :   string  ,
        codeUe  :   string  
    },
      nbhCm  : 0,
      nbhTd  : 0,
      nbhTp  : 0,
      semestre  :   string  
  }