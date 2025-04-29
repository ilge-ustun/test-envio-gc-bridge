export function combineNonceAndChainId(nonce: `0x${string}`, chainId: number): `0x${string}` {
  const nonceWithoutPrefix = nonce.slice(4);
  
  if (chainId === 1) {
    return `0x01${nonceWithoutPrefix}`;
  } else if (chainId === 100) {
    return `0x64${nonceWithoutPrefix}`;
  }
  throw new Error(`Unsupported chainId: ${chainId}`);
}