import { Component, State, Prop } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
    tag: 'spi-edit',
    styleUrl: 'spi-edit.scss',
})

export class SpiEdit {

    @Prop() history: RouterHistory;
    @Prop() match: MatchResults;
    @State() qualificatif: any;


    minimal: HTMLInputElement;
    maximal: HTMLInputElement;


    componentWillLoad() {
        console.log(sessionStorage.getItem('role'));
        if (sessionStorage.getItem('role') == null) { window.location.replace('/login'); }
        fetch('http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/qualificatif/' + this.match.params.id)
            .then(res => res.json())
            .then(res => {
            this.qualificatif = res;
                console.log(this.qualificatif.maximal);
            })
    }


    modifydata() {

        return fetch("http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/qualificatif/modifierQualificatif", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idQualificatif: this.match.params.id,
                maximal: this.maximal.value,
                minimal: this.minimal.value
            }),
        }).then(() => {
            Swal.fire({
                type: 'success',
                title: 'Modification effectuée',
                showConfirmButton: false,
                timer: 1100
              })
                  .then((willadd) => {
                      if (willadd) {
                      } 
                      window.location.replace("/listq");
                  });
        }

        ).catch((error) => {

            swal({
                title: "Modification échouée",
                text: "le couple de qualificatifs n'a pas été modifié!",
                icon: "warning",
            });

            console.error(error);
        });
    }

    back() {
       window.location.replace("/listq");
    }

    render() {
        if (this.qualificatif != null) {
            return (
                <div>
                    <spi-header />

                    <section class="section">
                        <div class="container">
                        <br/><br/>
                            <h2 class="title is-3"><font color="black">Modification d'un couple de qualificatifs</font></h2><br></br>
                            <div class="section-heading">

                            </div>
                            <br /><br />

                            <div class="columns">
                                <div class="column is-6 is-offset-3">
                                    <div class="box" id="box">
                                        <form>


                                            <div class="field" id="label">
                                                <label class="label" id="label">Maximal </label>
                                                <div class="control">
                                                    <p class="control is-expanded has-icons-left">

                                                        <input class="input" type="text" name="Qualificatif maximal" ref={(e: HTMLInputElement) => this.maximal = e} placeholder="Maximal" value={this.qualificatif.maximal} />
                                                        <span class="icon is-small is-left"><i class="fas fa-plus-square"></i></span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="field">
                                                <label class="label" id="label">Minimal </label>
                                                <div class="control">
                                                    <p class="control is-expanded has-icons-left">

                                                        <input class="input" type="text" name="Qualificatif minimal" ref={(e: HTMLInputElement) => this.minimal = e} placeholder="Minimal" value={this.qualificatif.minimal} />
                                                        <span class="icon is-small is-left"><i class="fas fa-minus-square"></i></span>
                                                    </p>
                                                </div>
                                            </div>



                                            <br />
                                            <div class="field is-grouped has-text-centered">
                                                <div class="control">


                                                    <input class="button is-primary" id="modifier" value="Modifier"
                                                        onClick={() => this.modifydata()}>
                                                        <span class="icon"><i class="fas fa-pencil-alt" id="icon"></i></span>
                                                        <span id="span"></span>

                                                    </input>
                                                </div>
                                                <div class="control">
                                                    <button class="button is-info" id="button" onClick={() => this.back()}>
                                                        <span class="icon"><i class="fas fa-chevron-left" id="icon"></i></span>
                                                        <span id="span">Retour</span></button>
                                                </div>
                                            </div>

                                        </form>
                                        <br />

                                    </div>
                                </div>
                            </div>
                            <br /><br /><br /> <br /><br /><br />
                        </div>
                    </section></div>

            );
        }

        else {
            return ("Couldn't render the data");
        }
    }
}