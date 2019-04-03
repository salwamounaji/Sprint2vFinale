import { Component, State, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import bulmaAccordion from '../../../node_modules/bulma-extensions/bulma-accordion/dist/js/bulma-accordion.js'
import Swal from 'sweetalert2';


@Component({
    tag: "spi-rubrique",
    styleUrl: "spi-rubrique.scss"
})
export class SpiRubrique {

    @State() posts: any = [];
    @State() posts2: any = [];
    @Prop() match: MatchResults;
    accordions = bulmaAccordion.attach();

    componentWillLoad() {
        console.log(sessionStorage.getItem('role'));
        if (sessionStorage.getItem('role') == null) { window.location.replace('/login'); }

        fetch('http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/RubriqueEvaluation/' + this.match.params.idEvaluation)
            .then(response => response.json())
            .then(data => {
                this.posts = data;
                console.log(this.posts)
            });

    }

    componentDidLoad() {
        this.accordions = bulmaAccordion.attach();
    }

    deletefnct(idRubrique: number) {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Si vous supprimez cette rubrique, vous n'allez plus la trouver dans la liste!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Oui, supprimer!'
          }).then((result) => {
            if (result.value) {
                return fetch( 'http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/RubriqueEvaluation/Supp/'+idRubrique, {
                    method: 'DELETE'
                }).then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        type: 'success',
                        title:"La rubrique a été bien supprimée.",
                        showConfirmButton: false,
                        timer: 1300
                      })
                          .then((willadd) => {
                              if (willadd) {
                              } 
                              location.href = '/rubrique/'+this.match.params.idEvaluation+'/'+this.match.params.designation;
                          });
                  
                }
                else {
                  Swal.fire(
                    'Suppression échouée!',
                    "La rubrique n'a pas été supprimée.",
                    'warning'
                  )
                }
              });
            }
            else {
              Swal.fire(
                'Suppression échouée!',
                "La rubrique n'a pas été supprimée.",
                'warning'
              )
            }
          });
    }


    getuebynum(num) {
        let url = 'http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/questionsevaluation/RubriqueEvaluation/'
        return fetch(url + num)
            .then(response => response.json())
            .then(data => {
                this.posts2 = data;
                console.log(this.posts2);
            });

    }

    deletequestion(idQuestionEvaluation: number){
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Si vous supprimez cette question, vous n'allez plus la trouver dans la liste!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Oui, supprimer!'
          }).then((result) => {
            if (result.value) {
                let url = 'http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/questionsevaluation/'+idQuestionEvaluation
                return fetch((url), {
                    method: 'DELETE'
                }).then(response => {
                if (response.ok) {
                    Swal.fire({
                        type: 'success',
                        title:"La question a été bien supprimée.",
                        showConfirmButton: false,
                        timer: 1300
                      })
                          .then((willadd) => {
                              if (willadd) {
                              } 
                              location.href = '/rubrique/'+this.match.params.idEvaluation+'/'+this.match.params.designation;
                          });
                  
                }
                else {
                  Swal.fire(
                    'Suppression échouée!',
                    "La question n'a pas été supprimée.",
                    'warning'
                  )
                }
              });
            }
            else {
              Swal.fire(
                'Suppression échouée!',
                "La question n'a pas été supprimée.",
                'warning'
              )
            }
          });
    }

    render() {
        return (
            <div>
                <spi-headeree />

                <section class="container">
                    <div class="container has-text-centered">

                        <h1 class="title">
                            <br /><br /><br /><font color="white">Les rubriques de l'évaluation "{this.match.params.designation}"</font>
                        </h1>
                        <stencil-route-link url={'/add/'+this.match.params.idEvaluation+'/'+this.match.params.designation}>
                            <a><i class="fas fa-plus-square" id="plus"></i></a>
                        </stencil-route-link>

                        <br /><br />
                    </div>
                    <br></br><br></br>
                    <section class="accordions">
                        {this.posts.length == 0 ?
                            <div id="message">
                                Il n'y a pas de rubriques pour cette evaluation, pensez à ajouter une.
                                        </div>
                            :
                            this.posts.map(item => {
                                return (
                                    <article class="accordion  ">
                                        <div class="accordion-header ">
                                        <button onClick={() => this.deletefnct(item.idRubriqueEvaluation)}><i class="far fa-trash-alt"></i></button>
                                            <p>{item.designation}</p>
                                            <button class="toggle" aria-label="toggle" onClick={() => this.getuebynum(item.rubrique.idRubrique)}></button>
                                        </div>
                                        <div class="accordion-body">
                                        <div>
                                                <stencil-route-link url={'/addquestion/'+this.match.params.idEvaluation+'/'+this.match.params.designation+'/'+item.idRubriqueEvaluation+'/'+item.designation}>
                                                    <a class="button is-dark" id="showModal">Ajouter une question</a>
                                                </stencil-route-link>
                                                <br />
                                            </div>
                                            {this.posts2.length == 0 ?
                                                <div class="accordion-content">
                                                    Il n'y a pas de questions pour cette rubrique.
                                        </div>
                                                :
                                                this.posts2.map(item2 => {
                                                    return (
                                                        <div class="accordion-content">
                                                            {item2.question.intitule} <button id="trash" onClick={() => this.deletequestion(item2.idQuestionEvaluation)}><i class="far fa-trash-alt"></i></button>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </article>
                                );
                            })}
                    </section></section></div >

        );
    }
}