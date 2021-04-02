import { Publisher, Subjects, OrderCreatedEvent } from '@amdevcorp/ticketing-common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
} 