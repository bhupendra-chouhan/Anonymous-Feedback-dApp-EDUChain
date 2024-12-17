import React, { useState } from "react";
import { ethers, BrowserProvider, Contract } from "ethers";

// Config: Separate ABI and Contract Address
const contractAddress =
  process.env.REACT_APP_EDUCHAIN_DEPLOYED_SMART_CONTRACT_ADDRESS;
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

const AnonymousMessage = ({ setPubAddress = () => {} }) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState("");
  const [messageId, setMessageId] = useState("");
  const [retrievedMessage, setRetrievedMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const accountAddress = await signer.getAddress();

        // Create contract instance with signer
        const contractInstance = new Contract(
          contractAddress,
          contractABI,
          signer
        );

        setAccount(accountAddress);
        setContract(contractInstance);
        setPubAddress(accountAddress);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert(`Connection failed: ${error.message}`);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask to use this dApp.");
    }
  };

  const handleStoreMessage = async () => {
    if (contract && message.trim()) {
      setIsLoading(true);
      try {
        // Send the transaction
        const tx = await contract.storeMessage(message);

        // Wait for confirmation
        const receipt = await tx.wait();

        alert("Message stored successfully!");
        setMessage("");
      } catch (error) {
        console.error("Error storing message:", error);
        const errorMessage =
          error?.error?.message || error.message || "Unknown error.";
        alert("Transaction failed: " + errorMessage);
      } finally {
        setIsLoading(false);
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
        alert("Failed to retrieve the message. Please check the message ID.");
      }
    } else {
      alert("Please enter a valid message ID and connect your wallet.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
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
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: account ? "#4CAF50" : "#008CBA",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
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
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={isLoading || !account}
        >
          {isLoading ? "Processing..." : "Store Message"}
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
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#008CBA",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={!account}
        >
          Retrieve Message
        </button>

        {retrievedMessage && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <p>
              <strong>Message:</strong> {retrievedMessage.content}
            </p>
            <p>
              <strong>Sender:</strong>{" "}
              <a
                href={`https://etherscan.io/address/${retrievedMessage.sender}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#008CBA" }}
              >
                {retrievedMessage.sender}
              </a>
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AnonymousMessage;
