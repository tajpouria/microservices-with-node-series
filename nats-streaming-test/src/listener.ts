import nats from "node-nats-streaming";
import { randomBytes } from "crypto";

import { TicketCreatedListener } from "./stan/ticket-created";

console.clear();

const sc = nats.connect("stub", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

sc.on("connect", () => {
  log("Connected");

  const listener = new TicketCreatedListener(sc);

  listener.listen("qg").onMessage((errors, data, msg) => {
    if (errors) console.error(errors);

    console.log(data);

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
