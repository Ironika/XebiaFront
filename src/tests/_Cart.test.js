import React from 'react'
import { shallow } from 'enzyme'
import Cart from '../components/Cart/Cart'
import MockedBooksCart from './mockedBooksCart'
import { Loader } from '../modules/Loader/Loader'

describe('Cart', () => {

    it('renders without crashing', () => {
        shallow(<Cart />)
    })

    it('renders Loader', () => {
        const wrapper = shallow(<Cart />)
        let loader = wrapper.containsMatchingElement(<Loader />)
        expect(loader).toBe(true)
    })

    it('renders with props', async () => {
        const onClick = jest.fn();
        const wrapper = shallow(<Cart cart={MockedBooksCart} back={onClick}/>)
        await wrapper.instance().componentDidMount()
        expect(wrapper.state('totalPrice')).toEqual(100)
        expect(wrapper.state('offer')).toEqual(15)
        expect(wrapper.state('total')).toEqual(85)
    })

    it('should call onClick back', async () => {
        const onClick = jest.fn();
        const wrapper = shallow(<Cart cart={MockedBooksCart} back={onClick}/>)
        await wrapper.instance().componentDidMount()
        wrapper.find('.back').simulate('click')
        expect(onClick).toHaveBeenCalled()
    })
})