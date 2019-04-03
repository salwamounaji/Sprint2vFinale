import { Component, Prop, State } from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Question } from '../../global/Question';
import { QuestionEvaluation } from '../../global/QuestionEvaluation';
import { Coupledequalificatif } from '../../global/Coupledequalificatif';


@Component({
    tag: 'spi-addquestion',
    styleUrl: 'spi-addquestion.scss'
})
export class AddQue {
    @State() posts: any = [];

    @Prop() match: MatchResults;
    @Prop() history: RouterHistory;

    @State() question: any = {};
    @State() questions: Question[] = [];


    @State() questionEvaluations: QuestionEvaluation[] = [];
    @State() questionEvaluation: any = {};

    @State() qualificatifs: Coupledequalificatif[] = [];
    @State() qualificatif: any = {};

    rubriqueEvaluation: any = {};

    ordre: number;
    idQualificatif: number;


    creerQuestion(u) {
        u.preventDefault();
        const question = this.question;
        const questionEvaluation = this.questionEvaluation;
        const ordre = this.questionEvaluation.ordre;
        const idQualificatif = this.qualificatif.idQualificatif;
        const rubriqueEvaluation = this.rubriqueEvaluation;

        const payload = {
            idQualificatif,
            questionEvaluation,
            question,
            ordre,
            rubriqueEvaluation
        };

        console.log(JSON.stringify(payload));
        fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/questionsevaluation", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                Swal.fire({
                    type: 'success',
                    title: 'Ajout effectué',
                    showConfirmButton: false,
                    timer: 1900
                  })
                  .then((willadd) => {
                    if (willadd) {
                    } 
                    window.location.replace("/rubrique/" + this.match.params.idevaluation+"/"+this.match.params.designation);
                });
               
            } else {
                swal({
                    title: "Ajout échoué",
                    text: "La question n'a pas été ajoutée!",
                    icon: "warning",
                });
            }
        });
    }

    componentWillLoad() {
        console.log(sessionStorage.getItem('role'));
        if (sessionStorage.getItem('role') == null) { window.location.replace('/login'); }

        return fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/questions")
            .then(response => response.json())
            .then(data => {
                this.questions = data || []; console.log(this.questions);
            }) &&
            fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/RubriqueEvaluation/Rubrique/"+this.match.params.idRubriqueEvaluation)
                .then(response => response.json())
                .then(data => {
                    this.rubriqueEvaluation = data || [];
                })

            &&
            fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/qualificatif")
                .then(response => response.json())
                .then(data => {
                    this.qualificatifs = data || [];
                })

            ;
    }
    back() {
        this.history.goBack();
    }

    render() {
        if (this.questions != null) {

            return (

                <div>
                    <spi-header />
                    <section class="section">
                        <div class="container">
                            <br />
                            <h2 class="title is-3"><font color="black">L'ajout d'une question pour la rubrique "{this.match.params.designrub}"
 {this.match.params.idRubrique}</font></h2>
                            <div class="section-heading">

                            </div>
                            <br /><br />

                            <div class="columns">
                                <div class="column is-6 is-offset-3">
                                    <div class="box" id="box">
                                        <form>
                                            <div class="row">
                                                <br/>
                                                <h2><b><font color="white">Liste des questions</font></b></h2>
                                                <div class="field-body">
                                                    <div class="radio">
                                                        {this.questions.map(item =>
                                                            <label>
                                                                <input type="radio" value={item.idQuestion} onInput={(e: any) => (this.question.idQuestion = e.target.value)} />
                                                                &nbsp;&nbsp; {item.intitule}<br />
                                                            </label>
                                                        )}

                                                    </div></div> </div>
                                            <br /><br />


                                            <br></br>
                                            <div class="field">
                                                <label class="label" id="label"> <h2><b><font color="white">Liste des qualificatifs</font></b></h2>
                                                    <span class="red"></span> </label>
                                                    <br/>
                                                <p class="control has-icons-left has-icons-right">
                                                    <div class="select is-info is-extra-small">
                                                        <span class="icon"> <i class="fas fa-user-tie"></i></span>

                                                        <select class="is-rounded is-info" required onInput={(e: any) => (this.qualificatif.idQualificatif = e.target.value)}>
                                                            {this.qualificatifs.map(item =>
                                                                <option value={item.idQualificatif}>{item.minimal}&nbsp;{item.maximal}</option>
                                                            )}
                                                        </select>
                                                    </div>

                                                </p>
                                            </div>



                                            <br></br>
                                            <div class="field is-grouped has-text-centered">
                                                <div class="control">
                                                    <button type="submit" class="button is-info" id="button"
                                                        onClick={this.creerQuestion.bind(this)}>
                                                        <span class="icon">
                                                            <i class="fas fa-check"></i>   </span>
                                                        <span>Valider </span>
                                                        
                                                    </button>
                                                </div>
                                                <div class="control">
                                                    <button class="button is-info" id="button" onClick={() => this.back()}>
                                                        <span class="icon"><i class="fas fa-chevron-left"></i></span>
                                                        <span>Retour</span></button>
                                                </div>

                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section></div>

            );
        }

        else {

            return ("Echec de connecction, le chargement des données n'est pas bien effectuée");

        }
    }

}
