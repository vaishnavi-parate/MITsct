import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActionToSprite, deleteAction, updatePosition } from '../redux/spritesSlice.js';
import { Trash } from 'lucide-react';
import { SpriteImage } from './Sprite.js';
import ActionInput from './ActionInput.js'; 
import { Line } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const MidArea = () => {
  const dispatch = useDispatch();
  const selectedSpriteId = useSelector((state) => state.sprites.selectedSpriteId);
  const selectedSprite = useSelector((state) =>
    state.sprites.sprites.find(sprite => sprite.id === selectedSpriteId)
  );

  // State to hold coordinates for plotting
  const [coordinates, setCoordinates] = useState([]);

  // Update coordinates when sprite position changes
  useEffect(() => {
    if (selectedSprite && selectedSprite.position && selectedSprite.position.x !== undefined && selectedSprite.position.y !== undefined) {
      console.log("Sprite updated: ", selectedSprite);
      setCoordinates(prevCoords => [...prevCoords, { x: selectedSprite.position.x, y: selectedSprite.position.y }]);
      console.log("Coordinates updated: ", { x: selectedSprite.position.x, y: selectedSprite.position.y });
    }
  }, [selectedSprite]);

  const handleDrop = (e) => {
    e.preventDefault();
    const actionType = e.dataTransfer.getData('actionType');
    const actionText = e.dataTransfer.getData('text');
    const payload = JSON.parse(e.dataTransfer.getData('payload'));

    if (selectedSpriteId) {
      dispatch(addActionToSprite({ spriteId: selectedSpriteId, actionType, actionText, payload }));

      if (payload.x !== undefined && payload.y !== undefined) {
        console.log("Dropping new action: ", payload);
        dispatch(updatePosition({ spriteId: selectedSpriteId, x: payload.x, y: payload.y }));
        setCoordinates(prevCoords => [...prevCoords, { x: payload.x, y: payload.y }]); // Update coordinates
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Chart data based on sprite coordinates
  const chartData = {
    labels: coordinates.map((_, index) => `Step ${index + 1}`), // Label by action number
    datasets: [
      {
        label: 'Sprite Movement',
        data: coordinates, // {x, y} format for coordinates
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'linear', 
        position: 'bottom',
        title: {
          display: true,
          text: 'X Axis',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Y Axis',
        },
      },
    },
  };

  return (
    <div className="flex-1 h-full overflow-auto bg-blue-500 p-6" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="bg-white rounded-lg shadow-md p-6">
        {selectedSprite ? (
          <>
            <div className='flex gap-4'>
              <h2 className="text-2xl flex font-bold text-gray-800 mb-4">Actions for Selected Sprite</h2>
              <div className='text-sm'><SpriteImage spriteName={selectedSprite.name} styles={{ width: "50px", height: "50px" }} /></div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Actions:</h3>
              <ul className="space-y-2">
                {selectedSprite.actions.map((action, index) => (
                  <li key={index} className="bg-blue-100 text-blue-800 px-3 py-1 flex justify-between align-middle rounded-full text-sm">
                    <ActionInput index={index} action={action} />
                    <button 
                      onClick={(e) => {
                          e.preventDefault();
                          dispatch(deleteAction({ index }));
                      }}
                      className="transition duration-300 hover:bg-gray-200" 
                    >
                      <Trash width={"18px"} color='red' />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Line graph showing sprite movement */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Sprite Movement (X, Y):</h3>
              {coordinates.length > 1 ? (
                <Line data={chartData} options={chartOptions} />
              ) : (
                <p className="text-gray-600">Not enough data to plot movement.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-600 italic mb-6">No sprite selected</p>
        )}
      </div>
    </div>
  );
};

export default MidArea;
