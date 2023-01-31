import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import axios from 'axios';

function Leaderboard() {
  let defaultLeaderboard = [];
  const [positions, setPositions] = useState(defaultLeaderboard);

  useEffect(() => {
    setInterval(async () => {
      const response = await axios.get(
        'https://kc.itssamuelyuan.repl.co/leaderboard'
      );
      let p = Object.entries(response.data);
      p.sort((a, b) => b[1] - a[1]);
      let count = 0;
      let prev = 0;
      for (let i = 0; i < p.length; i++) {
        if (p[i][1] === prev) {
          p[i].push(count);
        } else {
          p[i].push(++count);
        }
        prev = p[i][1];
      }
      setPositions(p);
      console.log(p);
    }, 2000);
  }, []);

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
            {positions.map((position) => {
              return (
                <div className='grid gap-6 grid-cols-3 content-center justify-center pb-2'>
                  <p className='text-center'>{position[2]}</p>
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
