const axios = require('axios');

export async function getBooks (cancel) {
  let response = await axios.get('http://henri-potier.xebia.fr/books')
  return response.data
}

export async function getOffers (cart) {
  let apiUrl = "http://henri-potier.xebia.fr/books/",
      isbns = '',
      response

  for(let key in cart) {
    if(Number(key) === cart.length - 1) {
      isbns += cart[key].isbn + '/commercialOffers'
    } else {
      isbns += cart[key].isbn + ','
    }
  }

  response = await axios.get(apiUrl + isbns)

  return response.data.offers
}

export function calculOffer(totalPrice, offers) {
  let bestOffers = []

  for(let key in offers) {
    if(offers[key].type === 'percentage') {
      bestOffers.push(Math.round(offers[key].value / 100 * totalPrice))
    }
    if(offers[key].type === 'minus') {
      bestOffers.push(offers[key].value)
    }
    if(offers[key].type === 'slice') {
      bestOffers.push(Math.floor(totalPrice / offers[key].sliceValue) * offers[key].value)
    }
  }

  bestOffers = bestOffers.sort((a,b) => {
    if (a < b) {
      return 1
    }
    if (a > b) {
      return -1
    }
    return 0
  })

  return bestOffers[0]
}

export function isInCart(cart, book) {
  let isInCart = false

  for(let key in cart) {
    if(cart[key].isbn === book.isbn) {
      return true
    }
  }

  return isInCart
}

export function getBookInCart(cart, book) {

  for(let key in cart) {
    if(cart[key].isbn === book.isbn) {
      return cart[key]
    }
  }

  return null
}

export function getTotalInCart(cart) {
  let total = 0

  for(let key in cart) {
    total += Number(cart[key].quantity) * Number(cart[key].price)
  }

  return Number(total)
}

export function getTotalItemInCart(cart) {
  let total = 0

  for(let key in cart) {
    total += Number(cart[key].quantity)
  }

  return Number(total)
}