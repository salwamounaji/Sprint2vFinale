export interface ElementConstitutif{
       description   :    string   ,
       designation   :    string   ,
       enseignant   : {
         adresse   :    string   ,
         codePostal   :    string   ,
         emailPerso   :    string   ,
         emailUbo   :    string   ,
         mobile   :    string   ,
         noEnseignant   : 0,
         nom   :    string   ,
         pays   :    string   ,
         prenom   :    string   ,
         sexe   :    string   ,
         telephone   :    string   ,
         type   :    string   ,
         ville   :    string   
    },
       id   : {
         codeEc   :    string   ,
         codeFormation   :    string   ,
         codeUe   :    string   
    },
       nbhCm   : 0,
       nbhTd   : 0,
       nbhTp   : 0,
       uniteEnseignement   : {
         description   :    string   ,
         designation   :    string   ,
         enseignant   : {
           adresse   :    string   ,
           codePostal   :    string   ,
           emailPerso   :    string   ,
           emailUbo   :    string   ,
           mobile   :    string   ,
           noEnseignant   : 0,
           nom   :    string   ,
           pays   :    string   ,
           prenom   :    string   ,
           sexe   :    string   ,
           telephone   :    string   ,
           type   :    string   ,
           ville   :    string   
      },
         formation   : {
           codeFormation   :    string   ,
           debutAccreditation   :    String  ,
           diplome   :    string   ,
           doubleDiplome   :    string   ,
           finAccreditation   :    String   ,
           n0Annee   : 0,
           nomFormation   :    string   
      },
         id   : {
           codeFormation   :    string   ,
           codeUe   :    string   
      },
         nbhCm   : 0,
         nbhTd   : 0,
         nbhTp   : 0,
         semestre   :    string   
    }
  }