import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const sc = nats.connect("stub", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

const options = sc
  .subscriptionOptions()
  .setManualAckMode(true)
  .setDeliverAllAvailable()
  .setDurableName("Accounting-service");

sc.on("connect", () => {
  log("Connected");

  const sub = sc.subscribe(
    "ticket:create",
    "ticket-create-queue-group",
    options,
  );

  sub.on("message", (msg: Message) => {
    log(`Received event #${msg.getSequence()}`);
    log(msg.getData().toString("utf-8"));
    msg.ack();
  });

  sc.on("close", () => {
    log("Connection closed");
    process.exit(1);
  });
});

function log(msg: string) {
  console.info(`Listener: ${msg}`);
}

process.on("SIGINT", () => sc.close());
process.on("SIGTERM", () => sc.close());
