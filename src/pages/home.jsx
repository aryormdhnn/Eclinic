import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    FaBabyCarriage,
    FaBell,
    FaCalendarAlt,
    FaHandSparkles,
    FaHeartbeat,
    FaHome,
    FaPlus,
    FaRegCommentDots,
    FaRegUser,
    FaShoppingCart,
    FaStar,
    FaTooth,
} from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';

import '../css/home.css';
import ImageCover from '../assets/dokter-cover.png';
import DoctorOne from '../assets/dokter/dokter1.png';
import { ProductContext } from '../context/ProductContext';

const specialists = [
    { icon: FaHeartbeat, title: 'Cardiolog...', total: '4 Available', path: '/jantung', color: '#ff1f27' },
    { icon: FaHandSparkles, title: 'Dermatol...', total: '6 Available', path: '/umum', color: '#ff7a1a' },
    { icon: FaTooth, title: 'Orthoped...', total: '8 Available', path: '/ortopedi', color: '#5b94ff' },
    { icon: FaBabyCarriage, title: 'Pediatrici...', total: '10 Available', path: '/anak', color: '#f12299' },
];

const doctors = [
    {
        image: DoctorOne,
        name: 'Dr. Gustavo Botosh',
        specialty: 'Endocrinologists',
        rating: '4.8 (12k Reviews)',
        path: '/cari-dokter',
    },
    {
        image: ImageCover,
        name: 'Dr. Gustavo Botosh',
        specialty: 'Orthopedists',
        rating: '4.8 (8.5k Reviews)',
        path: '/cari-dokter',
    },
];

const medicines = [
    {
        id: 'home-acyclovir-200',
        name: 'Acyclovir 200 Mg 10 Tablet Novell',
        price: 1235,
        oldPrice: '$12.35',
        variant: 'bottle',
    },
    {
        id: 'home-acyclovir-400',
        name: 'Acyclovir 400 Mg 10 Tablet Novell',
        price: 1235,
        oldPrice: '$12.35',
        variant: 'tube',
    },
];

const Home = () => {
    const { addToCart } = useContext(ProductContext);

    const handleAddMedicine = (medicine) => {
        addToCart({
            id: medicine.id,
            image: '',
            name: medicine.name,
            price: medicine.price,
        });
    };

    return (
        <main className="mobile-home-page">
            <div className="phone-home">
                <header className="home-top">
                    <div className="status-row" aria-hidden="true">
                        <span>9:41</span>
                        <div className="status-icons">
                            <span className="signal-bars">
                                <i />
                                <i />
                                <i />
                            </span>
                            <span className="wifi-icon" />
                            <span className="battery-icon" />
                        </div>
                    </div>

                    <div className="location-row">
                        <div>
                            <p>Current Location</p>
                            <button className="location-button" type="button">
                                Kasihan, Bantul
                                <HiChevronDown />
                            </button>
                        </div>
                        <div className="top-actions">
                            <Link to="/cart" className="circle-action" aria-label="Keranjang">
                                <FaShoppingCart />
                            </Link>
                            <Link to="/artikel" className="circle-action" aria-label="Notifikasi">
                                <FaBell />
                            </Link>
                        </div>
                    </div>
                </header>

                <section className="home-section appointment-section">
                    <h1>Appointment Today</h1>
                    <Link to="/cari-dokter" className="appointment-card-home">
                        <div className="appointment-copy">
                            <strong>Dr. Gustavo Botosh Sp.PD</strong>
                            <span>Endocrinologists</span>
                            <div className="appointment-time">
                                <FaCalendarAlt />
                                Friday Apr 18, 14:30 pm
                            </div>
                        </div>
                        <img src={ImageCover} alt="Dokter untuk janji konsultasi hari ini" />
                    </Link>
                </section>

                <section className="home-section">
                    <div className="section-title-row">
                        <h2>Medical Specialist</h2>
                        <Link to="/cari-dokter">See All</Link>
                    </div>
                    <div className="specialist-list">
                        {specialists.map(({ icon: Icon, title, total, path, color }) => (
                            <Link to={path} className="specialist-card" key={title}>
                                <Icon style={{ color }} />
                                <strong>{title}</strong>
                                <span>{total}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="home-section">
                    <div className="section-title-row">
                        <h2>Healthcare services</h2>
                        <Link to="/cari-dokter">See All</Link>
                    </div>
                    <div className="service-tabs" aria-label="Pilihan layanan">
                        <button className="active" type="button">Doctor</button>
                        <button type="button">Clinics</button>
                    </div>
                    <div className="doctor-grid">
                        {doctors.map((doctor) => (
                            <Link to={doctor.path} className="doctor-card-home" key={doctor.specialty}>
                                <div className="doctor-avatar">
                                    <img src={doctor.image} alt={doctor.name} />
                                </div>
                                <strong>{doctor.name}</strong>
                                <span>{doctor.specialty}</span>
                                <p>
                                    <FaStar />
                                    {doctor.rating}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="home-section medicine-section">
                    <div className="section-title-row">
                        <h2>Medicine Treatments</h2>
                        <Link to="/toko">See All</Link>
                    </div>
                    <div className="medicine-grid">
                        {medicines.map((medicine) => (
                            <article className="medicine-card" key={medicine.id}>
                                <div className="medicine-visual">
                                    <div className={`medicine-art ${medicine.variant}`} />
                                    <button
                                        type="button"
                                        className="add-medicine"
                                        onClick={() => handleAddMedicine(medicine)}
                                        aria-label={`Tambah ${medicine.name} ke keranjang`}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                                <h3>{medicine.name}</h3>
                                <p>
                                    ${Number(medicine.price / 100).toFixed(2)}
                                    <span>{medicine.oldPrice}</span>
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <nav className="bottom-app-nav" aria-label="Navigasi utama">
                    <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                        <FaHome />
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/cari-dokter">
                        <FaCalendarAlt />
                    </NavLink>
                    <NavLink to="/chat">
                        <FaRegCommentDots />
                    </NavLink>
                    <NavLink to="/login">
                        <FaRegUser />
                    </NavLink>
                </nav>
            </div>
        </main>
    );
};

export default Home;
