import React, { useState, useEffect } from 'react';
import { useTrail, useSpring, animated } from 'react-spring';
import './SkySimulation.css';

const SkySimulation = () => {
  const [points, setPoints] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(5);

  const handleMapClick = e => {
    if (!isAnimating) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      setPoints([...points, { x, y, opacity: 1, color: 'gray' }]);
    }
  };

  const handleClearPoints = () => {
    setPoints([]);
  };

  const trail = useTrail(points.length, {
    from: { opacity: 0.3, color: 'gray' },
    to: { opacity: 1, color: 'white' },
    config: { duration: 1000 / animationSpeed },
    reverse: !isAnimating,
  });

  const cometSpring = useSpring({
    to: isAnimating
      ? { x: points[0]?.x || 0, y: points[0]?.y || 0 }
      : { x: points[0]?.x || 0, y: points[0]?.y || 0 },
    config: { duration: 1000 / (animationSpeed * 2) },
  });

  useEffect(() => {
    if (isAnimating) {
      let animationInterval;
      let currentIndex = 0;

      const animateComet = () => {
        if (currentIndex < points.length) {
          const nextX = points[currentIndex].x;
          const nextY = points[currentIndex].y;
          cometSpring.to({ x: nextX, y: nextY });
          currentIndex++;
        }
      };

      animationInterval = setInterval(animateComet, animationSpeed * 1000);

      return () => {
        clearInterval(animationInterval);
      };
    }
  }, [isAnimating, points, animationSpeed, cometSpring]);

  return (
    <div className="sky-simulation">
      <button onClick={() => setIsAnimating(!isAnimating)}>
        {isAnimating ? 'Вимкнути Анімацію' : 'Почати Анімацію'}
      </button>
      <button onClick={handleClearPoints}>Очистити точки</button>
      <div>
        <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={animationSpeed}
          onChange={e => setAnimationSpeed(parseInt(e.target.value))}
        />
        <span>Швидкість анімації: {animationSpeed}</span>
      </div>
      <div className="map" onClick={handleMapClick}>
        {trail.map((props, index) => (
          <animated.div
            key={index}
            className="point animated"
            style={{
              top: points[index].y,
              left: points[index].x,
              opacity: props.opacity,
              backgroundColor: props.color,
            }}
          ></animated.div>
        ))}
        {isAnimating && points.length > 0 && (
          <>
            <animated.div
              className="comet"
              style={{
                top: cometSpring.y,
                left: cometSpring.x,
              }}
            ></animated.div>
            <animated.div
              className="comet-trail"
              style={{
                top: cometSpring.y,
                left: cometSpring.x,
                backgroundColor: 'white',
              }}
            ></animated.div>
          </>
        )}
      </div>
    </div>
  );
};

export default SkySimulation;
