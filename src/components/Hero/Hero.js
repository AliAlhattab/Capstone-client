import React from 'react'
import './Hero.scss'
import hero from '../../assets/images/hero.png'

function Hero() {
  return (
    <article className='hero'>
            <img  className='hero__image' src={hero} alt='Hero Image'/>
            <div className='hero__info'>
            <h1 className='hero__title'>Need A Website?</h1>
            <h1 className='hero__title'>Hire A Developer!</h1>
            </div>
    </article>
  )
}

export default Hero