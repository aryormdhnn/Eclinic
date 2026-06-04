import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/footer.css';
import Logo from '../assets/logo.png';
import '../globalstyle.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div>
      <div className="footer-section">
        <div className="company">
          <Link to="/">
            <img src={Logo} alt="eClinic Logo" className="logo-footer" />
          </Link>
          <p className="company-item" id="description">
            Medkit berkomitmen untuk menyediakan layanan telemedicine yang aman,
            andal, dan terjangkau bagi semua orang.
          </p>
        </div>

        <div className="about">
          <div className="fitur">
            <h6 className="title">Fitur</h6>
            <div className="fitur-item">
              <Link to="/cari-dokter">Booking Dokter</Link>
              <Link to="/toko">Toko Obat</Link>
              <Link to="/artikel">Artikel</Link>
            </div>
          </div>

          <div className="fitur">
            <h6 className="title">Perusahaan</h6>
            <div className="fitur-item">
              <a href="#tentang">Tentang Kami</a>
              <a href="#karir">Karir</a>
              <a href="#kontak">Kontak Kami</a>
            </div>
          </div>

          <div className="fitur">
            <h6 className="title">Dukungan</h6>
            <div className="fitur-item">
              <a href="#privacy">Privacy Policy</a>
              <a href="#editorial">Kebijakan Editorial</a>
              <a href="#bantuan">Pusat Bantuan</a>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed: class= → className= */}
      <div className="copyright">
        <p>© 2024 eClinic. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
