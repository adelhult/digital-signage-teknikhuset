import React, { useEffect, useState } from 'react';
import Display from './Display.js';
import Logo from './Logo.js';

function App() {
  const [images, setImages] = useState([]);
  const [info, setInfo] = useState([]);
  const [currentInfo, setCurrentInfo] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  // the actual value of this var does not matter,
  // it is only used as a trigger to call the fetch functions
  const [updateTrigger, setUpdateTrigger] = useState(false);

  // Fetch data
  useEffect(() => {
    async function fetchImages() {
      const res = await fetch(window.API_URL + "/images");
      res
        .json()
        .then(res => setImages(res));
    }

    async function fetchData() {
      const res = await fetch(window.API_URL + "/info-with-image");
      const infoWithImage = await res.json();

      if (infoWithImage.length > 0) {
        let infoEntries = []
        let images = []
        infoWithImage.forEach(pair => {
          infoEntries.push(pair[0]);
          images.push(pair[1]);
        });

        setImages(images);
        setInfo(infoEntries);
      } else {
        // there are not info entries, get all the images instead
        fetchImages();
        // and reset info state to an empty array:
        setInfo([]);
      }
    }

    // trigger the fetchData function
    fetchData();
  }, [updateTrigger]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentInfo + 1 < info.length) {
        setCurrentInfo(currentInfo + 1)
      } else {
        setCurrentInfo(0);
        // fetch all the data again to check for new info and images
        setUpdateTrigger(!updateTrigger);
      }

      if (currentImage + 1 < images.length) {
        setCurrentImage(currentImage + 1)
      } else {
        setCurrentImage(0);
      }
    }, window.SLIDESHOW_INTERVAL);
    return () => clearInterval(interval);
  }, [info, images, currentInfo, currentImage, updateTrigger]);

  return (info.length > 0 || images.length > 0) ? (
    <div className="App">
      <Logo />
      <Display
        image={images[currentImage]}
        info={info[currentInfo]}
      />
    </div>
  ) : (
      <div className="App">
        Could not find any data.
      </div>
    );
}

export default App;