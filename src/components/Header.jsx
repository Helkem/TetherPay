import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  return (
    <header>
      <div className='leftH'>
        <img src='./src/assets/tetherword.svg' alt='logo' className='logo' />
      </div>
      <div className='rightH'>
        <div className='headerItem'>
          <img src='./src/assets/ethlogo.svg' alt='eth' className='eth' />
          Ethereum
        </div>
        <div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
