import React, { useState, useEffect } from 'react';
import '../css/artikel.css';
import { Link } from 'react-router-dom';

const Artikel = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://64527375bce0b0a0f7475dda.mockapi.io/blog-posts')
      .then((response) => response.json())
      .then((data) => {
        // High-quality, fast Unsplash images mapped to each specific article to fix the broken links
        const imageMap = {
          '1': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', // Instant noodles
          '2': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80', // Nutrition/Healthy planning
          '3': 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80', // Fresh fruits mix
        };

        const updatedArticles = data.slice(0, 3).map((article) => {
          const localImage = imageMap[article.id] || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80';
          return { ...article, image: localImage };
        });
        setArticles(updatedArticles);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="artikel">
      {/* Header row aligned with the recommended doctors section header */}
      <div className="row artikel-header-row align-items-center">
        <div className="col-8">
          <h3 className="artikel-section-title">Artikel Kesehatan</h3>
        </div>
        <div className="col-4 text-end">
          <Link to="/artikel" className="btn-view-all-artikel">
            Lihat Semua
          </Link>
        </div>
      </div>

      {/* Grid container of cards */}
      <div className="artikel-daftar-grid">
        {articles.map((article) => (
          <div className="article-col-wrapper" key={article.id}>
            <div className="card border-0 article-recommend-card">
              <div className="article-card-img-wrapper">
                <img src={article.image} alt={article.title} className="artikel-image" />
                <span className="article-card-category">{article.category || 'Gizi'}</span>
              </div>
              <div className="article-card-content">
                <h5 className="article-tittle">{article.title}</h5>
                <p className="card-text">{article.text}</p>
                <Link to={`/detail-artikel/${article.id}`} className="btn btn-article-more">
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artikel;
