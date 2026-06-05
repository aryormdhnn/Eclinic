import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaStar, 
  FaSearch, 
  FaChevronLeft, 
  FaChevronRight, 
  FaFilter,
  FaTimes
} from 'react-icons/fa';
import SpecialtyFilter from "./features/doctor/SpecialtyFilter";
import LoadingSpinner from "./ui/LoadingSpinner";
import "../css/dokter.css";
import "../globalstyle.css";

const USERS_PER_PAGE = 8;

const DoctorList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://64527770a2860c9ed40d2a69.mockapi.io/doctor")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;

  const filteredUsers = users.filter((user) => {
    const isNameMatched = user.name
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    const isJobMatched =
      selectedJobs.length === 0 || selectedJobs.includes(user.job);
    const isPriceMatched =
      selectedPriceFilter === "All" ||
      (selectedPriceFilter === "Below 50" && user.price < 50000) ||
      (selectedPriceFilter === "50-70" &&
        user.price >= 50000 &&
        user.price <= 70000) ||
      (selectedPriceFilter === "Above 70" && user.price > 70000);
    return isNameMatched && isJobMatched && isPriceMatched;
  });

  const displayedUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(1);
  };

  const handleJobSelection = (e) => {
    const job = e.target.value;
    setSelectedJobs((prev) =>
      e.target.checked ? [...prev, job] : prev.filter((j) => j !== job)
    );
    setCurrentPage(1);
  };

  const handlePriceFilter = (e) => {
    setSelectedPriceFilter(e.target.value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedJobs([]);
    setSelectedPriceFilter("All");
    setSearchKeyword("");
    setCurrentPage(1);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="hal-dokter">
      {/* 1. Unified Search & Price Filter Header Card */}
      <div className="filter-header-card">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon-inside" />
          <input
            className="search-dokter-input"
            type="text"
            value={searchKeyword}
            onChange={handleSearch}
            placeholder="Cari nama dokter spesialis..."
            aria-label="Cari nama dokter"
          />
          {searchKeyword && (
            <button className="clear-search-btn" onClick={() => setSearchKeyword("")} aria-label="Bersihkan pencarian">
              <FaTimes />
            </button>
          )}
        </div>
        
        <div className="price-filter-wrapper">
          <label htmlFor="price-select"><FaFilter /> Filter Harga:</label>
          <select
            id="price-select"
            value={selectedPriceFilter}
            onChange={handlePriceFilter}
            aria-label="Filter harga"
            className="price-filter-select"
          >
            <option value="All">Semua Tarif Konsultasi</option>
            <option value="Below 50">Di bawah Rp 50.000</option>
            <option value="50-70">Rp 50.000 - Rp 70.000</option>
            <option value="Above 70">Di atas Rp 70.000</option>
          </select>
        </div>
      </div>

      <div className="page-dokter">
        {/* 2. Desktop sidebar specialty filter */}
        <aside className="filtering-sidebar">
          <div className="sidebar-header">
            <h5>Spesialisasi</h5>
            {(selectedJobs.length > 0 || selectedPriceFilter !== "All" || searchKeyword) && (
              <button onClick={resetFilters} className="reset-filter-btn">
                Reset
              </button>
            )}
          </div>
          <div className="sidebar-content">
            <SpecialtyFilter
              selectedJobs={selectedJobs}
              onChange={handleJobSelection}
            />
          </div>
        </aside>

        {/* Mobile accordion filter toggle */}
        <button
          className="res-filter-toggle"
          onClick={() => setIsFilterOpen((prev) => !prev)}
          aria-expanded={isFilterOpen}
          aria-controls="mobile-filter-drawer"
        >
          <FaFilter /> Pilih Spesialisasi
        </button>

        {isFilterOpen && (
          <motion.div
            id="mobile-filter-drawer"
            className="filtering-drawer-mobile"
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="drawer-header">
              <span>Filter Spesialisasi</span>
              <button onClick={() => setIsFilterOpen(false)} aria-label="Tutup filter"><FaTimes /></button>
            </div>
            <SpecialtyFilter
              selectedJobs={selectedJobs}
              onChange={handleJobSelection}
            />
          </motion.div>
        )}

        {/* 3. Doctors List Area */}
        <main className="dokter-results-container">
          {displayedUsers.length === 0 ? (
            <div className="empty-state-results">
              <div className="empty-icon"><FaUserMd /></div>
              <h4>Dokter Tidak Ditemukan</h4>
              <p>Maaf, kami tidak menemukan dokter spesialis yang sesuai dengan kriteria filter Anda. Coba bersihkan pencarian atau ubah filter spesialisasi.</p>
              <button onClick={resetFilters} className="btn btn-success mt-3">Reset Semua Filter</button>
            </div>
          ) : (
            <div className="row dokter-grid-row">
              {displayedUsers.map((user) => (
                <div key={user.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-12 card-col-result">
                  <div className="card border-0 doctor-recommend-card">
                    <div className="doctor-card-img-wrapper">
                      <img
                        src={user.avatar}
                        alt={`dr. ${user.name}`}
                        className="dokter-image"
                      />
                      <div className="doctor-card-rating">
                        <FaStar className="star-icon" /> <span>{user.rating || "4.8"}</span>
                      </div>
                    </div>
                    <div className="doctor-card-content">
                      <h5 className="card-title">dr. {user.name.substring(0, 16)}</h5>
                      <p className="card-text">{user.job}</p>
                      <div className="card-price">
                        Mulai Dari <span className="price-tag">Rp {(user.price * 1000).toLocaleString('id-ID')}</span>
                      </div>
                      <Link className="btn btn-consult-now" to={`/profil-dokter/${user.id}`}>
                        Mulai Konsultasi
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. Styled Pagination */}
          {totalPages > 1 && (
            <nav className="pagination-wrapper" aria-label="Daftar halaman">
              <button 
                className="pagination-arrow-btn"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Halaman sebelumnya"
              >
                <FaChevronLeft />
              </button>
              
              <ul className="pagination-numbers-list">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? "page-num-active" : "page-num-item"}
                    role="button"
                    aria-current={currentPage === i + 1 ? "page" : undefined}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </li>
                ))}
              </ul>

              <button 
                className="pagination-arrow-btn"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Halaman selanjutnya"
              >
                <FaChevronRight />
              </button>
            </nav>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorList;
