import nats from "node-nats-streaming";
import { OrderCreatedPublisher, OrderStatus } from "@tajpouria/stub-common";
import { randomBytes } from "crypto";

console.clear();

const sc = nats.connect("stub", "abc", {
  url: "http://localhost:4222",
});

sc.on("connect", async () => {
  log("Connected");

  const publisher = new OrderCreatedPublisher(sc);

  const ea = new Date();
  ea.setSeconds(ea.getSeconds() + 20);

  await publisher.publish({
    id: "order-id",
    expiresAt: ea.toString(),
    status: OrderStatus.Created,
    ticket: {
      userId: Math.random().toString(),
      id: Math.random().toString(),
      title: randomBytes(4).toString("hex"),
      price: 200.1,
      timestamp: Date.now(),
    },
    userId: Math.random().toString(),
    version: 1,
  });

  sc.on("close", () => {
    log("Connection closed");
    process.exit(1);
  });
});

function log(msg: string) {
  console.info(`Publisher: ${msg}`);
}

process.on("SIGINT", () => sc.close());
process.on("SIGTERM", () => sc.close());
