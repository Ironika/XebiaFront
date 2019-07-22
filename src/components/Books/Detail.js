import React from 'react'
import BookCard from '../Books/Cards/BookCard'
import DetailCard from '../Books/Cards/DetailCard'
import { Row, Col } from 'reactstrap'
import styles from './_Detail.module.scss'
import iconArrow from '../../assets/img/arrow.svg'

const Detail = (props) => (
    <Row>
        <Col xs={12}>
            <div className={styles.back} onClick={props.back}>
                <img src={iconArrow} alt="back"/>
                <span>Retour</span>
            </div>
        </Col>
        <Col xs={12} sm={4}>
            <BookCard
                book={props.book}
                add={props.add}
                full={true}
            />
        </Col>
        <Col xs={12} sm={8}>
            <DetailCard
                book={props.book}
                add={props.add}
            />
        </Col>
    </Row>
)

export default Detail