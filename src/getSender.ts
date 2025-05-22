import { createPublicClient, http, getAddress } from "viem";
import { mainnet } from "viem/chains";
import { TRANSFER_TOPIC, ZERO_ADDRESS } from "./const";

const RPC_ETHEREUM = process.env.RPC_ETHEREUM;

const client = createPublicClient({
  chain: mainnet,
  transport: http(RPC_ETHEREUM),
});

export async function getSender(txHash: `0x${string}`): Promise<string> {
  try {
    // Get transaction receipt
    console.log(`Getting sender for transaction ${txHash}`);
    const receipt = await client.getTransactionReceipt({ hash: txHash });
    
    if (!receipt) {
      console.log(`No receipt found for transaction ${txHash}`);
      // throw new Error(`No receipt found for transaction ${txHash}`);
      return ZERO_ADDRESS;
    }

    // Find the Transfer event log
    for (const log of receipt.logs) {
      if (log.topics[0] === TRANSFER_TOPIC && log.topics.length > 1 && log.topics[1]) {
        // Extract sender address from topics[1]
        // The address is stored as the last 20 bytes of the 32-byte topic
        // const senderBytes = log.topics[1].slice(26); // Take last 20 bytes

        // The address is stored as bytes 12-32 of the 32-byte topic
        const senderBytes = log.topics[1].slice(24, 64); // Take bytes 12-32 (24-64 in hex string)
        
        const senderAddress = getAddress(`0x${senderBytes}`);
        return senderAddress;
      }
    }

    console.log(`No Transfer event found in transaction ${txHash}`);
    return ZERO_ADDRESS;
    // throw new Error(`No Transfer event found in transaction ${txHash}`);
  } catch (error) {
    console.error(`Error getting sender for transaction ${txHash}:`, error);
    throw new Error(`Error getting sender for transaction ${txHash}: ${error}`);
  }
}
