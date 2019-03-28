import { Component, State, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import bulmaAccordion from '../../../node_modules/bulma-extensions/bulma-accordion/dist/js/bulma-accordion.js'
import Swal from 'sweetalert2';


@Component({
    tag: "spi-ue",
    styleUrl: "spi-ue.scss"
})
export class SpiUe {

    @State() posts: any = [];
    @State() posts2: any = [];
    @Prop() match: MatchResults;
    accordions = bulmaAccordion.attach();

    componentWillLoad() {
        console.log(sessionStorage.getItem('role'));
        if (sessionStorage.getItem('role') == null) { window.location.replace('/login'); }

        fetch('http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/uniteEnseignement/Formation/' + this.match.params.codeFormation)
            .then(response => response.json())
            .then(data => {
                this.posts = data;
                console.log(this.posts)
            });

    }

    componentDidLoad() {
        this.accordions = bulmaAccordion.attach();
    }

    deletefnct(codeue: string, codeform: string) {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Si vous supprimez cette unité d'enseignement, vous n'allez plus la trouver dans la liste!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Oui, supprimer!'
          }).then((result) => {
            if (result.value) {
                let url = 'http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/uniteEnseignement/supprimerPK'
                return fetch((url), {
                    method: 'delete',
                    headers: {
                        Accept: "application/json, text/plain, /",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        codeFormation: codeform,
                        codeUe: codeue
                    }),
                }).then(response => {
                if (response.status === 406) {
                  Swal.fire(
                    'Suppression effectuée!',
                    "L'unité d'enseignement a été bien supprimée.",
                    'success'
                  )
                  location.href = '/ue/'+this.match.params.codeFormation;
                }
                else {
                  Swal.fire(
                    'Suppression échouée!',
                    "L'unité d'enseignement n'a pas été supprimée.",
                    'warning'
                  )
                }
              });
            }
            else {
              Swal.fire(
                'Suppression échouée!',
                "L'unité d'enseignement n'a pas été supprimée.",
                'warning'
              )
            }
          });
    }

    deleteelem(codeue: string, codeec: string) {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Si vous supprimez cet élément constitutif, vous n'allez plus le trouver dans la liste",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Oui, supprimer!'
          }).then((result) => {
            if (result.value) {
                let url = 'http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/elementsconstitutifs/' + this.match.params.codeFormation + '/' + codeue + '/' + codeec
        return fetch((url), {
            method: 'DELETE', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(() => {
                  Swal.fire(
                    'Suppression effectuée!',
                    "L'élément constitutif a été bien supprimé.",
                    'success'
                  )
                  window.location.replace('/ue/'+this.match.params.codeFormation);
            });}
            else {
              Swal.fire(
                'Suppression échouée!',
                "L'élément constitutif n'a pas été supprimée.",
                'warning'
              )
            }
          });
    }


    getuebynum(num) {
        let url = 'http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/elementsconstitutifs/uniteEnseignement/'
        return fetch(url + num)
            .then(response => response.json())
            .then(data => {
                this.posts2 = data;
                console.log(this.posts2);
            });

    }

    render() {
        return (
            <div>
                <spi-header />

                <section class="container">
                    <div class="container has-text-centered">

                        <h1 class="title">
                            <br /><br /><br /><font color="white">Les unités d'enseignements de la formation {this.match.params.codeFormation}</font>
                        </h1>
                        <stencil-route-link url={'/create/' + this.match.params.codeFormation}>
                            <a><i class="fas fa-plus-square" id="plus"></i></a>
                        </stencil-route-link>

                        <br /><br />
                    </div>
                    <br></br><br></br>
                    <section class="accordions">
                        {this.posts.length == 0 ?
                            <div id="message">
                                Il n'y a pas d'unités d'enseignements pour cette formation, pensez à ajouter une.
                                        </div>
                            :
                            this.posts.map(item => {
                                return (
                                    <article class="accordion  ">
                                        <div class="accordion-header ">
                                            <button onClick={() => this.deletefnct(item.id.codeUe, this.match.params.codeFormation)}><i class="far fa-trash-alt"></i></button>
                                            <p> {item.id.codeUe}</p>
                                            <button class="toggle" aria-label="toggle" onClick={() => this.getuebynum(item.id.codeUe)}></button>
                                        </div>
                                        <div class="accordion-body">
                                            <div>
                                                <a class="button is-dark" id="showModal">Supprimer tout les E.Cs</a>
                                                <stencil-route-link url={'/createe/' + this.match.params.codeFormation + '/' + item.id.codeUe}>
                                                    <a class="button is-dark" id="showModal">Ajouter un E.C</a>
                                                </stencil-route-link>
                                                <br />
                                            </div>
                                            {this.posts2.length == 0 ?
                                                <div class="accordion-content">
                                                    Il n'y a pas d'élements constitutifs pour cette unité d'enseignement, pensez à ajouter un.
                                        </div>
                                                :
                                                this.posts2.map(item2 => {
                                                    return (
                                                        <div class="accordion-content">
                                                            {item2.designation} <button id="trash" onClick={() => this.deleteelem(item.id.codeUe, item2.id.codeEc)}><i class="far fa-trash-alt"></i></button>
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