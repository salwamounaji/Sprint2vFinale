import { Component, Prop} from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';
import { Enseignant } from '../../global/Enseignant';
import swal from 'sweetalert';
import Swal from 'sweetalert2';


@Component({
  tag: 'spi-createe',
  styleUrl: 'spi-createee.scss'
})
export class SpiCreatee {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;
  codeEc: string;
  description: string;
  nbhCm: 0;
  nbhTd: 0;
  nbhTp: 0;
  designation: string;
  formation: any = {};
  enseignants: Enseignant[];
  enseignant: any = {};
  uniteenseignement: any = {};


  back() {
    this.history.goBack();
  }


  creerUnite() {

    const description = this.description;
    const nbhCm = this.nbhCm;
    const nbhTd = this.nbhTd;
    const nbhTp = this.nbhTp;
    const designation = this.designation;


    const formation = this.formation;
    const enseignant = this.enseignant;
    const uniteenseignement = this.uniteenseignement;
    const id = {
      "codeFormation": this.formation.codeFormation,
      "codeUe": this.match.params.codeUe, "codeEc": this.codeEc
    }


    const payload = {
      id,
      designation,
      description,
      nbhCm,
      nbhTd,
      nbhTp,
      formation,
      enseignant,
      uniteenseignement
    };

    console.log(JSON.stringify(payload));
    fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/elementsconstitutifs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(response => {
      if(response.ok){
        Swal.fire({
          type: 'success',
          title: 'Ajout effectué',
          showConfirmButton: false,
          timer: 1100
        })
            .then((willadd) => {
                if (willadd) {
                } 
                window.location.replace("/ue/"+this.match.params.codeFormation);
            });
     
  }else {
     swal({
          title: "Ajout échoué",
          text: "L'élément constitutif n'a pas été ajouté!",
          icon: "warning",
      });
  }
}); }

 /* changeUE(code) {
    fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/uniteEnseignement/Formation/" + code)
      .then(response => response.json())
      .then(data => {
        this.uniteenseignements = data || [];
        console.log(this.uniteenseignements);
      })
  }*/


  componentWillLoad() {
    console.log(sessionStorage.getItem('role'));
    if (sessionStorage.getItem('role') == null) { window.location.replace('/login'); }
    return fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/formations/codeFormation/" + this.match.params.codeFormation)
      .then(response => response.json())
      .then(data => {
        this.formation = data;
      }) &&
      fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/uniteEnseignement/" + this.match.params.codeFormation + "/" + this.match.params.codeUe)
        .then(response => response.json())
        .then(data => {
          this.uniteenseignement = data; console.log(this.uniteenseignement);
        }) &&
      fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/enseignant")
        .then(response => response.json())
        .then(data => {
          this.enseignants = data || []; console.log(this.enseignants);
        });
  }


  render() {

    if (this.enseignants != null) {
      return (
        <div>
          <spi-header />
          <section class="section">
            <div class="container">
            <br/>
            <h2 class="title is-3"><font color="black">L'ajout d'un élément constitutif</font></h2>
              <br /><br />

              <div class="columns">
                <div class="column is-6 is-offset-3">
                  <div class="box" id="box">
                    <form>
                      <div class="field">
                        <label class="label" id="label">Code d'élément constitutif  </label>
                        <div class="control has-icons-left">
                          <input class="input" type="text" placeholder="Entrer le code d'élément constitutif" name="code EC" value="" onChange={(e: any) => (this.codeEc = e.target.value)} minlength="1"  maxlength="8" required />
                          <span class="icon is-small is-left">
                            <i class="fas fa-key"></i>
                          </span>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" id="label">Désignation </label>
                        <div class="control has-icons-left">
                          <input class="input" type="text" placeholder="Entrer la désignation" name="designation" value="" onChange={(e: any) => (this.designation = e.target.value)} />
                          <span class="icon is-small is-left">
                            <i class="fas fa-pencil-alt"></i>
                          </span>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" id="label">Description </label>
                        <div class="control has-icons-left">
                          <input class="input" type="text" placeholder="Entrer la description" name="description" value="" onChange={(e: any) => (this.description = e.target.value)} />
                          <span class="icon is-small is-left">
                            <i class="fas fa-info"></i>
                          </span>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" id="label">Nombre d'heures de cours </label>
                        <div class="control has-icons-left">
                          <input class="input " type="number" placeholder="Entrer le nombre d'heure des cours" name="nbhCm" value="" onChange={(e: any) => (this.nbhCm = e.target.value)}/>
                          <span class="icon is-small is-left">
                            <i class="fas fa-clock"></i>
                          </span>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label " id="label">Nombre d'heures de TDs</label>
                        <div class="control has-icons-left">
                          <input class="input" type="number" placeholder="Entrer le nombre d'heures des travaux dirigés" name="nbhTd" value="" onChange={(e: any) => (this.nbhTd = e.target.value)}/>
                          <span class="icon is-small is-left">
                            <i class="far fa-clock"></i>
                          </span>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label " id="label">Nombre d'heures de TPs</label>
                        <div class="control has-icons-left">
                          <input class="input" type="number" placeholder="Entrer le nombre d'heures des travaux pratiques" name="nbhTp" value="" onChange={(e: any) => (this.nbhTp = e.target.value)} />
                          <span class="icon is-small is-left">
                            <i class="fas fa-clock"></i>
                          </span>
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

                        <div class="field">
                          <label class="label" id="label">Unité d'enseignement </label>
                          <div class="control">
                            <p class="control is-expanded has-icons-left">

                              <input class="input" type="text" placeholder="Entrer l'unité d'enseignement" name="unité d'enseignement" value={this.match.params.codeUe} onChange={(e: any) => (this.uniteenseignement.id.codeUe = e.target.value)} minlength="1"  required />
                              <span class="icon is-small is-left"><i class="fas fa-chalkboard"></i></span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div class="field-body">
                        <div class="field">
                          <label class="label" id="label"> Enseignant <span class="red"></span> </label>
                          <p class="control has-icons-left has-icons-right">
                            <div class="select is-info">
                              <select class="is-rounded is-info" onInput={(e: any) => (this.enseignant.noEnseignant = e.target.value)}>
                                {this.enseignants.map(item =>
                                  <option value={item.noEnseignant}>{item.nom} {item.prenom}</option>
                                )}
                              </select>
                            </div>

                          </p>
                          <br />
                          <br />
                        </div>
                      </div>
                      <div id="divregroupee" class="field is-grouped has-text-centered">
                        <div class="control">
                          <button type="button" class="button is-dark" onClick={this.creerUnite.bind(this)}>
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
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section></div>
      );
    }
    else {

      return ("couldn't render the data ");

    }
  }

}