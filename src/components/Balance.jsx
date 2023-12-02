function Balance({ data }) {
  const balance = Number(data?.formatted);
  const symbol = data?.symbol;

  return (
    <div className='balanceContainer'>
      <span className='balanceAmount'>
        ${balance.toLocaleString("en-US")} {symbol}
      </span>
      <span className='balanceTitle'>Your balance of Tether</span>
    </div>
  );
}

export default Balance;
