# 📝 EduChain: Anonymous Message dApp

## 🌟 Project Description

EduChain's MessageStorage is a decentralized blockchain application that allows users to anonymously store and retrieve messages on the Ethereum network. By leveraging smart contract technology, this platform provides a secure, transparent, and immutable way to record and share messages.

## 🚀 Vision

The vision behind MessageStorage is to create a decentralized communication platform that:
- Ensures message integrity
- Provides transparency through blockchain technology
- Allows anonymous yet traceable message storage
- Empowers users with complete control over their communications

## 🔗 Contract Details

### Smart Contract Address
0xdf3D918C89CaCC9064bE94D3B921c5465F68c3EE

## 🌈 Key Features

1. **Secure Message Storage**
   - Store messages permanently on the blockchain
   - Each message gets a unique ID
   - Sender's address is recorded with the message

2. **Message Retrieval**
   - Retrieve messages using their unique ID
   - Access message content and sender information
   - Transparent and verifiable message history

3. **Anonymous Messaging**
   - Messages can be stored without revealing personal identity
   - Sender's address is the only traceable information

## 🛠 Technical Specifications

### Contract Functions

- `storeMessage(string memory message)`: 
  - Stores a new message
  - Returns a unique message ID
  - Prevents empty messages
  - Emits a `MessageStored` event

- `getMessage(uint256 id)`: 
  - Retrieves a message by its ID
  - Returns message content and sender's address
  - Validates message ID existence

### Events

- `MessageStored(uint256 id, address indexed sender, string message)`
  - Triggers when a new message is stored
  - Provides real-time notification of message creation

## 🔮 Future Scope

1. **Enhanced Privacy Features**
   - Implement optional message encryption
   - Add message expiration mechanisms
   - Create user-controlled access controls

2. **Scalability Improvements**
   - Support for multi-chain deployment
   - Gas optimization techniques
   - Batch message storage and retrieval

3. **Ecosystem Expansion**
   - Develop frontend interfaces
   - Create developer APIs
   - Build integration libraries for various platforms

---

### Setup guid:
##### 1. Clone this template repository
```
git clone <repo-link>
```
##### 2. Install all the dependencies
```
npm i
or npm --force i
or npm --legacy-peer-deps
```

##### 3. Start the project
```
npm run start
```
