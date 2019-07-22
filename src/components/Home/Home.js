import React, { Component } from 'react'
import { Loader } from '../../modules/Loader/Loader'
import { Container, Row, Col } from 'reactstrap'
import styles from './_Home.module.scss'
import iconCart from '../../assets/img/cart.svg'
import List from '../Books/List';
import Detail from '../Books/Detail';
import Cart from '../Cart/Cart';
import { getBooks, isInCart, getBookInCart, getTotalItemInCart} from '../../helpers/Helper'

class Home extends Component {
  constructor (props) {
    super(props)

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
    let books = await getBooks()

    this.setState({ loader: false, books: books, booksFiltered: books });
  }

  handleClickAddCart = (e) => {
    e.stopPropagation();

    let book = JSON.parse(e.currentTarget.getAttribute('data-book')),
        cart = this.state.cart

    if(isInCart(cart, book)) {
      getBookInCart(cart, book).quantity += 1
    } else {
      book.quantity = 1
      cart.push(book)
    }

    this.setState(cart)
  }

  handleClickDetail = (e) => {
    let book = JSON.parse(e.currentTarget.getAttribute('data-book'))
    this.setState({detailIsOpen: true, book: book})
  }

  handleClickBack = () => {
    this.setState({detailIsOpen: false, book: {}})
  }

  handleClickBackCart = () => {
    this.setState({cartIsOpen: false})
  }

  handleClickCart = () => {
    if(this.state.cart.length > 0) {
      this.setState({cartIsOpen: true})
    }
  }

  handleChangeSearch = (e) => {
    let books = this.filterBooks(e.target.value)
    this.setState({search: e.target.value, booksFiltered: books})
  }

  filterBooks = (search) => {
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
              <span className={styles.cart} onClick={this.handleClickCart}>
                <img src={iconCart} alt="icon cart"/>
                <span>{getTotalItemInCart(this.state.cart)}</span>
              </span>
            </Col>
          </Row>
          { (!this.state.cartIsOpen && !this.state.detailIsOpen) &&
            <Row>
              <Col>
                <div className={styles.search}>
                  <input type="text" value={this.state.search} onChange={this.handleChangeSearch} placeholder="Search your book"/>
                </div>
              </Col>
            </Row>
          }
          { this.state.cartIsOpen ?
            <Cart
              cart={this.state.cart}
              back={this.handleClickBackCart}
            />
            :
            this.state.detailIsOpen ?
              <Detail
                book={this.state.book}
                add={this.handleClickAddCart}
                back={this.handleClickBack}
              />
              :
              <List
                books={this.state.booksFiltered}
                add={this.handleClickAddCart}
                goToDetail={this.handleClickDetail}
              />
          }
        </Container>
        }
      </React.Fragment>
    )
  }
}

export default Home
