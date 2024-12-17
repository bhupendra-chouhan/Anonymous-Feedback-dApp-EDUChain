# Anonymous Feedback dApp 🗣️🔒

## Project Description

Anonymous Feedback dApp is a decentralized application that allows users to store and retrieve feedback anonymously on the blockchain. Leveraging the power of Ethereum smart contracts, this platform provides a secure, transparent, and immutable way to share thoughts, suggestions, and insights without revealing personal identities.

## Vision

Our vision is to create an open, transparent feedback mechanism that:
- Protects user privacy
- Ensures data integrity
- Provides a censorship-resistant platform for honest communication
- Enables anonymous yet traceable feedback submissions

## Smart Contract Details

### Contract Overview
- **Contract Name**: FeedbackStorage
- **Contract Address**: 0x4Af9Bf4Cc52b2c08C45007476809461975782eae

### Key Functions
- `createFeedback(string memory feedback)`: Submit an anonymous feedback
  - Returns a unique feedback ID
  - Prevents empty feedback submissions
- `getFeedback(uint256 id)`: Retrieve feedback content and sender address by ID

### Events
- `FeedbackCreated`: Emitted when a new feedback is submitted
  - Includes feedback ID, sender address, and feedback content

## Key Features

🔐 **Anonymity**: Share feedback without compromising personal identity
🔒 **Blockchain Security**: Immutable and tamper-proof feedback storage
🌐 **Decentralized**: No central authority controls or censors feedback
🔢 **Unique Identification**: Each feedback gets a unique ID for reference
📝 **Transparent Tracking**: Sender's address is recorded for accountability

## Future Scope

🚀 Potential Enhancements:
- Implement voting/rating mechanism for feedbacks
- Add category tagging for feedbacks
- Create a frontend dashboard for feedback analytics
- Develop multi-chain support
- Implement access control for feedback retrieval
- Add optional anonymity levels

---

### Setup guide:
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
