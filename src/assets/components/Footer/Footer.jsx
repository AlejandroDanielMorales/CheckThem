import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <ul>
            <li><a href="#">Privacidad</a></li>
            <li><a href="#">Términos de uso</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <ul>
            <li><a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Pendientazo . Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
