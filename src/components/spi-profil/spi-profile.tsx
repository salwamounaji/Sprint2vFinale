import { Component } from '@stencil/core';



@Component({
  tag: 'spi-profile',
  styleUrl: 'spi-profile.scss'
})
export class SpiProfile {

  render() {
    return (
      <div>
        <section class="hero welcome">
       
          <div class="hero-body">
            <div class="container">
            <div class="center">
              <aside class="profile-card">

                <header>
    
                  <img src="data:image/jpeg;base64,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"></img>
                  <h1>Mr. Hervé Jean-Pierre</h1><br></br>
                  <h2>Administrateur de l'application SPI-ADM.</h2>
                </header>
                <div class="profile-bio">
                  <ul class="profile-social-links">
                    <li>  <a href="www.facebook.com"> <i class="fab fa-facebook fa-1x"> </i></a></li>
                    <li>  <a href="www.facebook.com"> <i class="fab fa-linkedin-in fa-1x "> </i></a></li>
                    <li>  <a href="www.facebook.com"> <i class="fab fa-github fa-1x">     </i></a></li></ul>
                </div>
              </aside>
              </div>
            
            </div>
            
      <div class="columns">
         <div class="column is-9">
                  <table class="table is-hoverable is-fullwidth is-striped">
                  <caption>Actions</caption>
                    <tbody>
                      <tr>
                       
                        <td> <i class="fas fa-graduation-cap"></i>&nbsp;&nbsp;Formations</td>

                        <td><a class="button is-medium is-primary" href="/list"><i class="fas fa-eye"></i>&nbsp;Consulter</a></td>
                        <td><a class="button is-medium is-info" href="/ajout"><i class="fas fa-plus"></i>&nbsp;Ajouter</a></td>
                      </tr>

                      <tr>
                        
                        <td><i class="fas fa-chalkboard"></i>&nbsp;&nbsp;Unités d'enseignements</td>
                        <td><a class="button is-medium is-primary" href="/list"><i class="fas fa-eye"></i>&nbsp;Consulter</a></td>
                         <td><a class="button is-medium is-info" href="/create"><i class="fas fa-plus"></i>&nbsp;Ajouter</a></td>
                      </tr>
                      <tr>
                      
                        <td>  <i class="fas fa-book-open"></i>&nbsp;&nbsp;Elements constitutifs</td>
                        <td><a class="button is-medium is-primary" href="/list"><i class="fas fa-eye"></i>&nbsp;Consulter</a></td>
                        <td><a class="button is-medium is-info" href="/createe"><i class="fas fa-plus"></i>&nbsp;Ajouter</a></td>
                        
                      </tr>
                      <tr>
                      
                        <td>  <i class="fas fa-clipboard-list"></i>&nbsp;&nbsp;Couples qualificatif</td>
                        <td><a class="button is-medium is-primary" href="/listq"><i class="fas fa-eye"></i>&nbsp;Consulter</a></td>
                        <td><a class="button is-medium is-info" href="/addq"><i class="fas fa-plus"></i>&nbsp;Ajouter</a></td>
                        
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="deco">
              
              <a class="button is-right is-meduim is-info" href="/list"><i class="fas fa-sign-out-alt"></i>&nbsp;Déconexion</a>
             <br></br>
             </div>
             </div>
             
        </section>
        <script async type="text/javascript" src="../js/bulma.js"></script>
      </div>

    );
  }

}