import React from 'react'
import styles from './_DetailCard.module.scss'
import iconCart from '../../../assets/img/cart.svg'

const DetailCard = (props) => (
    <div className={styles.synopsis}>
        <h2>Synopsis :</h2>
        <p>{props.book.synopsis}</p>
        <div onClick={props.add.bind(this, props.book)}>
            <img src={iconCart} alt="icon cart"/>
            <br />
            Ajouter au panier
        </div>
    </div>
)

export default DetailCard
