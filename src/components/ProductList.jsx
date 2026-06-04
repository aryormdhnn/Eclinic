import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from './ui/LoadingSpinner';
import '../css/productlist.css';

const ProductList = () => {
  const { fallbackImage, addToCart } = useContext(ProductContext);
  const { penyakit } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products at component level (not in Provider) since penyakit is a route param
  useEffect(() => {
    if (!penyakit) return;

    setIsLoading(true);
    fetch('https://64757770e607ba4797dbeafb.mockapi.io/product')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (product) =>
            product.penyakit?.toLowerCase() === penyakit.toLowerCase()
        );
        setProducts(filtered);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setIsLoading(false);
      });
  }, [penyakit]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="obat">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="rekomendasi-title">{penyakit}</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Cari obat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Cari obat"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">
            {products.length === 0
              ? `Tidak ada produk untuk kategori "${penyakit}".`
              : 'Tidak ada produk yang sesuai pencarian.'}
          </p>
          <Link to="/toko" className="btn btn-outline-success mt-2">
            Kembali ke Toko
          </Link>
        </div>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <div className="card-obat">
                <div className="card-body">
                  <img
                    src={product.image || fallbackImage}
                    alt={product.name}
                    className="product-image"
                  />
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-price">
                    Rp. {Number(product.price).toLocaleString('id-ID')}
                  </p>
                  <Button
                    variant="outline-success"
                    className="btn-product"
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        image: product.image,
                        name: product.name,
                        price: product.price,
                      })
                    }
                  >
                    Tambah ke Keranjang
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
