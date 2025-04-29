## Contract

### ForeignBridgeErcToNative

- address [0x4aa42145Aa6Ebf72e164C9bBC74fbD3788045016](https://etherscan.io/address/0x4aa42145Aa6Ebf72e164C9bBC74fbD3788045016)

- The proxy is upgraded on block 22273407: [https://etherscan.io/tx/0xc4db8a77365d4870af65f44232ca728e5e0fd583cde3ba83ba81cac3d77ff89d](https://etherscan.io/tx/0xc4db8a77365d4870af65f44232ca728e5e0fd583cde3ba83ba81cac3d77ff89d)


### ABI for `UserRequestForAffirmation` events:
/abi/ForeignBridgeErcToNative.json
```
  {
      "anonymous":false,
      "inputs":[
         {
            "indexed":false,
            "name":"recipient",
            "type":"address"
         },
         {
            "indexed":false,
            "name":"value",
            "type":"uint256"
         },
         {
            "indexed":false,
            "name":"nonce",
            "type":"bytes32"
         }
      ],
      "name":"UserRequestForAffirmation",
    "type": "event"
  },
  {
      "anonymous":false,
      "inputs":[
         {
            "indexed":false,
            "name":"recipient",
            "type":"address"
         },
         {
            "indexed":false,
            "name":"value",
            "type":"uint256"
         }
      ],
      "name":"UserRequestForAffirmation",
    "type": "event"
  }
  ```

#### Example events

- before upgrade:
https://etherscan.io/tx/0xd81cd1d81e276c8f4c5fea25f5f74824825114f48d971c52bcc42840fe98822d#eventlog

- after upgrade:
https://etherscan.io/tx/0xeb842e8beab442361fad9a152ea63ccd8e4b40b3530f43158d1014309bad154e#eventlog
