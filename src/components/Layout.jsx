import { useAccount, useBalance } from "wagmi";
import Balance from "./Balance";
import Header from "./Header";
import TransactionForm from "./TransactionForm";
import { useEffect, useState } from "react";
import Footer from "./Footer.jsx";

function Layout() {
  const { address, isConnected } = useAccount();
  const tetherErcAdd = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const { data } = useBalance({
    address: address,
    token: tetherErcAdd,
  });

  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    setUserBalance(Number(data?.formatted));
  }, [data]);

  return (
    <div className='App'>
      <Header />
      <div className='mainWindow'>
        {isConnected ? <Balance data={data} /> : ""}
        <TransactionForm userBalance={userBalance} />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
