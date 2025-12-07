import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import styles from './CategorySlider.module.css'

export default function CategorySlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  }

  const [category, setCategory] = useState([])

  function getCategories() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((response) => {
        setCategory(response.data.data)
      })
      .catch(() => { })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className={styles.sliderWrapper}>
      <Slider {...settings}>

        {category.map((item) => (
          <div key={item._id} className={styles.slideItem}>
            <div className={styles.imageBox}>
              <img src={item.image} alt={item.name} />
            </div>
            <p className={styles.categoryName}>{item.name}</p>
          </div>
        ))}

      </Slider>
    </div>
  )
}
