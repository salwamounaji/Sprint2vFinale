import { Component, State } from '@stencil/core';

@Component({
  tag: "spi-eval",
  styleUrl: "spi-eval.scss"
})
export class SpiEval {

  @State() posts: any = [];
  @State() posts2: any = [];

  componentWillLoad() {
    console.log(sessionStorage.getItem('role'));
    if (sessionStorage.getItem('role') == null) { window.location.replace('/login'); }
    return fetch('http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/evaluation')
      .then(response => response.json())
      .then(data => {
        this.posts = data;
        console.log(this.posts)
      });
  }

  componentDidLoad() {
    this.modifyselection();
  }

  modifyselection() {
    let rows = document.getElementsByTagName('tr');
    for (var i = 1; i < rows.length; i++) {
      let element = rows[i];
      element.onmouseover = () => element.classList.toggle('is-selected');
      element.onmouseout = () => element.classList.toggle('is-selected');
    }
  }

  getensbynum(num) {
    this.getens();
    let url = 'http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/evaluation'
    return fetch(url + num)
      .then(response => response.json())
      .then(data => {
        this.posts2 = data;
        console.log(this.posts2);
      });

  }

  getens() {
    let t1 = document.getElementById("md");
    t1.classList.toggle("is-active");
  }
  getens2() {
    let t1 = document.getElementById("md");
    t1.classList.remove("is-active");
    //t1.classList.toggle("is-clipped ");
  }

  render() {
    return (
      <div>
        <spi-headeree />

        <section class="container">
          <div class="container has-text-centered">

            <h1 class="title">
              <br></br><br></br>
              <div class="section-heading">
                <h2 class="title is-3"><font color="white">Liste des évaluations</font></h2>
                <a href="/addeval"><i class="fas fa-plus-square" id="plus"></i></a><br/><br/>

              </div>
            </h1>
          </div>
          <br></br>
          <div class="columns">
            <div class="columns is-desktop is-multiline">
              {this.posts.map(
                (pst) =>
                    <div class="card" id="card">
                      <div class="card-image">
                        <figure class="image is-4by3">
                          <img src="https://images.pexels.com/photos/1288488/pexels-photo-1288488.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Placeholder image" class="modal-button" data-target="modal-image2" />
                        </figure>
                      </div>
                      <div class="card-content">
                        <div class="content">
                          <h4 id="titreh4">{pst.designation}</h4>
                          <p><b>Unité d'enseignement : </b>{pst.uniteEnseignement.id.codeUe}</p>
                          <p><b>Élément constitutif : </b>{pst.elementConstitutif.id.codeEc}</p>
                          <p><b id="diplome">Période de l'évaluation : </b>{pst.periode}</p>
                          
                          <div class="field is-grouped">
                            <p class="control">
                              <stencil-route-link url={'/rubrique/' + pst.idEvaluation + '/' +pst.designation}>
                                <a class="button is-dark" id="showModal"><i class="fas fa-info"></i>&nbsp;Détails</a>
                              </stencil-route-link>
                            </p>
                          </div>
                        </div>
                      </div>
                  </div>
              )}


            </div>
          </div>
        </section></div>
    );
  }
}