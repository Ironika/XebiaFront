import React from 'react';
import { shallow } from 'enzyme'
import DetailCard from '../components/Books/Cards/DetailCard';
import MockedBooksFiltered from './mockedBooksFiltered'


describe('DetailCard', () => {
  it('renders without crashing', () => {
    const add = jest.fn();
    shallow(<DetailCard book={MockedBooksFiltered[0]} add={add}/>)
  })
})
