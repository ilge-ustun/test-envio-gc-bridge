/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  ForeignBridgeErcToNative,
  XDAITransaction,
  // DAI,
  Transfer,
  ERC20,
} from "generated";
import { combineNonceAndChainId } from "./combineNonceAndChainId";
import { getSender } from "./getSender";
import { DAI_ADDRESS, ZERO_ADDRESS } from "./const";


//-------------------------
// Foreign > Home
//-------------------------
// The bridging operation is initiated in foreign
// event UserRequestForAffirmation is emitted.

// before upgrade the UserRequestForAffirmation event doesn't have nonce
ForeignBridgeErcToNative.UserRequestForAffirmation1.handler(async ({ event, context }) => {
  if (event.block.number >= 22273407) {
    return;
  }

  const txHash = event.transaction.hash;
  const value = event.params.value;
  const receiver = event.params.recipient;
  const sender = await getSender(txHash as `0x${string}`);

  // discard transfers from 0x
  if (sender == ZERO_ADDRESS) {
    return;
  }
  
  const transaction: XDAITransaction = {
    id: txHash,
    messageId: txHash,
    transactionHash: txHash,
    bridgeName: "XDAI",
    initiator: sender,
    initiatorAmount: value,
    initiatorNetwork: "gnosis",
    initiatorToken: DAI_ADDRESS,
    receiver: receiver,
    receiverAmount: value,
    receiverNetwork: "gnosis",
    receiverToken: DAI_ADDRESS,
    timestamp: BigInt(event.block.timestamp),
  }

  context.XDAITransaction.set(transaction);
});

ForeignBridgeErcToNative.UserRequestForAffirmation2.handler(async ({ event, context }) => {
  if (event.block.number < 22273407) {
    return;
  }

  const nonceWithChainId = combineNonceAndChainId(event.params.nonce as `0x${string}`, 1);

  const txHash = event.transaction.hash;
  const value = event.params.value;
  const receiver = event.params.recipient;
  const sender = await getSender(txHash as `0x${string}`);

  // discard transfers from 0x
  if (sender == ZERO_ADDRESS) {
    return;
  }
  
  const transaction: XDAITransaction = {
    id: nonceWithChainId,
    messageId: nonceWithChainId,
    transactionHash: txHash,
    bridgeName: "XDAI",
    initiator: sender,
    initiatorAmount: value,
    initiatorNetwork: "gnosis",
    initiatorToken: DAI_ADDRESS,
    receiver: receiver,
    receiverAmount: value,
    receiverNetwork: "gnosis",
    receiverToken: DAI_ADDRESS,
    timestamp: BigInt(event.block.timestamp),
  }

  context.XDAITransaction.set(transaction);
});

//-------------------------
// Home > Foreign
//-------------------------
// This event is triggered when the user receives the funds on the foreign chain.
// Note that the bridging operation was initiated in home.
ForeignBridgeErcToNative.RelayedMessage.handler(async ({ event, context }) => {
  let txHashOrNonce = event.params.transactionHash;
  // let txHashOrNonceString = txHashOrNonce;

  if (txHashOrNonce.startsWith("0x00000000")) {
    txHashOrNonce = combineNonceAndChainId(txHashOrNonce as `0x${string}`, 100);
  }

  const timestamp = event.block.timestamp;

  const transaction: XDAITransaction = {
    id: txHashOrNonce,
    messageId: txHashOrNonce,
    transactionHash: event.transaction.hash,
    bridgeName: "XDAI",
    initiator: ZERO_ADDRESS,
    initiatorAmount: event.params.value,
    initiatorNetwork: "gnosis",
    initiatorToken: ZERO_ADDRESS,
    receiver: event.params.recipient,
    receiverAmount: event.params.value,
    receiverNetwork: "gnosis",
    receiverToken: DAI_ADDRESS,
    timestamp: BigInt(event.block.timestamp),
    // transaction.execution = execution.id;  
  }

  context.XDAITransaction.set(transaction);
});

const BRIDGES = [
  "0x4aa42145Aa6Ebf72e164C9bBC74fbD3788045016",
  "0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e"
]

ERC20.Transfer.handler(async ({ event, context }) => {
  const txHash = event.transaction.hash;
  const value = event.params.wad;
  const receiver = event.params.dst;
  const sender = event.params.src;

  const transfer: Transfer = {
    id: txHash,
    transactionHash: txHash,
    timestamp: BigInt(event.block.timestamp),
    bridgeName: "XDAI",
    sender: sender,
    amount: value,
    token: DAI_ADDRESS,
  }

  context.Transfer.set(transfer);
}, {
  wildcard: true,
  eventFilters: [{ to:  BRIDGES}],
})