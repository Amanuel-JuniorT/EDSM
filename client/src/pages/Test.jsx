import React from 'react'
import { useStocksStore } from '../store/useStocksStore';

const Test = () => {

  const { stocks, fetchStocks } = useStocksStore();
  React.useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  console.log({stocks});

  return (
    <div>Test</div>
  )
}

export default Test