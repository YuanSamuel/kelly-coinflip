import { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';

function Simulator() {
  const { register, handleSubmit, reset } = useForm();

  const [name, setName] = useState('');
  const [round, setRound] = useState(0);
  const [result, setResult] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [balance, setBalance] = useState(10000);
  const [winPct, setWinPct] = useState(60);

  const onSubmit = async (data) => {
    console.log(data);
    setName(data.name);
    localStorage.setItem('name', data.name);
    setFlipping(true);
    await axios.post(`https://k89480.deta.dev/add-user/${data.name}`);
    const response = await axios.get(
      `https://k89480.deta.dev/curr-amount/${data.name}`
    );
    console.log(response);
    setFlipping(false);
    setRound(1);
  };

  const handleSubmitBet = async (data) => {
    console.log(data);
    setRound(parseInt(round) + 1);
    setFlipping(true);
    const response = await axios.get(
      `https://k89480.deta.dev/update-bet/${name}?bet_amount=${data.bet}`
    );
    console.log(response);
    let newBal = parseInt(response.data);
    setResult(newBal > balance);
    setBalance(newBal);
    setTimeout(() => {
      setFlipping(false);
      setShowResult(true);
    }, 500);
    reset({
      bet: '',
    });
  };

  useEffect(() => {
    let id = localStorage.getItem('name');
    setName(id);
    setRound(parseInt(localStorage.getItem('round')));
    axios
      .get(`https://k89480.deta.dev/curr-amount/${id}`)
      .then(function (response) {
        console.log(response);
      });
  }, []);

  useEffect(() => {
    if (round > 0) {
      console.log(round);
      localStorage.setItem('round', JSON.stringify(round));
    }
  }, [round]);

  useEffect(() => {
    if (showResult) {
      setTimeout(() => {
        setShowResult(false);
      }, 2000);
    }
  }, [showResult]);

  if (name === '' || name === null) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <h2 className='text-center text-5xl font-normal mb-20'>
          Let's Get Started! 🤑
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-row justify-around items-center w-[40%]'
        >
          <label className='text-xl'>Name: </label>
          <input
            className='border-2 rounded-md h-10 text-xl p-2'
            {...register('name')}
          />
          <input
            type='submit'
            className='text-xl rounded-xl px-4 py-1 bg-blue-400 text-white cursor-pointer'
            value='Submit'
          />
        </form>
      </div>
    );
  } else if (round < 21) {
    if (!flipping && !showResult) {
      return (
        <div className='relative flex flex-col justify-center items-center w-full h-full'>
          <p className='absolute top-2 left-2 whitespace-pre-line'>{`${name}\nRound: ${round}/20`}</p>
          <div>
            <h2 className='text-center text-5xl font-normal mb-4'>
              Balance: ${balance}
            </h2>
            <h2 className='text-center text-2xl font-normal mb-20'>
              Win Percent: {winPct}%
            </h2>
          </div>

          <form className='flex flex-col justify-around items-center'>
            <div className='flex flex-row justify-around items-center mb-10'>
              <label className='text-xl mr-4'>Bet Amount: </label>
              <input
                className='border-2 rounded-md h-10 text-xl p-2'
                {...register('bet', { pattern: /^\d+$/ })}
              />
            </div>
            <button
              className='text-xl rounded-xl px-4 py-1 bg-blue-400 text-white cursor-pointer'
              onClick={handleSubmitBet}
            >
              Submit
            </button>
          </form>
        </div>
      );
    } else if (flipping && !showResult) {
      console.log('here now');
      return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <h2 className='text-center text-5xl font-normal mb-20'>
            Submitting...
          </h2>
        </div>
      );
    } else {
      return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
          {result === true && (
            <h2 className='text-center text-5xl font-normal mb-20 text-green-400'>
              Result: Win!
            </h2>
          )}{' '}
          {result === false && (
            <h2 className='text-center text-5xl font-normal mb-20 text-red-400'>
              {'Result: Loss :('}
            </h2>
          )}
          <h3 className='text-xl'>You have ${balance}</h3>
        </div>
      );
    }
  } else {
    return (
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <h2 className='text-center text-5xl font-normal mb-20'>Game End!</h2>
        <h3 className='text-xl'>You ended with ${balance}</h3>
      </div>
    );
  }
}
export default Simulator;
