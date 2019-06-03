import React from 'react';
import { shallow, mount } from 'enzyme'
import BookCard from '../components/Books/Cards/BookCard';
import MockedBooksFiltered from './mockedBooksFiltered'

describe('BookCard', () => {

  it('renders without crashing', () => {
    const add = jest.fn();
    const onClick = jest.fn();
    shallow(<BookCard book={MockedBooksFiltered[0]} add={add} goToDetail={onClick}/>)
  })

  it('renders infos', async () => {
    const add = jest.fn();
    const onClick = jest.fn();
    const wrapper = mount(<BookCard book={MockedBooksFiltered[0]} add={add} goToDetail={onClick}/>)
    expect(wrapper.props().book.title).toEqual("Henri Potier et la Chambre des secrets")
    expect(wrapper.props().book.price).toEqual(30)
    expect(wrapper.props().book.cover).toEqual("http://henri-potier.xebia.fr/hp1.jpg")
    expect(wrapper.props().book.isbn).toEqual("a460afed-e5e7-4e39-a39d-c885c05db861")
  })
})