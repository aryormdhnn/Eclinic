import "bootstrap/dist/css/bootstrap.min.css";

import "../css/bannerDaftar.css";
import "../globalstyle.css";

export const BannerDaftar = () => {
  return (
    <div>
      <div className="daftar">
        <h4 className="daftar-title">
          Daftar sekarang dan nikmati konsultasi medis online dengan dokter
          terpercaya!
        </h4>
        <form>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            // value={password}
            // onChange={handlePasswordChange}
            placeholder="Masukkan Email Anda"
          />
          <button className="btn btn-success" type="submit">
            Konsultasi Sekarang
          </button>
        </form>
      </div>
    </div>
  );
};

export default BannerDaftar;
