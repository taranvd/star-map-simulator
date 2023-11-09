import React, { useState, useEffect } from 'react';
import { useTrail, useSpring, animated } from 'react-spring';
import './SkySimulation.css';

const SkySimulation = () => {
  const [points, setPoints] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [selectedBlock, setSelectedBlock] = useState(null); // Додано стан для виділеного блоку

  const handleMapClick = e => {
    if (!isAnimating && selectedBlock) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      setPoints([
        ...points,
        { x, y, opacity: 1, color: 'gray', block: selectedBlock },
      ]);
    }
  };

  const handleClearPoints = () => {
    // Очищаємо тільки точки, які прив'язані до виділеного блоку
    setPoints(points.filter(point => point.block !== selectedBlock));
  };

  const trail = useTrail(points.length, {
    from: { opacity: 0.3, color: 'gray' },
    to: { opacity: 1, color: 'white' },
    config: { duration: 1000 / animationSpeed },
    reverse: !isAnimating,
  });

  const cometSpring = useSpring({
    to: isAnimating
      ? { x: selectedBlock?.x || 0, y: selectedBlock?.y || 0 }
      : { x: selectedBlock?.x || 0, y: selectedBlock?.y || 0 },
    config: { duration: 1000 / (animationSpeed * 2) },
  });

  const handleBlockClick = block => {
    setSelectedBlock(block);
  };

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
      <div className="controller">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((block, index) => (
          <div
            key={index}
            className={`controller-block ${
              block === selectedBlock ? 'selected' : ''
            }`} // Виділяємо виділений блок
            onClick={() => handleBlockClick(block)}
          >
            {block}
          </div>
        ))}
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
        {isAnimating &&
          selectedBlock &&
          points.some(point => point.block === selectedBlock) && (
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
