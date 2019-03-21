import { Component } from "@stencil/core";

@Component({
  tag: "spi-home",
  styleUrl: "spi-home.scss"
})
export class SpiHome {
  render() {
    return (
      <section class="hero is-info is-fullheight">
      

          <div class="hero-body">
              <div class="container has-text-centered">
          
                  <div class="column is-6 is-offset-3">
                  <h1 class="title">Bienvenue !</h1>
                        <h1 class="title">
                    Votre nouvelle plateforme SPI-ADM est en cours de construction... <br></br><br></br>
                   <div class="loader"></div>   </h1>                 
                  </div>
              </div>
          </div>

  </section>
      
    );
  }
}
