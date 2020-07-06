import nats from "node-nats-streaming";

console.clear();

const sc = nats.connect("stub", "abc", {
  url: "http://localhost:4222",
});

sc.on("connect", () => {
  log("Connected");

  sc.publish("ticket:create", JSON.stringify({ title: "Concert" }), () => {
    log("Message published");
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
