import React, { useState, useEffect } from 'react';
import { animated } from 'react-spring';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './SkySimulation.css';

const SkySimulation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(10);
  const [activeBlock, setActiveBlock] = useState(0);

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setActiveBlock(prevBlock => (prevBlock + 1) % 12);
      }, 1000 / animationSpeed);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isAnimating, animationSpeed]);

  const handleSpeedChange = value => {
    setAnimationSpeed(value);
  };

  const blocks = Array(12).fill(0);

  return (
    <div className="sky-simulation">
      <button onClick={() => setIsAnimating(!isAnimating)}>
        {isAnimating ? 'off ⏸️' : 'on ▶️'}
      </button>
      <div>
        <h2>Change speed animation</h2>
        <Slider
          min={1}
          max={50}
          value={animationSpeed}
          onChange={handleSpeedChange}
        />
      </div>
      <div className="controller">
        {blocks.map((_, index) => (
          <animated.div
            key={index}
            className="controller-block"
            style={{
              backgroundColor:
                index === activeBlock ? 'white' : 'rgb(48, 48, 48)',
            }}
          >
            {index + 1}
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default SkySimulation;
