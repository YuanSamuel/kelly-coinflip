import { useState } from 'react';
import List from '@mui/material/List';
import axios from 'axios';

function Leaderboard() {
  let defaultLeaderboard = {
    Samuel: 100000,
    John: 4000,
    Tyler: 3000,
  };
  const [positions, setPositions] = useState(defaultLeaderboard);

  setInterval(async () => {
    const response = await axios.get('https://k89480.deta.dev/leaderboard');
    console.log(response.data);
    setPositions(response.data);
  }, 2000);

  return (
    <div className='bg-white rounded-xl h-full'>
      <div className='pt-4 overflow-y-auto'>
        <p className='text-center text-teal-500 text-2xl pb-2'>Leaderboard</p>
        <div className='flex flex-col justify-center'>
          <div className='grid gap-4 grid-cols-3 content-center justify-center pb-2'>
            <p className='text-center font-bold text-lg'>Position</p>
            <p className='text-center font-bold text-lg'>Name</p>
            <p className='text-center font-bold text-lg'>Cash</p>
          </div>
          <List>
            {Object.entries(positions).map((position, index) => {
              return (
                <div className='grid gap-6 grid-cols-3 content-center justify-center pb-2'>
                  <p className='text-center'>{index + 1}</p>
                  <p className='text-center'>{position[0]}</p>
                  <p className='text-center'>{position[1]}</p>
                </div>
              );
            })}
          </List>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
