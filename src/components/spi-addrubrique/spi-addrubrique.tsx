import { Component, Prop, State } from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Rubrique } from '../../global/Rubrique';




@Component({
    tag: 'spi-addrubrique',
    styleUrl: 'spi-addrubrique.scss'
})
export class AddRub {
    @State() posts: any = [];

    @Prop() match: MatchResults;
    @Prop() history: RouterHistory;
    rubrique: any = {};
    rubriquerecap: any = {};
    evaluation: any = {};
    rubriques: Rubrique[] = [];

    creerUnite(u) {
        u.preventDefault();
        const rubrique = this.rubrique;

        fetch('http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/rubrique/' + this.rubrique.idRubrique)
        .then(response => response.json())
        .then(data => {
            this.rubriquerecap = data;
        }).then(()=>{

        const designation = this.rubriquerecap.designation;
        const ordre = this.rubriquerecap.ordre;

        const evaluation = { "idEvaluation": this.match.params.idEvaluation };
       const payload = {
            evaluation,
            rubrique,
            designation,
            ordre
        };
        fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/RubriqueEvaluation", {
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
                    window.location.replace("/rubrique/" + this.match.params.idEvaluation+"/"+this.match.params.designation);
                });
               
            } else {
                swal({
                    title: "Ajout échoué",
                    text: "La rubrique n'a pas été ajoutée!",
                    icon: "warning",
                });
            }
        });
        });
    }

    componentWillLoad() {
        console.log(sessionStorage.getItem('role'));
        if (sessionStorage.getItem('role') == null) { window.location.replace('/login'); }
        return fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/rubrique")
            .then(response => response.json())
            .then(data => {
                this.rubriques = data || []; console.log(this.rubriques);
            }) &&
            fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/evaluation/")
                .then(response => response.json())
                .then(data => {
                    this.posts = data || []; console.log(this.posts);
                });
    }


    back() {
        window.location.replace("/rubrique/" + this.match.params.idEvaluation+"/"+this.match.params.designation);
    }


    render() {
        if (this.rubriques != null) {

            return (

                <div>
                    <spi-headeree />
                    <section class="section">
                        <div class="container">
                            <br />
                            <h2 class="title is-3"><font color="white">L'ajout d'une rubrique pour l'évaluation "{this.match.params.designation}"</font></h2>
                            <div class="section-heading">

                            </div>
                            <br /><br />

                            <div class="columns">
                                <div class="column is-6 is-offset-3">


                                    <div class="box" id="box">
                                        <form>
                                            <div class="row">



                                                <div class="field-body">



                                                    <div class="radio">
                                                        {this.rubriques.map(item =>
                                                            <label>

                                                                <input type="radio" value={item.idRubrique} onInput={(e: any) => (this.rubrique.idRubrique = e.target.value)} name="name"/>
                                                                &nbsp;&nbsp; {item.designation}<br />
                                                            </label>
                                                        )}

                                                    </div>

                                                </div>
                                            </div>
                                            <br />






                                            <br />
                                            <div class="field is-grouped has-text-centered">
                                                <div class="control">
                                                    <button type="button" class="button is-info" id="button" onClick={this.creerUnite.bind(this)}>
                                                        <span class="icon">
                                                            <i class="fas fa-check"></i>                          </span>
                                                        <span>Valider </span></button>
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