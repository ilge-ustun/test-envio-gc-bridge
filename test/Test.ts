import assert from "assert";
import { 
  TestHelpers,
  ForeignBridgeErcToNative_RelayedMessage
} from "generated";
const { MockDb, ForeignBridgeErcToNative } = TestHelpers;

describe("ForeignBridgeErcToNative contract RelayedMessage event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for ForeignBridgeErcToNative contract RelayedMessage event
  const event = ForeignBridgeErcToNative.RelayedMessage.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("ForeignBridgeErcToNative_RelayedMessage is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await ForeignBridgeErcToNative.RelayedMessage.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualForeignBridgeErcToNativeRelayedMessage = mockDbUpdated.entities.ForeignBridgeErcToNative_RelayedMessage.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedForeignBridgeErcToNativeRelayedMessage: ForeignBridgeErcToNative_RelayedMessage = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      recipient: event.params.recipient,
      value: event.params.value,
      transactionHash: event.params.transactionHash,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualForeignBridgeErcToNativeRelayedMessage, expectedForeignBridgeErcToNativeRelayedMessage, "Actual ForeignBridgeErcToNativeRelayedMessage should be the same as the expectedForeignBridgeErcToNativeRelayedMessage");
  });
});
