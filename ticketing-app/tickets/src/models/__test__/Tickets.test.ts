import { Ticket } from '../Tickets';

it('implements concurrency control', async(done) => {
    const ticket = Ticket.buildTicket({
        title : 'Sample',
        price : 25,
        userId : 'Aks'
    })
    await ticket.save();

    const firstTicketInstance  = await Ticket.findById(ticket.id);
    const secondTicketInstance = await Ticket.findById(ticket.id);

    firstTicketInstance!.set({ price : 10 });
    secondTicketInstance!.set({ price : 20 });

    await firstTicketInstance!.save();
    
    try{
        await secondTicketInstance!.save();
    }
    catch(ex){
        done();
        return;
    }
    throw new Error("This is concurrency pass err");
    
});

it('increments ticket version on saving' , async () => {
    const ticket = Ticket.buildTicket({
        title : 'Sample',
        price : 25,
        userId : 'Aks'
    })
    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
})