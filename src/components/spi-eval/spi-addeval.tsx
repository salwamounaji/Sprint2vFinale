import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { UniteEnseignement } from '../../global/uniteEnseignement';
import { ElementConstitutif } from '../../global/ElementConstitutif';
import swal from 'sweetalert';



@Component({
  tag: 'spi-addeval',
  styleUrl: 'spi-addeval.scss'
})
export class SpiCreatee {

  @Prop() history: RouterHistory;
  noEvaluation: string;
  etat: string;
  debutReponse: string;
  finReponse: string;
  periode: string;
  designation: string;
  promotion: any = {};
  promotionannee: String;
  codeFormation: String;
  UniteEnseignements: UniteEnseignement[];
  uniteEnseignement: any = {};
  enseignant: any = {};
  @State() elementconstitutifs: ElementConstitutif[] = [];
  elementconstitutif: any = {};
  formationco: String;


  back() {
    this.history.goBack();
  }


  creerUnite() {

    const noEvaluation = this.noEvaluation;
    const etat = this.etat;
    const debutReponse = this.debutReponse;
    const finReponse = this.finReponse;
    const periode = this.periode;
    const designation = this.designation;
    this.formationco = "M2DOSI";

    const enseignant = this.enseignant;

    const promotion = {
      "id": {
        "anneeUniversitaire": this.promotion.id.anneeUniversitaire,
        "codeFormation": this.promotion.id.codeFormation
      }
    }

    const elementConstitutif = {
      "id": {
        "codeEc": this.elementconstitutif.codeEc,
        "codeFormation": this.formationco,
        "codeUe": this.uniteEnseignement.codeUe
      }
    }

    const uniteEnseignement = {
      "id": {
        "codeFormation": this.formationco,
        "codeUe": this.uniteEnseignement.codeUe
      }
    }

    const payload = {
      noEvaluation,
      etat,
      debutReponse,
      finReponse,
      periode,
      designation,
      promotion,
      uniteEnseignement,
      enseignant,
      elementConstitutif
    };

    console.log(JSON.stringify(payload));
    fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/evaluation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(response => {
      if (response.ok) {
          location.href = '/listeval';

      } else {
        swal({
          title: "Ajout échoué",
          text: "L'évaluation n'a pas été ajoutée!",
          icon: "warning",
        });
      }
    });

  }


  changeUE(code) {
    fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/elementsconstitutifs/uniteEnseignement/" + code)
      .then(response => response.json())
      .then(data => {
        this.elementconstitutifs = data || [];
        console.log(this.elementconstitutifs);
      })
  }


  componentWillLoad() {
    console.log(sessionStorage.getItem('role'));
    console.log(sessionStorage.getItem('no_enseignant'));

    if (sessionStorage.getItem('role') == null) { window.location.replace('/login'); }
    return fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/elementsconstitutifs")
      .then(response => response.json())
      .then(data => {
        this.elementconstitutifs = data || []; console.log(this.elementconstitutifs);
      }) &&
      fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io//uniteEnseignement/Enseignant/" + sessionStorage.getItem('no_enseignant'))
        .then(response => response.json())
        .then(data => {
          this.UniteEnseignements = data || []; console.log(this.UniteEnseignements);
        }) &&
      fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/enseignant/id/" + sessionStorage.getItem('no_enseignant'))
        .then(response => response.json())
        .then(data => {
          this.enseignant = data || []; console.log(this.enseignant);
        }) &&

      fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/promotion/2018-2019/M2DOSI")
        .then(response => response.json())
        .then(data => {
          this.promotion = data; console.log(this.promotion);
        });
  }


