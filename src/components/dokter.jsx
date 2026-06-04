import React, { useState, useEffect } from "react";
import "../css/dokter.css";
import "../globalstyle.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import SpecialtyFilter from "./features/doctor/SpecialtyFilter";
import LoadingSpinner from "./ui/LoadingSpinner";

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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="hal-dokter">
      {/* Search & Price Filter */}
      <div className="search-bar">
        <input
          className="search-dokter"
          type="text"
          value={searchKeyword}
          onChange={handleSearch}
          placeholder="Cari Nama Dokter..."
          aria-label="Cari nama dokter"
        />
        <div className="price-filter">
          <p>Filter Harga</p>
          <select
            value={selectedPriceFilter}
            onChange={handlePriceFilter}
            aria-label="Filter harga"
          >
            <option value="All">Semua Harga</option>
            <option value="Below 50">Dibawah 50.000</option>
            <option value="50-70">50.000 - 70.000</option>
            <option value="Above 70">Diatas 70.000</option>
          </select>
        </div>
      </div>

      <div className="page-dokter">
        {/* Desktop sidebar filter */}
        <div className="filtering fil1">
          <SpecialtyFilter
            selectedJobs={selectedJobs}
            onChange={handleJobSelection}
          />
        </div>

        {/* Mobile accordion filter */}
        <button
          className="res-filter"
          onClick={() => setIsFilterOpen((prev) => !prev)}
          aria-expanded={isFilterOpen}
          aria-controls="mobile-filter"
        >
          Pilih Jenis Spesialis
          <HiChevronDown className="dropdown-button" />
        </button>

        {isFilterOpen && (
          <motion.div
            id="mobile-filter"
            className="filtering fil2"
            animate={{ y: 10, scale: 1 }}
            initial={{ y: -50, scale: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SpecialtyFilter
              selectedJobs={selectedJobs}
              onChange={handleJobSelection}
            />
          </motion.div>
        )}

        {/* Doctor Cards */}
        <div className="dokterRekomendasi">
          {displayedUsers.length === 0 ? (
            <div className="empty-state">
              <p>Tidak ada dokter yang sesuai dengan filter.</p>
            </div>
          ) : (
            <div className="row main-row">
              {displayedUsers.map((user) => (
                <div key={user.id} className="col-6 col-md-4 col-lg-3 main">
                  <div className="card border-0">
                    <div className="card-body border-0">
                      <div className="row border-0">
                        <div className="col-sm-12 image">
                          <img
                            src={user.avatar}
                            alt={`Foto dr. ${user.name}`}
                            className="dokter-image"
                          />
                        </div>
                        <div className="comp-2 col-sm-12">
                          <h5 className="card-title">
                            dr. {user.name.substring(0, 12)}
                          </h5>
                          <p className="card-text">{user.job}</p>
                          <div className="card-price">
                            Mulai Dari{" "}
                            <span>
                              Rp. {(user.price * 1000).toLocaleString("id-ID")}
                            </span>
                          </div>
                          <Link
                            className="btn btn-success"
                            to={`/profil-dokter/${user.id}`}
                          >
                            Mulai Konsultasi
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <ul className="daftar-dokter" aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "dokter-active" : ""}
              role="button"
              aria-current={currentPage === i + 1 ? "page" : undefined}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setCurrentPage(i + 1)}
            >
              {i + 1}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorList;
