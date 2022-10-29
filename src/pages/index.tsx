import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Carousel from '../components/Carousel';
import styles from '../styles/pages/Home.module.scss';
import axios from '../utils/axios';

export default function Home() {
  const [form, setForm] = useState({
    disabled: false,
    loader: false,
    status: 'Apply',
  });

  const handleFormError = () => {
    setForm({
      disabled: false,
      loader: false,
      status: 'Try Again!',
    });
    setTimeout(() => {
      setForm({
        disabled: false,
        loader: false,
        status: 'Apply',
      });
    }, 5000);
  };

  const handleForm = async (e: any) => {
    e.preventDefault();
    setForm({
      disabled: true,
      loader: true,
      status: 'Applying..',
    });
    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
      views: formData.get('views'),
    };

    try {
      const response = await axios.post('/api/contact/submitForm', data);
      if (response.status === 200) {
        setForm({
          disabled: true,
          loader: false,
          status: 'Applied!',
        });
      } else {
        handleFormError();
      }
    } catch (err) {
      handleFormError();
    }
  };

  return (
    <>
      <Head>
        <title>Gemini Chiller</title>
      </Head>
      <main className={styles.HomePage}>
        <Link href="#header" passHref>
          <button type="button" className={styles.goToTop}>
            <i className={styles.arrowUp} />
          </button>
        </Link>
        <section className={styles.heroSection}>
          <div className={styles.background} />
          <Link href="/" passHref>
            <img
              className={styles.logoName}
              src="/images/logo-name.png"
              alt="logo"
            />
          </Link>
          <img className={styles.heroImage} src="/images/hero.png" alt="hero" />
        </section>
        <section id="gallery" className={styles.gallerySection}>
          <h2>The Ultimate Culinary Experience</h2>
          <Carousel />
        </section>
        <section id="about" className={styles.martiniSection}>
          <p className={styles.backgroundText}>GEMINI</p>
          <p className={`${styles.backgroundText} ${styles.bottomText}`}>
            GEMINI
          </p>
          <h4>The Martini Glass, ReImagined.</h4>
          <div className={styles.martiniFlex}>
            <div
              className={styles.flexImg}
              style={{ backgroundImage: 'url("/images/martini-1.jpg")' }}
            />
            <div className={styles.martiniContent}>
              <h3>Purist Vision of indulgence, undiluted by ice.</h3>
              <p>
                The Gemini Chiller comprises of two pieces (hence the name) with
                a compartment to hold crushed ice to keep the drinking cup
                chilled to enjoy the cocktail, dessert, prawn cocktail or iced
                latte in its undiluted state.
              </p>
              <Link href="/">Know More</Link>
            </div>
          </div>
          <div className={`${styles.martiniFlex} ${styles.flexReverse}`}>
            <div
              className={styles.flexImg}
              style={{ backgroundImage: 'url("/images/martini-2.jpg")' }}
            />
            <div className={styles.martiniContent}>
              <h3>The Chiller experience, engineered to beautify.</h3>
              <p>
                The base allows and pays host to provide a WOW effect and
                enhance the customer experience and create a theatrical
                experience.
              </p>
              <Link href="/">Know More</Link>
            </div>
          </div>
        </section>
        <section className={styles.waterTextSection}>
          <div>
            <p>Life Undiluted</p>
          </div>
          <p>
            When you drink from this chiller, its helps support someone to drink
            fresh water in the villages around the world with our nobility
            program.
          </p>
        </section>
        <section id="contact" className={styles.newsletter}>
          <h4>Apply to be shortlisted for an introductory invite</h4>
          <div className={styles.newsletterFlex}>
            <form method="POST" onSubmit={handleForm}>
              <input
                type="text"
                id="name"
                name="fullName"
                placeholder="Full Name"
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
              <input
                type="number"
                id="phone-no"
                name="phoneNumber"
                placeholder="Contact Number"
                required
              />
              <textarea
                id="views"
                name="views"
                placeholder="Anything you would like to share?"
              />
              <div className={styles.formBtns}>
                <button type="submit" disabled={form.disabled}>
                  {form.status}
                </button>
                {form.loader && <div className={styles.loader} />}
              </div>
            </form>
            <div>
              <p>Our iconic glass is exclusive only to early adopters from:</p>
              <ul>
                <li>Five Star Hotels</li>
                <li>Michelin Star Restaurant</li>
                <li>Cruise liners</li>
                <li>Exclusive boutique bars and restaurants</li>
                <li>Luxury Dealerships &amp; Corporates</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
