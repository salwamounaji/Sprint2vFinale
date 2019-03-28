import { Component} from '@stencil/core';




@Component({
  tag: 'spi-profilenseignant',
  styleUrl: 'spi-profilenseignant.scss'
})
export class SpiProfileEnseignant {
  componentWillLoad(){
    console.log(sessionStorage.getItem('role'));
    if(sessionStorage.getItem('role') == null){window.location.replace('/login');}
  }

  render() {
    return (
      <div>
        <spi-headeree/>
      <div>
      <section class="hero welcome">

<div class="hero-body">
  <div class="container">
    <div class="columns">
      <div class="column is-two-thirds">
      
        <div>
          <aside class="profile-card" >
            <header>
              <img src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"></img>
              <h1>Mr. SALIOU Philippe</h1><br></br>
              <h2></h2>
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

        <div class="column">
            <div class="">
                <p class="">
                  <span class="box">
                    <a  id="a"href="/listens"><font color="black">Formation</font></a>
                  </span>
                  &nbsp;&nbsp;&nbsp;<br/><br/>
                  <span class="box">
                    <a id="a"href="/listqens"><font color="black">Qualificatif</font></a>
                  </span>
                </p>
            </div>
          </div>
        </div>


        <div class="column
        ">
            <div class="color">
                <p class="card-item">
                  
                </p>
            </div>
          </div>

        </div>
      </div>
</section>
    </div>
  </div>

    );
  }

}