import React from 'react'
import LoaderGif from '../../assets/img/loader.gif'

const Loader = () => (
    <div className="loader">
        <img src={LoaderGif} alt='loader'/>
    </div>
)

export { Loader }