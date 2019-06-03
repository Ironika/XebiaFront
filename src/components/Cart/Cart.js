import React, { Component } from 'react'
import { Loader } from '../../modules/Loader/Loader'
import { Row, Col } from 'reactstrap'
import styles from './_Cart.module.scss'
import iconArrow from '../../assets/img/arrow.svg'
import Helper from '../../helpers/Helper'

class Cart extends Component {
  constructor (props) {
    super(props)

    this.state = {
        loader: true,
        totalPrice: 0,
        offer: 0,
        total: 0
    }

    this.helper = new Helper()
  }

  async componentDidMount () {
    let totalPrice = this.helper.getTotalInCart(this.props.cart),
        offers = await this.helper.getOffers(this.props.cart),
        offer = this.helper.calculOffer(totalPrice, offers),
        total = totalPrice - offer

    this.setState({ totalPrice: totalPrice, offer: offer, total: total, loader: false });
  }

  render () {
    return (
        <React.Fragment>
        { this.state.loader ?
          <Loader /> :
            <Row>
                <Col xs={12}>
                    <div className={styles.back} onClick={this.props.back && this.props.back.bind(this, 'cart')}>
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
        </React.Fragment>
    )
  }
}

export default Cart
