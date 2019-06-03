import React, { Component } from 'react'
import { Loader } from '../../modules/Loader/Loader'
import Helper from '../../helpers/Helper'
import { Container, Row, Col } from 'reactstrap'
import styles from './_Home.module.scss'
import iconCart from '../../assets/img/cart.svg'
import List from '../Books/List';
import Detail from '../Books/Detail';
import Cart from '../Cart/Cart';

class Home extends Component {
  constructor (props) {
    super(props)

    this.helper = new Helper()

    this.state = {
      loader: true,
      books: [],
      booksFiltered: [],
      book: {},
      cart: [],
      detailIsOpen: false,
      cartIsOpen: false,
      search: ''
    }
  }

  async componentDidMount () {
    let books = await this.helper.getBooks()

    this.setState({ loader: false, books: books, booksFiltered: books });
  }

  handleClickAddCart(book, e) {
    e.stopPropagation();

    let cart = this.state.cart

    if(this.helper.isInCart(cart, book)) {
      this.helper.getBookInCart(cart, book).quantity += 1
    } else {
      book.quantity = 1
      cart.push(book)
    }

    this.setState(cart)
  }

  handleClickDetail(book) {
    this.setState({detailIsOpen: true, book: book})
  }

  handleClickBack(back) {
    if(back === 'cart') {
      this.setState({cartIsOpen: false})
    } else {
      this.setState({detailIsOpen: false, book: {}})
    }
  }

  handleClickCart() {
    if(this.state.cart.length > 0) {
      this.setState({cartIsOpen: true})
    }
  }

  handleChangeSearch(e) {
    let books = this.filterBooks(e.target.value)
    this.setState({search: e.target.value, booksFiltered: books})
  }

  filterBooks(search) {
    let books = this.state.books

    if (search !== '')
      books = this.state.books.filter((book) => (book.title.toLowerCase().includes(search)))

    return books
  }

  render () {
    return (
      <React.Fragment>
      { this.state.loader ?
        <Loader /> :
        <Container>
          <Row>
            <Col>
              <h1 className={styles.title}>Henri Potier</h1>
              <span className={styles.cart} onClick={this.handleClickCart.bind(this)}>
                <img src={iconCart} alt="icon cart"/>
                <span>{this.helper.getTotalItemInCart(this.state.cart)}</span>
              </span>
            </Col>
          </Row>
          { (!this.state.cartIsOpen && !this.state.detailIsOpen) &&
            <Row>
              <Col>
                <div className={styles.search}>
                  <input type="text" value={this.state.search} onChange={this.handleChangeSearch.bind(this)} placeholder="Search your book"/>
                </div>
              </Col>
            </Row>
          }
          { this.state.cartIsOpen ?
            <Cart
              cart={this.state.cart}
              back={this.handleClickBack.bind(this)}
            />
            :
            this.state.detailIsOpen ?
              <Detail
                book={this.state.book}
                add={this.handleClickAddCart.bind(this)}
                back={this.handleClickBack.bind(this)}
              />
              :
              <List
                books={this.state.booksFiltered}
                add={this.handleClickAddCart.bind(this)}
                goToDetail={this.handleClickDetail.bind(this)}
              />
          }
        </Container>
        }
      </React.Fragment>
    )
  }
}

export default Home
