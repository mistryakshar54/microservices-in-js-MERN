import { Publisher, Subjects, ExiprationCompleteEvent } from '@amdevcorp/ticketing-common';

export class ExpirationCompletePublisher extends Publisher<ExiprationCompleteEvent> {
    readonly subject = Subjects.ExiprationComplete;
} 