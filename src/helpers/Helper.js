class Helper {

    async getBooks () {
      let apiUrl = "http://henri-potier.xebia.fr/books",
          response,
          json

      try {
        response = await fetch(apiUrl)

        if (!response.ok) {
          throw Error(response.statusText);
        }

        json = await response.json();

        return json
      } catch (error) {
        console.log(error);
      }
    }

    async getOffers (cart) {
      let apiUrl = "http://henri-potier.xebia.fr/books/",
          response,
          json,
          isbns = ''

      for(let key in cart) {
        if(Number(key) === cart.length - 1) {
          isbns += cart[key].isbn + '/commercialOffers'
        } else {
          isbns += cart[key].isbn + ','
        }
      }

      try {
        response = await fetch(apiUrl + isbns)

        if (!response.ok) {
          throw Error(response.statusText);
        }

        json = await response.json();

        return json.offers
      } catch (error) {
        console.log(error);
      }
    }

    calculOffer(totalPrice, offers) {
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

    isInCart(cart, book) {
      let isInCart = false

      for(let key in cart) {
        if(cart[key].isbn === book.isbn) {
          return true
        }
      }

      return isInCart
    }

    getBookInCart(cart, book) {

      for(let key in cart) {
        if(cart[key].isbn === book.isbn) {
          return cart[key]
        }
      }

      return null
    }

    getTotalInCart(cart) {
      let total = 0

      for(let key in cart) {
        total += Number(cart[key].quantity) * Number(cart[key].price)
      }

      return total
    }

    getTotalItemInCart(cart) {
      let total = 0

      for(let key in cart) {
        total += Number(cart[key].quantity)
      }

      return total
    }
}

export default Helper
