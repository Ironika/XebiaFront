import React from 'react'
import Home from '../components/Home/Home'
import { shallow } from 'enzyme'
import { Loader } from '../modules/Loader/Loader'
import styles from './_Home.module.scss'
import iconCart from '../assets/img/cart.svg'
import Helper from '../helpers/Helper'
import MockedBooks from './mockedBooks'
import MockedBooksFiltered from './mockedBooksFiltered'

let helper = new Helper()

describe('Home', () => {

  it('renders without crashing', () => {
    shallow(<Home />)
  })

  it('renders Loader', () => {
    const wrapper = shallow(<Home />)
    let loader = wrapper.containsMatchingElement(<Loader />)
    expect(loader).toBe(true)
  })

  it('renders title', async () => {
    const wrapper = shallow(<Home />)
    await wrapper.instance().componentDidMount()
    let title = <h1 className={styles.title}>Henri Potier</h1>
    expect(wrapper.contains(title)).toBe(true)
  })

  it('renders cart icon', async () => {
    const wrapper = shallow(<Home />)
    await wrapper.instance().componentDidMount()
    let cartIcon = <img src={iconCart} alt="icon cart"/>
    expect(wrapper.contains(cartIcon)).toBe(true)
  })

  it('renders cart number', async () => {
    const wrapper = shallow(<Home />)
    await wrapper.instance().componentDidMount()
    let cartNumber = <span>{helper.getTotalItemInCart([])}</span>
    expect(wrapper.contains(cartNumber)).toBe(true)
  })

  it('should call onChange with input search value', async () => {
    const wrapper = shallow(<Home />)
    await wrapper.instance().componentDidMount()
    expect(wrapper.state('search')).toEqual('')
    wrapper.find('input').simulate('change', { target: { value: 'chambre'}})
    expect(wrapper.state('search')).toEqual('chambre')
  })

  it('should filters books', async () => {
    const wrapper = shallow(<Home />)
    await wrapper.instance().componentDidMount()
    expect(wrapper.state('booksFiltered')).toEqual(MockedBooks)
    wrapper.find('input').simulate('change', { target: { value: 'chambre'}})
    expect(wrapper.state('booksFiltered')).toEqual(MockedBooksFiltered)
  })
})

