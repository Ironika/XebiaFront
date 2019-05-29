import React from 'react'
import Tilt from 'react-tilt'
import styles from './_BookCard.module.scss'
import iconCart from '../../../assets/img/cart.svg'

const BookCard = (props) => (
  <Tilt className={styles.tilt} options={{max:30}}>
    <div className={styles.tiltInner} onClick={props.goToDetail && props.goToDetail.bind(this, props.book)}>
      <div className={styles.backgroundCover} style={{ backgroundImage: 'url(' + props.book.cover + ')' }}>
        <div className={props.full ? styles.cardContentFull : styles.cardContent }>
          <div className={styles.cardBody}>
            <div className={styles.cardTitle}>{ props.book.title }</div>
          </div>
          <div className={styles.iconsLeft}>
            <span>{ props.book.price }€</span>
          </div>
          <div className={styles.iconsRight}>
            <img onClick={props.add.bind(this, props.book)} className={styles.icon} src={iconCart} alt="icon cart"/>
          </div>
        </div>
      </div>
    </div>
  </Tilt>
)

export default BookCard
