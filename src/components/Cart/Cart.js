import React, { Component } from 'react'
import { Loader } from '../../modules/Loader/Loader'
import { Row, Col } from 'reactstrap'
import styles from './_Cart.module.scss'
import iconArrow from '../../assets/img/arrow.svg'
import { getOffers, getTotalInCart, calculOffer } from '../../helpers/Helper'

class Cart extends Component {
  constructor (props) {
    super(props)

    this.state = {
        loader: true,
        totalPrice: 0,
        offer: 0,
        total: 0
    }
  }

  async componentDidMount () {
    let totalPrice = getTotalInCart(this.props.cart),
        offers = await getOffers(this.props.cart),
        offer = calculOffer(totalPrice, offers),
        total = totalPrice - offer,
        loader = false

    this.setState({ totalPrice, offer, total, loader });
  }

  render () {
    return (
        <>
        { this.state.loader ?
          <Loader /> :
            <Row>
                <Col xs={12}>
                    <div className={styles.back} onClick={this.props.back && this.props.back}>
                        <img src={iconArrow} alt="back"/>
                        <span>Retour</span>
                    </div>
                </Col>
                <Col xs={12}>
                    <div className={styles.cart}>
                        <h2>Votre Panier</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prix</th>
                                    <th>Quantité</th>
                                    <th>Prix Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.cart && this.props.cart.map((book, index) => (
                                    <tr key={index} className={styles.cartItem}>
                                        <td>{book.title}</td>
                                        <td>{book.price}€</td>
                                        <td>{book.quantity}</td>
                                        <td>{Number(book.quantity) * Number(book.price)}€</td>
                                    </tr>
                                ))}
                                <tr className={styles.totalPrice}>
                                    <td></td>
                                    <td></td>
                                    <td>Prix Total</td>
                                    <td>{this.state.totalPrice}€</td>
                                </tr>
                                <tr className={styles.offer}>
                                    <td></td>
                                    <td></td>
                                    <td>Offer</td>
                                    <td>{this.state.offer}€</td>
                                </tr>
                                <tr className={styles.total}>
                                    <td></td>
                                    <td></td>
                                    <td>Total</td>
                                    <td>{this.state.total}€</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        }
        </>
    )
  }
}

export default Cart
