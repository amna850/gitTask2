import React, { Fragment, useState, useEffect } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [catalogs] = useState([...catalogsList])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isSlideShowActive, setIsSlideShowActive] = useState(false)
  const [slideDuration] = useState(3000) // Duration between slides in milliseconds
  const [slideInterval, setSlideInterval] = useState(null)

  // Function to handle going to the next slide
  const goToNextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === catalogs.length - 1 ? 0 : prevIndex + 1
    )
  }

  // Function to handle going to the previous slide
  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? catalogs.length - 1 : prevIndex - 1
    )
  }

  // Function to handle starting/stopping the slideshow
  const handleSlideShowToggle = () => {
    if (!isSlideShowActive) {
      const intervalId = setInterval(goToNextSlide, slideDuration)
      setSlideInterval(intervalId)
    } else {
      clearInterval(slideInterval)
    }
    setIsSlideShowActive(!isSlideShowActive)
  }

  // Clear the interval when the component unmounts or when the slideshow is stopped
  useEffect(() => {
    return () => {
      clearInterval(slideInterval)
    }
  }, [slideInterval])

  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className='layout-row justify-content-center align-items-center mt-20'>
              <button
                className='icon-only outlined'
                data-testid='prev-slide-btn'
                onClick={goToPrevSlide} // Call goToPrevSlide on click
              >
                <i className='material-icons'>arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                currentIndex={activeIndex}
                setActiveIndex={setActiveIndex} // Pass setActiveIndex to Thumbs
              />
              <button
                className='icon-only outlined'
                data-testid='next-slide-btn'
                onClick={goToNextSlide} // Call goToNextSlide on click
              >
                <i className='material-icons'>arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input
            type='checkbox'
            data-testid='toggle-slide-show-button'
            checked={isSlideShowActive} // Checkbox reflects slide show state
            onChange={handleSlideShowToggle} // Call function when toggled
          />
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App
