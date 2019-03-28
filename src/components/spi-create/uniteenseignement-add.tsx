import { Component, Prop } from '@stencil/core';
import { Enseignant } from '../../global/Enseignant';
import { RouterHistory, MatchResults } from '@stencil/router';
import swal from 'sweetalert';

@Component({
  tag: 'uniteenseignement-add',
  styleUrl: 'uniteenseignement-add.scss'
})
export class Adduni {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;
  codeUe: string;
  description: string;
  designation: string;
  nbhCm: 0;
  nbhTd: 0;
  nbhTp: 0;
  semestre: string;
  pays: any;
  nationalities: any
  formation: any = {};
  enseignants: Enseignant[] = [];
  enseignant: any = {};

  creerUnite(u) {
    u.preventDefault();
    console.log("!");
    // codeUe = this.codeUe
    const description = this.description;
    const designation = this.designation;
    const nbhCm = this.nbhCm;
    const nbhTd = this.nbhTd;
    const nbhTp = this.nbhTp;
    const semestre = this.semestre;

    //const formations =this.formations;
    const formation = this.formation;
    const enseignant = this.enseignant;
    const id = {
      "codeFormation": this.formation.codeFormation,
      "codeUe": this.codeUe
    }
    // const enseignants =this.enseignants;


    const payload = {
      id,
      description,
      designation,
      nbhCm,
      nbhTd,
      nbhTp,
      semestre,
      formation,
      enseignant

    };


    console.log(JSON.stringify(payload));
    fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/uniteEnseignement/creer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }) .then(response => {
      if(response.ok){
      swal({
          title: "Ajout effectué",
          text: "Ajout de l'unité d'enseignement a été bien effectué",
          icon: "success",
      })
      window.location.replace("/ue/"+this.match.params.codeFormation);
  }else {
     swal({
          title: "Ajout échoué",
          text: "L'unité d'enseignement n'a pas été ajoutée!",
          icon: "warning",
      });
  }
});  }

  componentWillLoad() {
    console.log(sessionStorage.getItem('role'));
    if (sessionStorage.getItem('role') == null) { window.location.replace('/login'); }
    return fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/enseignant")
    .then(response => response.json())
    .then(data => {
      this.enseignants = data || []; console.log(this.enseignants);
    }) && fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/formations/codeFormation/"+this.match.params.codeFormation)
    .then(response => response.json())
    .then(data => {
      this.formation = data;
    });
  }

  back() {
    this.history.goBack();
  }

  render() {
    return (
      <div>
        <spi-header />
        <section class="section">
          <div class="container">
          <br/>
          <h2 class="title is-3"><font color="white">L'ajout d'une unité d'enseignement</font></h2>
            <div class="section-heading">

            </div>
            <br /><br />

            <div class="columns">
              <div class="column is-6 is-offset-3">
                <div class="box" id="box">
                  <form>

                    <div class="field">
                      <label class="label" id="label">Code d'unité d'enseignement </label>
                      <div class="control">
                        <p class="control is-expanded has-icons-left">

                          <input class="input" type="text" placeholder="Entrer le code d'unité d'enseignement" name="code UE" value="" onChange={(e: any) => (this.codeUe = e.target.value)} minlength="1" maxlength="8" required/>
                          <span class="icon is-small is-left"><i class="fas fa-key"></i></span>
                        </p>
                      </div>
                    </div>
                    <div class="field" id="label">
                      <label class="label" id="label">Description </label>
                      <div class="control">
                        <p class="control is-expanded has-icons-left">

                          <input class="input" type="text" placeholder="Entrer la description" name="description" value="" onChange={(e: any) => (this.description = e.target.value)} />
                          <span class="icon is-small is-left"><i class="fas fa-chalkboard"></i></span>
                        </p>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label" id="label">Désignation </label>
                      <div class="control">
                        <p class="control is-expanded has-icons-left">

                          <input class="input" type="text" placeholder="Entrer la désignation" name="designation" value="" onChange={(e: any) => (this.designation = e.target.value)} minlength="1"  required/>
                          <span class="icon is-small is-left"><i class="fas fa-chalkboard"></i></span>
                        </p>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label" id="label">Formation </label>
                      <div class="control">
                        <p class="control is-expanded has-icons-left">

                          <input class="input" type="text" placeholder="Entrer la formation" name="formation" value={this.match.params.codeFormation} onChange={(e: any) => (this.formation.codeFormation = e.target.value)} minlength="1"  required/>
                          <span class="icon is-small is-left"><i class="fas fa-chalkboard"></i></span>
                        </p>
                      </div>
                    </div>


                    <div class="field-body">
                      <div class="field">
                        <label class="label" id="label"> Enseignant responsable<span class="red"></span> </label>
                        <p class="control has-icons-left has-icons-right">
                          <div class="select is-info is-extra-small">
                            <span class="icon"> <i class="fas fa-user-tie"></i></span>

                            <select class="is-rounded is-info" required onInput={(e: any) => (this.enseignant.noEnseignant = e.target.value)}>
                              {this.enseignants.map(item =>
                                <option value={item.noEnseignant}>{item.nom}&nbsp;{item.prenom}</option>
                              )}
                            </select>
                          </div>

                        </p>
                      </div>
                    </div>
                    <br />

                    <div class="field">
                      <p class="control has-icons-left">
                        <span class="select" >
                          <select onInput={(e: any) => (this.semestre = e.target.value)} required >
                            <option value="S10" selected>S10</option>
                            <option value="S9">S9</option>
                            <option value="S8">S8</option>
                            <option value="S7">S7</option>
                            <option value="S6">S6</option>
                            <option value="S5">S5</option>
                            <option value="S4">S4</option>
                            <option value="S3">S3</option>
                            <option value="S2">S2</option>
                            <option value="S1">S1</option>

                          </select>
                        </span>


                        <span class="icon is-small is-left"><i class="fab fa-stripe-s"></i></span>
                      </p>
                    </div>
                    <div class="field">
                      <label class="label" id="label">Nombre d'heure de cours </label>
                      <div class="control">
                        <p class="control is-expanded has-icons-left">

                          <input class="input " type="number" placeholder="Entrer le nombre d'heure des cours" name="nbhCm" value="" onChange={(e: any) => (this.nbhCm = e.target.value)}  minlength="1" required/>
                          <span class="icon is-small is-left"><i class="fas fa-clock"></i></span>
                        </p>

                      </div>
                    </div>

                    <div class="field">
                      <label class="label" id="label">Nombre d'heures de TDs</label>
                      <div class="control">
                        <p class="control is-expanded has-icons-left">

                          <input class="input" type="number" placeholder="Entrer le nombre d'heures des travaux dirigés" name="nbhTd" value="" onChange={(e: any) => (this.nbhTd = e.target.value)}  minlength="1"  required/>
                          <span class="icon is-small is-left"><i class="fas fa-clock"></i></span>
                        </p>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label" id="label">Nombre d'heures de TPs</label>
                      <div class="control">
                        <p class="control is-expanded has-icons-left">

                          <input class="input" type="number" placeholder="Entrer le nombre d'heures des travaux pratiques" name="nbhTp" value="" onChange={(e: any) => (this.nbhTp = e.target.value)} minlength="1"  required/>
                          <span class="icon is-small is-left"><i class="fas fa-clock"></i></span>
                        </p>
                      </div>
                    </div>

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
}