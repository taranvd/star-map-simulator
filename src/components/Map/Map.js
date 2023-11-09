import React, { useEffect, useRef } from 'react';
import './Map.css';
import * as d3 from 'd3';

const Map = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = '100%'; // Ваша ширина площини
    const height = '100%'; // Ваша висота площини
    const points = []; // Масив для зберігання точок

    // Створіть чорний фон
    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'black');

    // Функція для додавання точок
    const addPoint = (x, y) => {
      points.push({ x, y });

      svg
        .selectAll('circle')
        .data(points)
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 5)
        .attr('fill', 'white');
    };

    // Обробник події для натискання мишки
    svg.on('mousedown', () => {
      const [x, y] = d3.mouse(svgRef.current);
      addPoint(x, y);
    });
  }, []);

  return (
    <div className="full-screen-container">
      <svg className="map" ref={svgRef} width="100%" height="100%">
        {/* Тут будуть відображатися точки */}
      </svg>
    </div>
  );
};

export default Map;
