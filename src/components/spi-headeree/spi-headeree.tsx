import { Component, Prop } from "@stencil/core";
import { RouterHistory } from "@stencil/router";

@Component({
  tag: "spi-headeree",
  styleUrl: "spi-headeree.scss"
})
export class SpiHeaderee {
  burger!: any;
  menu!: any;
  @Prop() history: RouterHistory;
  toggleBurger() {
    console.log("quizz!!");
    this.burger.classList.toggle("is-active");
    this.menu.classList.toggle("is-active");
  }

  LogOut(){
      sessionStorage.removeItem('role');
      window.location.replace('/login');
      
  }
  componentWillLoad(){
    console.log(sessionStorage.getItem('role'));
    if(sessionStorage.getItem('role') == null){window.location.replace('/login');}
  }

  render() {
    return (
      <header>
      <div class="hero-head">
      <nav class="navbar">
          <div class="container">
              <div class="navbar-brand">
                  <a class="navbar-item" href="../">
                      <img src="https://i.ibb.co/Kx5N2ZQ/logo2.png" alt="Logo"></img>
                  </a>
                  <span class="navbar-burger burger" data-target="navbarMenu">
                      <span></span>
                      <span></span>
                      <span></span>
                  </span>
              </div>
              <div id="navbarMenu" class="navbar-menu">
                  <div class="navbar-end">
                      <span class="navbar-item">
                          <a class="button is-white is-outlined" href="/">
                              <span class="icon">
                                  <i class="fa fa-home"></i>
                              </span>
                              <span>Accueil</span>
                          </a>
                      </span>
                      
                      <span class="navbar-item">
                          <a class="button is-white is-outlined" href="/listens">
                              <span class="icon">
                                  <i class="fa fa-book"></i>
                              </span>
                              <span>Formation</span>
                          </a>
                      </span>

                      <span class="navbar-item">
                          <a class="button is-white is-outlined" href="/listeval">
                              <span class="icon">
                                  <i class="fa fa-book"></i>
                              </span>
                              <span>Évaluation</span>
                          </a>
                      </span>

                      <span class="navbar-item">
                          <a class="button is-white is-outlined" href="/profilenseignant">
                              <span class="icon">
                              <i class="fas fa-user-alt"></i>
                              </span>
                              <span>Profil</span>
                          </a>
                      </span>
                      <span class="navbar-item">
                          <a class="button is-white is-outlined" onClick={()=> this.LogOut()}>
                              <span class="icon">
                                  <i class="fas fa-sign-in-alt"></i>
                              </span>
                              <span>Se déconnecter</span>
                          </a>
                      </span>
                  </div>
              </div>
          </div>
      </nav>
      </div>
      </header>
    );
  }
}
