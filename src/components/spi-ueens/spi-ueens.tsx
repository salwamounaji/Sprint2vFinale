import { Component, State, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import bulmaAccordion from '../../../node_modules/bulma-extensions/bulma-accordion/dist/js/bulma-accordion.js'

@Component({
    tag: "spi-ueens",
    styleUrl: "spi-ueens.scss"
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

    deletefnct(pst) {
        let url = 'http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/uniteEnseignement/supprimer'
        return fetch((url), {
            method: 'DELETE', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pst),
        }).then(() => {
            alert("L'unité d'enseignement a été bien supprimée");
            location.href = '/ue/' + this.match.params.codeFormation;
        }).catch((error) => {
            alert('Erreur ! Veuillez réssayer plutard ');
            console.error(error);
        });
    }

    deletefoncion(tr) {
        let url = 'http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/elementsconstitutifs'
        return fetch((url), {
            method: 'DELETE', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tr),
        }).then(() => {
            alert("Deleted !!");
            location.href = '/ue/' + this.match.params.codeFormation;
        }).catch((error) => {
            alert(' Error ! please retry !! ');
            console.error(error);
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
                <spi-headeree />

                <section class="container">
                    <div class="container has-text-centered">

                        <h1 class="title">
                            <br /><br /><br /><font color="white">Les unités d'enseignements de la formation {this.match.params.codeFormation}</font>
                        </h1>

                        <br /><br />
                    </div>
                    <br></br><br></br>
                    <section class="accordions">
                        {this.posts.length == 0 ?
                            <div id="message">
                                Il n'y a pas d'unités d'enseignements pour cette formation.
                                        </div>
                            :
                            this.posts.map(item => {
                                return (
                                    <article class="accordion  ">
                                        <div class="accordion-header ">
                                            <p> {item.id.codeUe}</p>
                                            <button class="toggle" aria-label="toggle" onClick={() => this.getuebynum(item.id.codeUe)}></button>
                                        </div>
                                        <div class="accordion-body">
                                            {this.posts2.length == 0 ?
                                                <div class="accordion-content">
                                                    Il n'y a pas d'élements constitutifs pour cette unité d'enseignement.
                                        </div>
                                                :
                                                this.posts2.map(item2 => {
                                                    return (
                                                        <div class="accordion-content">
                                                            {item2.designation}
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