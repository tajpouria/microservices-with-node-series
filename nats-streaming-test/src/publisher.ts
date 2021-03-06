import nats from "node-nats-streaming";
import { TicketCreatePublisher } from "./stan/ticket-created";

console.clear();

const sc = nats.connect("stub", "abc", {
  url: "http://localhost:4222",
});

sc.on("connect", async () => {
  log("Connected");

  const publisher = new TicketCreatePublisher(sc);

  await publisher.publish({
    id: "123",
    title: "Concert",
    price: 120,
    userId: "2",
    timestamp: Date.now(),
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
