import Leaderboard from './components/Leaderboard';
import Simulator from './components/Simulator';
import { Helmet } from 'react-helmet';

import './App.css';

function App() {
  return (
    <div className='flex flex-col bg-slate-100 min-h-screen'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>UCF Kelly Coinflip Sim</title>
        <link rel='canonical' href='https://ucfkcflip.vercel.app' />
        <meta property="og:title" content="UCF Kelly Coinflip Simulator"></meta>
        <meta property="description" content="Biased Coinflip Pitch"></meta>
      </Helmet>
      <header className='p-5 font-bold text-xl bg-emerald-600 text-white text-center'>
        UCF Kelly Coinflip Sim
      </header>
      <div className='flex flex-row mx-2.5 mt-5 mb-10 justify-around min-h-full flex-auto'>
        <div className='w-[75%] p-5 bg-white rounded-xl 23min-h-full'>
          <Simulator />
        </div>
        <div className='w-[20%] '>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}

export default App;
