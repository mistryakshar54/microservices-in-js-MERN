import { Publisher, Subjects, OrderCancelledEvent } from '@amdevcorp/ticketing-common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
} 