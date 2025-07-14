import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { CustomerSupportTable, TICustomerSupport } from "../Drizzle/schema";

//create customer support service
export const createCustomerSupportService = async (ticket: any) => {
    const inserted = await db.insert(CustomerSupportTable).values(ticket).returning();
    if (inserted) {
        return inserted;
    }
    return null;
};
    
//get all customer support tickets with user details
export const getAllCustomerSupportService = async () => {
    const tickets = await db.query.CustomerSupportTable.findMany({
        with: {
            user: true
        }
    });

    if (tickets.length === 0) {
        return "No customer support tickets found";
    }
    return tickets;
};  

//get customer support ticket by id with user details
export const getCustomerSupportByIdService = async (ticketId: number) => {
    const ticket = await db.query.CustomerSupportTable.findFirst({
        where: eq(CustomerSupportTable.ticketId, ticketId),
        with: {
            user: true
        }
    });
    return ticket ?? null;
};

//update customer support by Id service
export const updateCustomerSupportByIdService = async (ticketId: number, ticket: TICustomerSupport) => {
  const updated = await db.update(CustomerSupportTable)
    .set({ ...ticket, updatedAt: new Date().toISOString() }) // Ensure timestamp is valid
    .where(eq(CustomerSupportTable.ticketId, ticketId))
    .returning();

  return updated[0]; 
};



//delete customer support ticket service by Id
export const deleteCustomerSupportService = async (ticketId: number) => {
    const deleted = await db.delete(CustomerSupportTable)
        .where(eq(CustomerSupportTable.ticketId, ticketId)).returning();
    if (deleted.length === 0) {
        return "Customer support ticket not found";
    }
    return "Customer support ticket deleted successfully";
}