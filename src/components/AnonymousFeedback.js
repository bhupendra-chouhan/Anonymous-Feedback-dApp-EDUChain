import React, { useState } from "react";
import { ethers, BrowserProvider, Contract } from "ethers";

// Config: Separate ABI and Contract Address
const contractAddress =
  process.env.REACT_APP_EDUCHAIN_DEPLOYED_SMART_CONTRACT_ADDRESS;
const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "feedback",
        type: "string",
      },
    ],
    name: "FeedbackCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "feedback",
        type: "string",
      },
    ],
    name: "createFeedback",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getFeedback",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const AnonymousFeedback = ({ setPubAddress = () => {} }) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackId, setFeedbackId] = useState("");
  const [retrievedFeedback, setRetrievedFeedback] = useState(null);
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
        alert(`Connection failed: ${error.feedback}`);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask to use this dApp.");
    }
  };

  const handleCreateFeedback = async () => {
    if (contract && feedback.trim()) {
      setIsLoading(true);
      try {
        const tx = await contract.createFeedback(feedback);
        await tx.wait();
        alert("Feedback Created successfully!");
        setFeedback("");
      } catch (error) {
        console.error("Error Creating feedback:", error);
        const errorFeedback =
          error?.error?.feedback || error.feedback || "Unknown error.";
        alert("Transaction failed: " + errorFeedback);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please enter a feedback and connect your wallet.");
    }
  };

  const handleRetrieveFeedback = async () => {
    if (contract && feedbackId.trim()) {
      try {
        const id = parseInt(feedbackId);
        const [content, sender] = await contract.getFeedback(id);
        setRetrievedFeedback({ content, sender });
      } catch (error) {
        console.error("Error retrieving feedback:", error);
        alert("Failed to retrieve the feedback. Please check the feedback ID.");
      }
    } else {
      alert("Please enter a valid feedback ID and connect your wallet.");
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
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={connectWallet}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: account ? "#" : "#0fe0a1",
            color: "black",
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

      <section style={{ marginBottom: "20px" }} className="flex gap-3">
        <h2>Create a Feedback</h2>
        <input
          type="text"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "10px",
            border: "2px solid",
          }}
        />
        <button
          onClick={handleCreateFeedback}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "grey",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={isLoading || !account}
        >
          {isLoading ? "Processing..." : "Create Feedback"}
        </button>
      </section>

      <section className="flex gap-3">
        <h2>Retrieve a Feedback</h2>
        <input
          type="number"
          value={feedbackId}
          onChange={(e) => setFeedbackId(e.target.value)}
          placeholder="Enter feedback ID"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "2px solid",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={handleRetrieveFeedback}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "cyan",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={!account}
        >
          Retrieve Feedback
        </button>

      </section>
        {retrievedFeedback && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <p>
              <strong>Feedback:</strong> {retrievedFeedback.content}
            </p>
            <p>
              <strong>Sender:</strong>{" "}
              <a
                href={`https://etherscan.io/address/${retrievedFeedback.sender}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#008CBA" }}
              >
                {retrievedFeedback.sender}
              </a>
            </p>
          </div>
        )}
    </div>
  );
};

export default AnonymousFeedback;
