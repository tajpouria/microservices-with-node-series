import nats from "node-nats-streaming";
import * as ticketCreatedEvent from "./stan/ticket-created/event-schema.json";

console.clear();

const sc = nats.connect("stub", "abc", {
  url: "http://localhost:4222",
});

sc.on("connect", () => {
  log("Connected");

  sc.publish(
    ticketCreatedEvent.subject,
    JSON.stringify({
      id: "123",
      title: "Concert",
      price: 120,
      userId: "2",
      timestamp: Date.now(),
    }),
    () => {
      log("Message published");
    },
  );

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
