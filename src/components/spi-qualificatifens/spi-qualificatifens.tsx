
import { Component, State } from '@stencil/core';
import { Coupledequalificatif } from '../../global/Coupledequalificatif';

@Component({
    tag: 'spi-qualificatifens',
    styleUrl: 'spi-qualificatifens.scss',
})

export class SpiListCoupleDeQualificatifEns {

    @State() coupledequalificatifs: Coupledequalificatif[] = [];


    componentWillLoad() {
        console.log(sessionStorage.getItem('role'));
        if (sessionStorage.getItem('role') == null) { window.location.replace('/login'); }
        fetch('http://app-aead2b86-a4bb-4a14-9b97-cd0d09d78ae6.cleverapps.io/qualificatif')
            .then(res => res.json())
            .then(res => this.coupledequalificatifs = res);
    }


    render() {
        if (this.coupledequalificatifs != null) {
            return (
                <div>
                    <spi-headeree></spi-headeree>
                    
                                

                    <div class="container">
                    <br/><br/><br/><br/>
                    <h2 class="title is-3"><font color="black">Liste des couples de qualificatifs</font></h2><br></br>

                    

                    <br/><br/>
                    <div id="tablecontainer">
                        <table id="table" class="table  is-striped is-narrow is-hoverable is-fullwidth">

                            <thead>
                                <tr>
                                    <th>Max</th>
                                    <th>Min</th>
                                </tr>
                            </thead>

                            {this.coupledequalificatifs.map((item) => {
                                return (
                                    <tbody>
                                        <tr>
                                            <td>{item.minimal}</td>
                                            <td>{item.maximal}</td>
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