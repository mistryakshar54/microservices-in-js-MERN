import { Publisher, Subjects, OrderCompleteEvent } from '@amdevcorp/ticketing-common';

export class OrderCompletePublisher extends Publisher<OrderCompleteEvent> {
    readonly subject = Subjects.OrderCompleted;
} 