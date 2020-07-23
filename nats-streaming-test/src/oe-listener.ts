import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { OrderExpiredListener } from "@tajpouria/stub-common";

console.clear();

const sc = nats.connect("stub", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

sc.on("connect", () => {
  log("Connected");

  const listener = new OrderExpiredListener(sc);

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