  render() {

    if (this.enseignant != null && this.UniteEnseignements != null && this.elementconstitutifs != null && this.promotion != null) {
      return (
        <div>
          <spi-headeree />
          <section class="section">
            <div class="container">

              <br />
              <h2 class="title is-3"><font color="black">L'ajout d'une évaluation</font></h2>
              <br /><br />

              <div class="columns">
                <div class="column is-6 is-offset-3">
                  <div class="box" id="box">
                    <form>
                      <div class="field">
                        <label class="label" id="label">N° d'évaluation  </label>
                        <div class="control has-icons-left">
                          <input class="input" type="number" placeholder="Entrer le N° d'évaluation" name="n0evaluation" value="" onChange={(e: any) => (this.noEvaluation = e.target.value)} />
                          <span class="icon is-small is-left">
                            <i class="fas fa-key"></i>
                          </span>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" id="label">Désignation </label>
                        <div class="control has-icons-left">
                          <input class="input" type="text" placeholder="Entrer la designation" name="designation" value="" onChange={(e: any) => (this.designation = e.target.value)} required />
                          <span class="icon is-small is-left">
                            <i class="fas fa-pencil-alt"></i>
                          </span>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label" id="label">État </label>
                        <p class="control has-icons-left">
                          <span class="select" >
                            <select onInput={(e: any) => (this.etat = e.target.value)} required>
                              <option value="CLO" selected>Clôturée</option>
                              <option value="ECL">En cours d'élaboration</option>
                              <option value="ECD">En cours de diffusion</option>
                              <option value="ECD">En cours de dépouillement</option>
                            </select>
                          </span>
                          <span class="icon is-small is-left">
                            <i class="fas fa-info"></i>
                          </span>
                        </p>
                      </div>

                      <div class="field">
                        <label class="label" id="label">Date début</label>
                        <div class="control has-icons-left">
                          <input class="input " type="Date" placeholder="Entrer la date début" name="datedebut" value="" onChange={(e: any) => (this.debutReponse = e.target.value)} required />
                          <span class="icon is-small is-left">
                            <i class="fas fa-clock"></i>
                          </span>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label " id="label">Date fin</label>
                        <div class="control has-icons-left">
                          <input class="input" type="Date" placeholder="Enter la date fin" name="datefin" value="" onChange={(e: any) => (this.finReponse = e.target.value)} required />
                          <span class="icon is-small is-left">
                            <i class="far fa-clock"></i>
                          </span>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label " id="label">Période</label>
                        <div class="control has-icons-left">
                          <input class="input" type="text" placeholder="Entrer la période" name="periode" value="" onChange={(e: any) => (this.periode = e.target.value)} />
                          <span class="icon is-small is-left">
                            <i class="fas fa-clock"></i>
                          </span>
                        </div>
                      </div>

                      <div class="field">
                        <label class="label " id="label">Promotion</label>
                        <div class="control has-icons-left">
                          <input class="input" type="text" placeholder="Entrer la promotion" name="periode" value="2018-2019" onChange={(e: any) => (this.promotionannee = e.target.value)} required />
                          <span class="icon is-small is-left">
                            <i class="fas fa-clock"></i>
                          </span>
                        </div>
                      </div>

                      <div class="field-body">
                        <div class="field">
                          <label class="label" id="label"> Unité d'enseignement <span class="red"></span> </label>
                          <p class="control has-icons-left has-icons-right">
                            <div class="select is-info">
                              <select class="is-rounded is-info" required onInput={(e: any) => { this.uniteEnseignement.codeUe = e.target.value; this.changeUE(this.uniteEnseignement.codeUe) }}>
                                {this.UniteEnseignements.map(item =>
                                  <option value={item.id.codeUe} selected>{item.id.codeUe}</option>
                                )}
                              </select>
                            </div>

                          </p>
                        </div>
                        <div class="field">
                          <label class="label" id="label"> Élément constitutif <span class="red"></span> </label>
                          <p class="control has-icons-left has-icons-right">
                            <div class="select is-info">
                              <select class="is-rounded is-info" onInput={(e: any) => (this.elementconstitutif.codeEc = e.target.value)}>
                                <option value="select" selected>Choisissez un E.C</option>
                                {this.elementconstitutifs.map(item =>
                                  <option value={item.id.codeEc} selected>{item.id.codeEc}</option>
                                )}
                              </select>
                            </div>

                          </p>
                        </div>
                        <div class="field">
                          <label class="label" id="label">Enseignant </label>
                          <div class="control">
                            <p class="control is-expanded has-icons-left">

                              <input class="input" type="text" placeholder="Entrer le nom de l'enseignant" name="enseignant" value={this.enseignant.nom && this.enseignant.prenom} onChange={(e: any) => (this.enseignant.noEnseignant = e.target.value)} minlength="1" required />
                              <span class="icon is-small is-left"><i class="fas fa-chalkboard"></i></span>
                            </p>
                          </div>
                        </div>
                        <br/>
                        <br/>
                      </div>
                      <div>
                      </div>
                      <br/><br/>
                      <div id="divregroupee" class="field is-grouped has-text-centered">
                       <br/><br/>
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