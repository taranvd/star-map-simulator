import React, { useState } from 'react';
const Controller = ({ setBlock }) => {
  const [blocks, setBlocks] = useState(Array(12).fill(false));

  const handleBlockClick = block => {
    setBlock(block);
  };
  return (
    <div>
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
    </div>
  );
};

export default Controller;
