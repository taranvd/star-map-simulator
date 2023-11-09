import React, { useState, useEffect } from 'react';
import { useTrail, animated } from 'react-spring';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './SkySimulation.css';

const SkySimulation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(10); // Початкова швидкість
  const [blockColors, setBlockColors] = useState(Array(12).fill('black'));

  useEffect(() => {
    if (isAnimating) {
      const animationInterval = setInterval(() => {
        setBlockColors(Array(12).fill('white'));
        setTimeout(() => {
          setBlockColors(Array(12).fill('black'));
        }, 100 / animationSpeed);
      }, 1000 / animationSpeed);

      return () => {
        clearInterval(animationInterval);
      };
    }
  }, [isAnimating, animationSpeed]);

  //* Change slider speed animation
  const handleSpeedChange = value => {
    setAnimationSpeed(value);
  };

  const blockColorAnimations = useTrail(12, {
    from: { backgroundColor: 'grey' },
    to: {
      backgroundColor: isAnimating ? 'white' : 'grey',
    },
    config: { duration: 1000 / animationSpeed },
    reverse: !isAnimating,
  });

  return (
    <div className="sky-simulation">
      <button onClick={() => setIsAnimating(!isAnimating)}>
        {isAnimating ? 'off ⏸️' : 'on ▶️'}
      </button>
      <div>
        <h2>Change speed animation</h2>
        <Slider
          min={10}
          max={50}
          value={animationSpeed}
          onChange={handleSpeedChange}
        />
      </div>
      <div className="controller">
        {blockColors.map((color, index) => (
          <animated.div
            key={index}
            className="controller-block"
            style={blockColorAnimations[index]}
          >
            {index + 1}
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default SkySimulation;
