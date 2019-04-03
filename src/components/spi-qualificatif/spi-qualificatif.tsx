
import { Component, State } from '@stencil/core';
import { Coupledequalificatif } from '../../global/Coupledequalificatif';
import Swal from 'sweetalert2';

@Component({
    tag: 'spi-qualificatif',
    styleUrl: 'spi-qualificatif.scss',
})

export class SpiListCoupleDeQualificatif {

    @State() coupledequalificatifs: Coupledequalificatif[] = [];


    componentWillLoad() {
        console.log(sessionStorage.getItem('role'));
        if (sessionStorage.getItem('role') == null) { window.location.replace('/login'); }
        fetch('http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/qualificatif')
            .then(res => res.json())
            .then(res => this.coupledequalificatifs = res);
    }

    deleteQualificatif(idQualificatif: number) {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Si vous supprimez ce couple de qualificatifs, vous n'allez plus le trouver dans la liste",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Oui, supprimer!'
          }).then((result) => {
            if (result.value) {
                 return fetch('http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/qualificatif/supprimerParid', {
            method: 'delete',
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idQualificatif: idQualificatif,
            }),
        }).then(response => {
            if (response.status === 200) {
                Swal.fire({
                    type: 'success',
                    title:"Le couple de qualificatifs a été bien supprimé.",
                    showConfirmButton: false,
                    timer: 1300
                  })
                      .then((willadd) => {
                          if (willadd) {
                          } 
                          window.location.replace('/listq');
                      });
            }
            else {
                Swal.fire(
                    'Suppression échouée!',
                    "Le couple de qualificatifs n'a pas été supprimé.",
                    'warning'
                  )
            }
        });
    }
    else {
        Swal.fire(
            'Suppression échouée!',
            "Le couple de qualificatifs n'a pas été supprimé.",
            'warning'
          )
    }
});
}

    render() {
        if (this.coupledequalificatifs != null) {
            return (
                <div>
                    <spi-header></spi-header>
                    
                                

                    <div class="container">
                    <br/><br/><br/><br/>
                    <h2 class="title is-3"><font color="black">Liste des couples de qualificatifs</font></h2>
                   <a href="/addq"><i class="fas fa-plus-square" id="plus"></i></a><br/><br/>
                    
                   <div id="tablecontainer">
                    <br/><br/>
                        <table id="table" class="table  is-striped is-narrow is-hoverable is-fullwidth">

                            <thead>
                                <tr>
                                    <th>Max</th>
                                    <th>Min</th>
                                    <th></th>
                                </tr>
                            </thead>

                            {this.coupledequalificatifs.map((item) => {
                                return (
                                    <tbody>
                                        <tr>
                                            <td>{item.minimal}</td>
                                            <td>{item.maximal}</td>

                                            <td id="test">


                                                <span class="icon has-text-info">
                                                    <a href={`/edit/${item.idQualificatif}`}>
                                                        <i class="fas fa-pencil-alt">
                                                        </i>
                                                    </a>
                                                </span>

                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <span class="icon has-text-danger">

                                                    <a onClick={() => this.deleteQualificatif(item.idQualificatif)}>
                                                        <font color="ff0c58"> <i class="fas fa-trash"> </i></font>
                                                    </a>

                                                </span>

                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            }
                            )
                                                }                        </table></div>
                        <br/>
                    </div><br/><br/><br/><br/><br/><br/></div>                        

            );
        }
    }
}