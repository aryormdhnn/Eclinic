import '../css/footer.css';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import {
  FaRegEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="footer-main">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo-link">
            <img src={Logo} alt="eClinic Logo" className="footer-logo" />
            <span className="footer-brand-name">eClinic</span>
          </Link>
          <p className="footer-tagline">
            Platform konsultasi dokter spesialis online terpercaya. Tanya dokter kapan saja, di mana saja — cepat, aman, dan terjangkau.
          </p>
          {/* Social */}
          <div className="footer-socials">
            <a href="#instagram" className="footer-social-btn" aria-label="Instagram"><FaInstagram /></a>
            <a href="#twitter" className="footer-social-btn" aria-label="Twitter"><FaTwitter /></a>
            <a href="#linkedin" className="footer-social-btn" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="#youtube" className="footer-social-btn" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links-group">
          <h6 className="footer-group-title">Layanan</h6>
          <ul className="footer-link-list">
            <li><Link to="/cari-dokter">Tanya Dokter</Link></li>
            <li><Link to="/artikel">Artikel Kesehatan</Link></li>
            <li><a href="#spesialis">Cari Spesialis</a></li>
            <li><a href="#promo">Promo & Voucher</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h6 className="footer-group-title">Perusahaan</h6>
          <ul className="footer-link-list">
            <li><a href="#tentang">Tentang Kami</a></li>
            <li><a href="#karir">Karir</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#press">Press</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h6 className="footer-group-title">Dukungan</h6>
          <ul className="footer-link-list">
            <li><a href="#bantuan">Pusat Bantuan</a></li>
            <li><a href="#privacy">Kebijakan Privasi</a></li>
            <li><a href="#syarat">Syarat & Ketentuan</a></li>
            <li><a href="#editorial">Kebijakan Editorial</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-contact-col">
          <h6 className="footer-group-title">Hubungi Kami</h6>
          <ul className="footer-contact-list">
            <li>
              <FaRegEnvelope className="footer-contact-icon" />
              <span>hello@eclinic.id</span>
            </li>
            <li>
              <FaPhoneAlt className="footer-contact-icon" />
              <span>+62 21 1500 XXX</span>
            </li>
            <li>
              <FaMapMarkerAlt className="footer-contact-icon" />
              <span>Jakarta, Indonesia</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copy">© {new Date().getFullYear()} eClinic. Hak cipta dilindungi undang-undang.</p>
        <p className="footer-legal">
          Layanan ini tidak menggantikan konsultasi medis tatap muka. Dalam keadaan darurat, segera hubungi 119.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
