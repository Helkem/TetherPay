import { Input } from "antd";
import Button from "./Button";
import { useState } from "react";
import { useAccount, usePrepareContractWrite } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useContractWrite } from "wagmi";
import useDebounce from "../hooks/useDebounce.js";
import ABI from "../abi.json";

function TransactionForm({ userBalance }) {
  const [amount, setAmount] = useState(0);
  const [receiverAddress, setReceiverAddress] = useState("");
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const isValidEthAddress = /^0x[0-9A-Fa-f]{40}$/i.test(receiverAddress);
  const isValidAmount = isConnected && userBalance < amount;
  const isButtonDisabled = isValidAmount || !isValidEthAddress;
  const debouncedSendAmount = useDebounce(amount, 500);
  const debouncedReceiver = useDebounce(receiverAddress, 500);
  const tetherContract = "0xdac17f958d2ee523a2206206994597c13d831ec7";

  const { config } = usePrepareContractWrite({
    address: tetherContract,
    abi: ABI,
    chainId: 1,
    functionName: "transfer",
    args: [debouncedReceiver, debouncedSendAmount],
    enabled: Boolean(debouncedSendAmount),
  });

  const { write } = useContractWrite(config);

  function handleTransaction() {
    write?.();
  }

  return (
    <div className='formBox'>
      <div className='formHeading'>
        <span className='formTitles'>Send Tether</span>
        <img src='/tethernewlogo.svg' className='tetherLogo' />
      </div>
      <div className='formInputs'>
        <span className='labels'>Amount to send:</span>
        <Input
          type='number'
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          status={isValidAmount ? "error" : ""}
        />
        <span className='labels'>Sending to:</span>
        <Input
          type='text'
          placeholder='Reciever'
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
          status={isValidEthAddress ? "" : "error"}
        />
      </div>
      <div className='buttonContainer'>
        {isConnected ? (
          <Button disabled={isButtonDisabled} onClick={handleTransaction}>
            Send Transaction
          </Button>
        ) : (
          <Button onClick={openConnectModal}>Connect Wallet</Button>
        )}
      </div>
    </div>
  );
}

export default TransactionForm;
