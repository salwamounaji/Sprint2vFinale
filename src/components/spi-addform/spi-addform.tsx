import { Component, Prop } from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';
import Swal from 'sweetalert2'

@Component({
    tag: 'spi-addform',
    styleUrl: 'spi-addform.scss'
})
export class SpiAddForm {
    @Prop() match: MatchResults;
    @Prop() history: RouterHistory;
    codeFormation: string;
    debutAccreditation: string;
    diplome: string;
    doubleDiplome: string;
    finAccreditation: string;
    n0Annee: number;
    nomFormation: string;


    back() {
        window.location.replace('/list');
    }


    creerUnite() {
       
        const debutAccreditation = this.debutAccreditation;
        const diplome = this.diplome;
        const doubleDiplome = this.doubleDiplome;
        const finAccreditation = this.finAccreditation;
        const n0Annee = this.n0Annee;
        const nomFormation = this.nomFormation;
        const codeFormation = this.codeFormation;


        const payload = {
            codeFormation,
            debutAccreditation,
            diplome,
            doubleDiplome,
            finAccreditation,
            n0Annee,
            nomFormation
        };

        console.log(codeFormation,
            debutAccreditation,
            diplome,
            doubleDiplome,
            finAccreditation,
            n0Annee,
            nomFormation);

        console.log(JSON.stringify(payload));
        fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/formations/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.status === 200) {
                Swal.fire({
                    type: 'success',
                    title:"Ajout effectué",
                    showConfirmButton: false,
                    timer: 2000
                  })
                          location.href = '/list';
            }
            else {
                Swal.fire(
                    'Ajout échoué!',
                    "La formation n'a pas été ajoutée",
                    'warning'
                )
            }
        });
    }



    componentWillLoad() {
        console.log(sessionStorage.getItem('role'));
        if (sessionStorage.getItem('role') == null) { window.location.replace('/login'); }
    }

         
    render() {

        return (
            <div>
                <spi-header />
                <section class="section">
                    <div class="container">
                    <br/>
                    <h2 class="title is-3"><font color="black">L'ajout d'une unité d'enseignement</font></h2>
                        <br /><br />

                        <div class="columns">
                            <div class="column is-6 is-offset-3">
                                <div class="box" id="box">
                                    <form>
                                        <div class="field">
                                            <label class="label" id="label">Code Formation  </label>
                                            <div class="control has-icons-left">
                                                <input class="input" type="text" placeholder="ex: M2DOSI" name="codeformation" value="" onChange={(e: any) => (this.codeFormation = e.target.value)} maxlength="8" required />
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-cog"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div class="field">
                                           <label class="label" id="label"> Diplôme </label>
                                            <p class="control has-icons-left">
                                                <span class="select" >
                                                    <select onInput={(e: any) => (this.diplome = e.target.value)}>
                                                        <option value="D" selected>Doctorat</option>
                                                        <option value="L">Licence</option>
                                                        <option value="M">Master</option>
                                                    </select>
                                                </span>
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-university"></i>
                                                </span>
                                            </p>
                                        </div>

                                        <div class="field">
                                            <label class="label" id="label">Intitulé de la formation </label>
                                            <div class="control has-icons-left">
                                                <input class="input" type="text" placeholder="Entrer le nom de la formation" name="nomFormation" value="" onChange={(e: any) => (this.nomFormation = e.target.value)}/>
                                                <span class="icon is-small is-left">
                                                    <i class="fab fa-wpforms"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label" id="label">N° de l'année</label>
                                            <div class="control has-icons-left">
                                                <input class="input " type="number" placeholder="Entrer le N° de l'année" name="n0annee" value="" onChange={(e: any) => (this.n0Annee = e.target.value)}/>
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-sort-numeric-up"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label " id="label">Date du début d'accréditation</label>
                                            <div class="control has-icons-left">
                                                <input class="input" type="date" placeholder="Entrer la date du début d'accréditation" name="datedebut" value="" onChange={(e: any) => (this.debutAccreditation = e.target.value)} />
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-calendar-alt"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label " id="label">Date de la fin d'accréditation </label>
                                            <div class="control has-icons-left">
                                                <input class="input" type="date" placeholder="Entrer la date de la fin d'accréditation" name="datefin" value="" onChange={(e: any) => (this.finAccreditation = e.target.value)} />
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-clock"></i>
                                                </span>
                                            </div>
                                            <div class="field">
                                            <label class="label" id="label">Double diplôme ? <span class="red"></span> </label>
                                                <p class="control has-icons-left">
                                                    <span class="select" >
                                                        <select onInput={(e: any) => (this.doubleDiplome = e.target.value)} >
                                                            <option value="N" selected>Non</option>
                                                            <option value="O">Oui</option>
                                                        </select>
                                                    </span>
                                                </p>
                                                <br/>
                                            </div>

                                            <div id="divregroupee" class="field is-grouped has-text-centered">
                                                <div class="control">
                                                    <button type="submit" class="button is-dark" onClick={() => this.creerUnite()}>
                                                        <span class="icon is-small">
                                                            <i class="fas fa-check"></i>
                                                        </span>
                                                        <span>Valider </span></button>
                                                </div>
                                                <div class="control">
                                                    <button class="button is-dark" id="button" onClick={this.back.bind(this)}>
                                                        <span class="icon"><i class="fas fa-chevron-left"></i></span>
                                                        <span>Retour</span></button>
                                                </div>

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

}