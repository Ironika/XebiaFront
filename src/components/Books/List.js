import React from 'react'
import BookCard from '../Books/Cards/BookCard'
import { Row, Col } from 'reactstrap'

const List = (props) => (
    <Row>
        {props.books && props.books.map((book, index) => (
        <Col xs={12} sm={6} md={4} lg={3} key={index}>
            <BookCard
                book={book}
                add={props.add.bind(this)}
                goToDetail={props.goToDetail.bind(this)}
            />
        </Col>
        ))}
    </Row>
)

export default List
