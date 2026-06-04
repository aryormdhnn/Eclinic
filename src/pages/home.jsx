import { Link } from 'react-router-dom';
import {
    HiCalendar,
    HiChatAlt2,
    HiClipboardList,
    HiShoppingBag,
} from 'react-icons/hi';

import '../css/home.css';
import ImageCover from '../assets/dokter-cover.png';
import Artikel from '../components/artikel';
import BannerDaftar from '../components/BannerDaftar';
import CardDokter from '../components/cardDokter';
import CardJenisSakit from '../components/cardJenisSakit';
import Footer from '../components/Footer';
import Testimonial from '../components/testimonial';

const Home = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    return (
        <>
            <main className="app-home">
                <section className="app-dashboard">
                    <div className="dashboard-copy">
                        <span className="dashboard-kicker">eClinic App</span>
                        <h1>
                            {loggedInUser
                                ? `Halo, ${loggedInUser.username}`
                                : 'Kelola kesehatan dari satu aplikasi'}
                        </h1>
                        <p>
                            Konsultasi dokter, beli obat, baca artikel kesehatan, dan lanjutkan
                            proses pemesanan tanpa pindah platform.
                        </p>
                        <div className="dashboard-actions">
                            <Link to="/cari-dokter" className="primary-action">
                                Mulai Konsultasi
                            </Link>
                            <Link to="/toko" className="secondary-action">
                                Belanja Obat
                            </Link>
                        </div>
                    </div>

                    <div className="dashboard-panel" aria-label="Ringkasan aplikasi">
                        <div className="appointment-card">
                            <span>Konsultasi berikutnya</span>
                            <strong>Dokter Umum</strong>
                            <small>Hari ini, 19.30 WIB</small>
                        </div>
                        <div className="dashboard-stats">
                            <div>
                                <strong>24/7</strong>
                                <span>Chat dokter</span>
                            </div>
                            <div>
                                <strong>40%</strong>
                                <span>Promo booking</span>
                            </div>
                        </div>
                        <img src={ImageCover} alt="Dokter konsultasi online" className="dashboard-img" />
                    </div>
                </section>

                <section className="quick-actions" aria-label="Menu cepat">
                    <Link to="/cari-dokter" className="quick-action">
                        <HiChatAlt2 />
                        <span>Konsultasi</span>
                    </Link>
                    <Link to="/toko" className="quick-action">
                        <HiShoppingBag />
                        <span>Toko Obat</span>
                    </Link>
                    <Link to="/artikel" className="quick-action">
                        <HiClipboardList />
                        <span>Artikel</span>
                    </Link>
                    <Link to="/cart" className="quick-action">
                        <HiCalendar />
                        <span>Pesanan</span>
                    </Link>
                </section>

                <section className="JenisSakit app-section">
                    <div className="section-heading">
                        <div>
                            <span>Kategori obat</span>
                            <h2 className="rekomendasi-title">Cari kebutuhan kesehatan</h2>
                        </div>
                        <Link to="/toko" className="section-link">
                            Lihat Semua
                        </Link>
                    </div>
                    <div className="row">
                        <CardJenisSakit />
                    </div>
                </section>

                <CardDokter />
                <Testimonial />
                <Artikel />
                <BannerDaftar />
            </main>
            <Footer />
        </>
    );
};

export default Home;
