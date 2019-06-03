import React from 'react';
import { shallow } from 'enzyme'
import List from '../components/Books/List';
import MockedBooks from './mockedBooks'


describe('List', () => {

  it('renders without crashing', () => {
    shallow(<List />)
  })

  it('renders with props', () => {
    const add = jest.fn();
    const onClick = jest.fn();
    shallow(<List books={MockedBooks} add={add} goToDetail={onClick}/>)
  })

})
