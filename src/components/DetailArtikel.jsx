import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { SyncLoader  } from 'react-spinners';
import '../css/detailartikel.css';


export default function DetailArtikel() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://64527375bce0b0a0f7475dda.mockapi.io/blog-posts/${articleId}`)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch(() => { setLoading(false); });
  }, [articleId]);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;

  `;

  if (loading) {
    return (
      <div className="loader">
        <SyncLoader  color="#36d7b7" loading={loading} css={override} size={24} />
      </div>
    );
  }

  return (
    <div>
      <div className="detailartikel">
        <h2>{article.title}</h2>
        <img src={article.image} alt="Gambar" style={{ width: '100%', height: 'auto' }} />
        <p>{article.text}</p>
      </div>
    </div>
  );
}
