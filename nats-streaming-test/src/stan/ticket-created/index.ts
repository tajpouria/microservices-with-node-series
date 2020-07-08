import { StanListener } from "../stanListener";
import * as eventSchema from "./event-schema.json";

export class TicketCreatedListener extends StanListener {
  eventSchema = eventSchema;
  queueGroup: string = "hello";
}
