import React, { useState, useEffect } from "react";
import { ethers, BrowserProvider } from "ethers";

const contractAddress = "0xdf3D918C89CaCC9064bE94D3B921c5465F68c3EE";
const contractABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "MessageStored",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    name: "getMessage",
    outputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "address", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "message", type: "string" }],
    name: "storeMessage",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const AnonymousMessage = ({ setPubAddress }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState("");
  const [messageId, setMessageId] = useState("");
  const [retrievedMessage, setRetrievedMessage] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3Provider = new BrowserProvider(window.ethereum);
        const signer = web3Provider.getSigner();
        const contractInstance = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setAccount(accounts[0]);
        setProvider(web3Provider);
        setContract(contractInstance);
        setPubAddress(accounts[0]); // Pass account to parent component if required
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask to use this dApp.");
    }
  };

  const handleStoreMessage = async () => {
    if (contract && message.trim()) {
      try {
        const tx = await contract.storeMessage(message);
        await tx.wait();
        alert("Message stored successfully!");
        setMessage("");
      } catch (error) {
        console.error("Error storing message:", error);
      }
    } else {
      alert("Please enter a message and connect your wallet.");
    }
  };

  const handleRetrieveMessage = async () => {
    if (contract && messageId.trim()) {
      try {
        const id = parseInt(messageId);
        const [content, sender] = await contract.getMessage(id);
        setRetrievedMessage({ content, sender });
      } catch (error) {
        console.error("Error retrieving message:", error);
      }
    } else {
      alert("Please enter a valid message ID and connect your wallet.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Message Storage DApp</h1>
        <button
          onClick={connectWallet}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          {account
            ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </button>
      </header>

      <section style={{ marginBottom: "20px" }}>
        <h2>Store a Message</h2>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={handleStoreMessage}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Store Message
        </button>
      </section>

      <section>
        <h2>Retrieve a Message</h2>
        <input
          type="number"
          value={messageId}
          onChange={(e) => setMessageId(e.target.value)}
          placeholder="Enter message ID"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={handleRetrieveMessage}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Retrieve Message
        </button>

        {retrievedMessage && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <p>
              <strong>Message:</strong> {retrievedMessage.content}
            </p>
            <p>
              <strong>Sender:</strong> {retrievedMessage.sender}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AnonymousMessage;
