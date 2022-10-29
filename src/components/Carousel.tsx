import Head from 'next/head';
import Slider from 'react-slick';
import styles from '../styles/components/Carousel.module.scss';

export default function Carousel() {
  const mobileMatches = window.matchMedia('(max-width: 768px)').matches;
  const tabMatches = window.matchMedia(
    '(min-width: 769px) and (max-width: 992px)',
  ).matches;

  let numberOfSlides = 3;
  if (mobileMatches) numberOfSlides = 1;
  else if (tabMatches) numberOfSlides = 2;

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: numberOfSlides,
    className: 'center',
    centerMode: true,
    centerPadding: '60px',
  };

  const images = [
    { id: 0, name: 'Glass 1', src: 'glass1.jpg', alt: 'glass' },
    { id: 1, name: 'Glass 2', src: 'glass2.jpg', alt: 'glass' },
    { id: 2, name: 'Glass 3', src: 'glass3.jpg', alt: 'glass' },
    { id: 3, name: 'Glass 4', src: 'glass4.jpg', alt: 'glass' },
    { id: 4, name: 'Glass 5', src: 'martini-1.jpg', alt: 'glass' },
    { id: 5, name: 'Glass 6', src: 'martini-2.jpg', alt: 'glass' },
  ];

  return (
    <>
      <Head>
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
      <Slider {...settings} className={styles.Carousel}>
        {images.map((img) => (
          <div key={img.id} className={styles.carouselBox}>
            <div
              className={styles.imgBox}
              style={{ backgroundImage: `url('/images/${img.src}')` }}
            />
          </div>
        ))}
      </Slider>
    </>
  );
}
