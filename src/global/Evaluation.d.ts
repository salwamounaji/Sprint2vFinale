export interface Evaluation{
     debutReponse :  string ;
     designation :  string ;
     elementConstitutif : {
       description :  string ;
       designation :  string  ;
       enseignant : {
         adresse :  string  ;
         codePostal :  string  ;
         emailPerso :  string  ;
         emailUbo :  string  ;
         mobile :  string  ;
         noEnseignant : 0 ;
         nom :  string  ;
         pays :  string  ;
         prenom :  string  ;
         sexe :  string  ;
         telephone :  string  ;
         type :  string  ;
         ville :  string 
      },
       id : {
         codeEc :  string  ;
         codeFormation :  string  ;
         codeUe :  string 
      },
       nbhCm : 0 ;
       nbhTd : 0 ;
       nbhTp : 0 ;
       uniteEnseignement : {
         description :  string  ;
         designation :  string  ;
         enseignant : {
           adresse :  string  ;
           codePostal :  string  ;
           emailPerso :  string  ;
           emailUbo :  string  ;
           mobile :  string  ;
           noEnseignant : 0 ;
           nom :  string  ;
           pays :  string  ;
           prenom :  string  ;
           sexe :  string  ;
           telephone :  string  ;
           type :  string  ;
           ville :  string 
        },
         formation : {
           codeFormation :  string  ;
           debutAccreditation :  string ;
           diplome :  string  ;
           doubleDiplome :  string  ;
           finAccreditation :  string  ;
           n0Annee : 0 ;
           nomFormation :  string 
        },
         id : {
           codeFormation :  string  ;
           codeUe :  string 
        },
         nbhCm : 0 ;
         nbhTd : 0 ;
         nbhTp : 0 ;
         semestre :  string 
      }
    },
     enseignant : {
       adresse :  string  ;
       codePostal :  string  ;
       emailPerso :  string  ;
       emailUbo :  string  ;
       mobile :  string  ;
       noEnseignant : 0 ;
       nom :  string  ;
       pays :  string  ;
       prenom :  string  ;
       sexe :  string  ;
       telephone :  string  ;
       type :  string  ;
       ville :  string 
    } ,
     etat :  string  ;
     finReponse :  string ;
     idEvaluation : 0 ;
     noEvaluation :  string  ;
     periode :  string  ;
     promotion : {
       commentaire :  string  ;
       dateRentree :  string  ;
       dateReponseLalp :  string  ;
       dateReponseLp :  string  ;
       enseignant : {
         adresse :  string  ;
         codePostal :  string  ;
         emailPerso :  string  ;
         emailUbo :  string  ;
         mobile :  string  ;
         noEnseignant : 0 ;
         nom :  string  ;
         pays :  string  ;
         prenom :  string  ;
         sexe :  string  ;
         telephone :  string  ;
         type :  string  ;
         ville :  string 
      },
       formation : {
         codeFormation :  string  ;
         debutAccreditation :  string  ;
         diplome :  string  ;
         doubleDiplome :  string  ;
         finAccreditation : string  ;
         n0Annee : 0 ;
         nomFormation :  string 
      } ,
       id : {
         anneeUniversitaire :  string  ;
         codeFormation :  string 
      },
       lieuRentree :  string  ;
       nbMaxEtudiant : 0 ;
       processusStage :  string  ;
       siglePromotion :  string 
    },
     uniteEnseignement : {
       description :  string  ;
       designation :  string  ;
       enseignant : {
         adresse :  string  ;
         codePostal :  string  ;
         emailPerso :  string  ;
         emailUbo :  string  ;
         mobile :  string  ;
         noEnseignant : 0 ;
         nom :  string  ;
         pays :  string  ;
         prenom :  string  ;
         sexe :  string  ;
         telephone :  string  ;
         type :  string  ;
         ville :  string 
      },
       formation : {
         codeFormation :  string  ;
         debutAccreditation :  string  ;
         diplome :  string  ;
         doubleDiplome :  string  ;
         finAccreditation :  string ;
         n0Annee : 0 ;
         nomFormation :  string 
      },
       id : {
         codeFormation :  string  ;
         codeUe :  string 
      },
       nbhCm : 0 ;
       nbhTd : 0 ;
       nbhTp : 0 ;
       semestre :  string 
    }
  }