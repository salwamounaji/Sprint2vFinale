import { Component } from "@stencil/core";

@Component({
  tag: "spi-header",
  styleUrl: "spi-header.scss"
})
export class SpiHeader {
  burger!: any;
  menu!: any;

  toggleBurger() {
    console.log("quizz!!");
    this.burger.classList.toggle("is-active");
    this.menu.classList.toggle("is-active");
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
                              <span>Home</span>
                          </a>
                      </span>
                      <span class="navbar-item">
                          <a class="button is-white is-outlined" href="/login">
                              <span class="icon">
                                  <i class="fas fa-sign-in-alt"></i>
                              </span>
                              <span>Login</span>
                          </a>
                      </span>
                      <span class="navbar-item">
                          <a class="button is-white is-outlined" href="/list">
                              <span class="icon">
                                  <i class="fa fa-book"></i>
                              </span>
                              <span>Formations</span>
                          </a>
                      </span>
                      <span class="navbar-item">
                          <a class="button is-white is-outlined" href="/profil">
                              <span class="icon">
                              <i class="fas fa-user-alt"></i>
                              </span>
                              <span>Profil</span>
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
