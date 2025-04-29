/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  ForeignBridgeErcToNative,
  XDAITransaction,
} from "generated";
import { combineNonceAndChainId } from "./combineNonceAndChainId";
import { getSender } from "./getSender";
import { DAI_ADDRESS, ZERO_ADDRESS } from "./const";


ForeignBridgeErcToNative.UserRequestForAffirmation.handler(async ({ event, context }) => {
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

// before upgrade, the UserRequestForAffirmation event doesn't have nonce
// not working
ForeignBridgeErcToNative.UserRequestForAffirmation.handler(async ({ event, context }) => {
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