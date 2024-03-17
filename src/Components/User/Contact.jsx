import React from 'react';
import './Contact.css';

export default function Contact() {
  return (
    <footer class="footer">
  <div class="footer__parralax">
    <div class="footer__parralax-trees"></div>
    <div class="footer__parralax-moto"></div>
    <div class="footer__parralax-secondplan"></div>
    <div class="footer__parralax-premierplan"></div>
    <div class="footer__parralax-voiture"></div>
  </div>
  <div class="container1">
    <div class="footer__columns">
      <div class="footer__col">
        <h3 class="footer__col-title">
          <i data-feather="shopping-bag"></i> <span>La boutique</span></h3>
        <nav class="footer__nav">
          <ul class="footer__nav-list">
            <li class="footer__nav-item">
              <a href="" class="footer__nav-link">
                Mentions légales
              </a>
            </li>
            <li class="footer__nav-item">
              <a href="" class="footer__nav-link">
                Politique de confidentialité
              </a>
            </li>
            <li class="footer__nav-item">
              <a href="" class="footer__nav-link">
                CGV
              </a>
            </li>
            <li class="footer__nav-item">
              <a href="" class="footer__nav-link">
                Livraisons et retours
              </a>
            </li>
            <li class="footer__nav-item">
              <a href="" class="footer__nav-link">
                Règlement concours
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="footer__col">
        <h3 class="footer__col-title">
          <i data-feather="share-2"></i> <span>Nos réseaux</span></h3>
        <nav class="footer__nav">
          <ul class="footer__nav-list">
            <li class="footer__nav-item">
              <a href="" class="footer__nav-link">
                <i data-feather="youtube"></i><span>Youtube</span>
              </a>
            </li>
            <li class="footer__nav-item">
              <a href="" class="footer__nav-link">
                <i data-feather="facebook"></i><span>Facebook</span>
                
              </a>
            </li>
            <li class="footer__nav-item">
              <a href="" class="footer__nav-link">
                <i data-feather="instagram"></i><span>Instagram</span>
                
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="footer__col">
        <h3 class="footer__col-title">
          <i data-feather="send"></i> <span>Contact</span></h3>
        <nav class="footer__nav">
          <ul class="footer__nav-list">
            <li class="footer__nav-item">
              <a href="mailto:contact.laboiserie@gmail.com" class="footer__nav-link">
                contact.laboiserie@gmail.com
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
      <div class="footer__copyrights">
        <p>Réalisé par <a href="https://twitter.com/silvereledev" target="_blank">@SilvereLeDev</a></p>
      </div>
  </div>
</footer>
  );
}
