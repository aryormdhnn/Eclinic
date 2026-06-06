import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/artikelList.css';

export default function ArtikelList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://64527375bce0b0a0f7475dda.mockapi.io/blog-posts')
      .then((response) => response.json())
      .then((data) => {
        const updatedArticles = data.slice(0, 10).map((article) => {
          const truncatedText = article.text.split(' ').slice(0, 20).join(' ');
          const ellipsis = article.text.split(' ').length > 20 ? '...' : '';
          return { ...article, text: truncatedText + ellipsis };
        });
        setArticles(updatedArticles);
      })
      .catch(() => { /* API request failed silently; articles will remain empty */ });
  }, []);

  return (
    <div className="banner-article">
      <div className="card-artikel">
        <div className="row">
          {articles.map((article) => (
            <div className="col-sm-4" key={article.id}>
              <div className="card-body artikel-card">
                <img src={article.image} alt="Gambar" style={{ width: '100%', height: 'auto' }} />
                <h5 className="artikel-tittle">{article.title}</h5>
                <p className="card-text">{article.text}</p>
                <Link to={`/detail-artikel/${article.id}`} className="btn btn-success">
                Lihat Selengkapnya
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
