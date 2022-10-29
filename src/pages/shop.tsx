import { useState } from 'react';
import Head from 'next/head';
import Slider from 'react-slick';
import styles from '../styles/pages/Shop.module.scss';
import Paypal from '../components/Paypal';

export default function Shop() {
  const [optState, setOptState] = useState('-1');
  const [coupon, setCoupon] = useState('');
  const [payState, setPayState] = useState({
    display: false,
    status: 'default',
  });

  const products = [
    { id: 0, quantity: '2 nos', price: '50.00' },
    { id: 1, quantity: '4 nos', price: '95.00' },
    { id: 2, quantity: '6 nos', price: '140.00' },
    { id: 3, quantity: '12 nos', price: '275.00' },
    { id: 4, quantity: '24 nos', price: '530.00' },
  ];

  const images = [
    { id: 0, name: 'Glass 1', src: 'glass1.jpg', alt: 'glass' },
    { id: 1, name: 'Glass 2', src: 'glass2.jpg', alt: 'glass' },
    { id: 2, name: 'Glass 3', src: 'glass4.jpg', alt: 'glass' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleSelect = (e: any) => {
    setOptState(e.target.value);
    setPayState((prev) => ({ ...prev, display: false, status: 'default' }));
  };

  const handlePurchase = (e: any) => {
    if (optState === '-1') {
      alert('Please select a quantity to proceed!');
      return;
    }
    if (!products[optState]) {
      alert('Some error occured, please try again later!');
      return;
    }
    setPayState((prev) => ({ ...prev, display: true, status: 'default' }));
  };

  const handleCoupon = (e: any) => {
    if (coupon === '') return;
    alert('Invalid Coupon Code');
    return;
  };

  return (
    <main className={styles.Shop}>
      <Head>
        <title>Shop | Gemini Chiller</title>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <div className={styles.shopHead}>
        <h1>Shop</h1>
      </div>
      <section className={styles.cardContainer}>
        <div className={styles.productCard}>
          <div className={styles.cardImg}>
            <Slider {...settings} className={styles.Carousel}>
              {images.map((img) => (
                <div key={img.id} className={styles.carouselBox}>
                  <a href={`/images/${img.src}`} target="_blank">
                    <div
                      className={styles.imgBox}
                      style={{ backgroundImage: `url('/images/${img.src}')` }}
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
          <div className={styles.cardContent}>
            <h4>Gemini Chiller - Unbreakable</h4>
            <p>
              Unbreakable glassware, fit for in-house bartenders to properly
              experience their delicious creations in an undiluted way.
              <br />
              <br /> The chiller consists of 2 parts, one meant to hold in
              crushed ice, and the other to hold in your favourable drink. We
              would recommend the classic martini, but this can be used to with
              anything that you would like chilled- ice creams, juices,
              cocktails, and much more.
            </p>
            <select
              name="quantity"
              id="quantity"
              onChange={handleSelect}
              value={optState}
            >
              <option value="-1" disabled>
                Select Quantity
              </option>
              {products.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.quantity}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
      <div className={styles.checkout}>
        <div className={styles.coupon}>
          <input
            type="text"
            placeholder="Coupon Code"
            name="coupon"
            value={coupon}
            onChange={(e: any) => setCoupon(e.target.value)}
          />
          <button type="button" onClick={handleCoupon}>
            Apply
          </button>
        </div>
        <p className={styles.payAmt}>
          Total Amount:
          <span>
            &#163;&nbsp;{products[optState] ? products[optState].price : 0}
          </span>
        </p>
        <button
          type="button"
          onClick={handlePurchase}
          className={styles.buyBtn}
        >
          Buy Now
        </button>
        {payState.display && products[optState] && (
          <div className={styles.outerModal}>
            <div className={styles.innerModal}>
              <button
                className={styles.closeBtn}
                onClick={() =>
                  setPayState((prev) => ({ ...prev, display: false }))
                }
              >
                x
              </button>
              {payState.status === 'default' && (
                <>
                  <h3>Pay to Proceed</h3>
                  <Paypal
                    key={optState}
                    setPayState={setPayState}
                    product={products[optState]}
                  />
                </>
              )}
              {payState.status === 'success' && (
                <>
                  <div className={styles.successful}>
                    <h3>Payment Successful</h3>
                    <img src="/images/confirmed.svg" alt="successful" />
                  </div>
                </>
              )}
              {payState.status === 'error' && (
                <>
                  <div className={styles.successful}>
                    <h3>
                      Some error occurred...
                      <br /> Please try again!
                    </h3>
                    <img src="/images/error.svg" alt="successful" />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
