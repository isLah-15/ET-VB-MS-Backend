import db from "./db";
import { BookingTable, CustomerSupportTable, EventTable, PaymentTable, UserTable, VenueTable } from "./schema"

async function seed() {
    console.log("Seeding to database started...")

    // Seed Users
await db.insert(UserTable).values([
  {
    firstName: "Alice",
    lastName: "Wambui",
    email: "alice@example.com",
    password: "1234567",
    contactPhone: 701234567,
    address: "Nairobi",
    role: "user",
    isVerified: true
  },
  {
    firstName: "Brian",
    lastName: "Otieno",
    email: "brian@example.com",
    password: "1234567",
    contactPhone: 712345678,
    address: "Kisumu",
    role: "admin",
    isVerified: false
  },
  {
    firstName: "Cynthia",
    lastName: "Mutua",
    email: "cynthia@example.com",
    password: "1234567",
    contactPhone: 723456789,
    address: "Mombasa",
    role: "user",
    isVerified: true
  },
  {
    firstName: "David",
    lastName: "Mwangi",
    email: "david@example.com",
    password: "1234567",
    contactPhone: 734567890,
    address: "Nakuru",
    role: "user",
    isVerified: false
  },
  {
    firstName: "Esther",
    lastName: "Kariuki",
    email: "esther@example.com",
    password: "1234567",
    contactPhone: 745678901,
    address: "Eldoret",
    role: "admin",
    isVerified: true
  },
  {
    firstName: "Felix",
    lastName: "Njenga",
    email: "felix@example.com",
    password: "1234567",
    contactPhone: 756789012,
    address: "Thika",
    role: "user",
    isVerified: true
  },
  {
    firstName: "Grace",
    lastName: "Njeri",
    email: "grace@example.com",
    password: "1234567",
    contactPhone: 767890123,
    address: "Machakos",
    role: "user",
    isVerified: false
  },
  {
    firstName: "Henry",
    lastName: "Ochieng",
    email: "henry@example.com",
    password: "1234567",
    contactPhone: 778901234,
    address: "Nyeri",
    role: "user",
    isVerified: true
  },
  {
    firstName: "Irene",
    lastName: "Chebet",
    email: "irene@example.com",
    password: "1234567",
    contactPhone: 789012345,
    address: "Kericho",
    role: "admin",
    isVerified: true
  },
  {
    firstName: "James",
    lastName: "Barasa",
    email: "james@example.com",
    password: "1234567",
    contactPhone: 790123456,
    address: "Kakamega",
    role: "user",
    isVerified: false
  }
]);

// Seed Venues
await db.insert(VenueTable).values([
  { venueName: "KICC Grand Hall", address: 101, capacity: 3000 },
  { venueName: "Mombasa Convention Center", address: 202, capacity: 1500 },
  { venueName: "Kisumu Lakeside Arena", address: 303, capacity: 2000 },
  { venueName: "Nakuru Showgrounds", address: 404, capacity: 2500 },
  { venueName: "Eldoret Sports Club", address: 505, capacity: 1800 },
  { venueName: "Machakos People's Park", address: 606, capacity: 2200 },
  { venueName: "Nyayo National Stadium", address: 707, capacity: 3500 },
  { venueName: "Sarova Whitesands Ballroom", address: 808, capacity: 1200 },
  { venueName: "Thika Community Hall", address: 909, capacity: 900 },
  { venueName: "Westlands Open Grounds", address: 1001, capacity: 2700 },
]);

// Seed Events
await db.insert(EventTable).values([
  {eventName: "Urban Culture Fest", venueId: 1, category: "Music", eventDate: "2025-08-15", startTime: "16:00", endTime: "22:00", description: "Experience Nairobi's vibrant music and dance culture.", ticketPrice: 1500, ticketsTotal: 1000, ticketsAvailable: 700, imageUrl: "https://example.com/images/event1.jpg", ticketsSold: 300, isActive: true},
  {eventName: "Startup Connect Kenya", venueId: 2, category: "Tech", eventDate: "2025-09-01", startTime: "10:00", endTime: "17:00", description: "Tech innovators and startups networking summit.", ticketPrice: 2500, ticketsTotal: 500, ticketsAvailable: 400, imageUrl: "https://example.com/images/event2.jpg", ticketsSold: 100, isActive: true},  
  {eventName: "Coastal Film Week", venueId: 3, category: "Film", eventDate: "2025-08-20", startTime: "12:00", endTime: "20:00", description: "Showcasing the best of Kenyan coastal cinema.", ticketPrice: 1000, ticketsTotal: 300, ticketsAvailable: 150, imageUrl: "https://example.com/images/event3.jpg", ticketsSold: 150, isActive: true},
  {eventName: "Nakuru Food Carnival", venueId: 4, category: "Food", eventDate: "2025-08-28", startTime: "11:00", endTime: "18:00", description: "Taste your way through Kenya's best dishes and treats.", ticketPrice: 800, ticketsTotal: 1200, ticketsAvailable: 1100, imageUrl: "https://example.com/images/event4.jpg", ticketsSold: 100, isActive: true},
  {eventName: "Eldoret Marathon Meet", venueId: 5, category: "Sports", eventDate: "2025-09-10", startTime: "06:00", endTime: "12:00", description: "Annual elite marathon with local and international athletes.", ticketPrice: 500, ticketsTotal: 2000, ticketsAvailable: 1800, imageUrl: "https://example.com/images/event5.jpg", ticketsSold: 200, isActive: true},
  {eventName: "Machakos Arts & Crafts", venueId: 6, category: "Art", eventDate: "2025-10-05", startTime: "09:00", endTime: "16:00", description: "Handmade art and crafts fair with live demos.", ticketPrice: 1200, ticketsTotal: 600, ticketsAvailable: 500, imageUrl: "https://example.com/images/event6.jpg", ticketsSold: 100, isActive: true},
  {eventName: "Nyayo Gospel Concert", venueId: 7, category: "Music", eventDate: "2025-08-22", startTime: "14:00", endTime: "20:00", description: "Top gospel artists from across Africa perform live.", ticketPrice: 1300, ticketsTotal: 1500, ticketsAvailable: 900, imageUrl: "https://example.com/images/event7.jpg", ticketsSold: 600, isActive: true},
  {eventName: "Coast Business Expo", venueId: 8, category: "Business", eventDate: "2025-09-30", startTime: "08:30", endTime: "17:00", description: "Empowering SMEs through exhibits and panels.", ticketPrice: 1800, ticketsTotal: 800, ticketsAvailable: 550, imageUrl: "https://example.com/images/event8.jpg", ticketsSold: 250, isActive: true},
  {eventName: "Thika Laughs Night", venueId: 9, category: "Comedy", eventDate: "2025-08-18", startTime: "19:00", endTime: "22:00", description: "An unforgettable evening of comedy with top acts.", ticketPrice: 900, ticketsTotal: 400, ticketsAvailable: 300, imageUrl: "https://example.com/images/event9.jpg", ticketsSold: 100, isActive: true},
  {eventName: "Green Futures Conference", venueId: 10, category: "Environment", eventDate: "2025-11-12", startTime: "09:00", endTime: "15:00", description: "Sustainability experts share insights for a greener future.", ticketPrice: 1000, ticketsTotal: 1000, ticketsAvailable: 750, imageUrl: "https://example.com/images/event10.jpg", ticketsSold: 250, isActive: true}
  ])


    // Seed Bookings
await db.insert(BookingTable).values([
  { userId: 1, eventId: 1, quantity: 2, totalAmount: 4000, bookingStatus: "confirmed" },
  { userId: 2, eventId: 2, quantity: 1, totalAmount: 2000, bookingStatus: "pending" },
  { userId: 3, eventId: 3, quantity: 3, totalAmount: 6000, bookingStatus: "cancelled" },
  { userId: 4, eventId: 4, quantity: 2, totalAmount: 4000, bookingStatus: "confirmed" },
  { userId: 5, eventId: 5, quantity: 1, totalAmount: 2000, bookingStatus: "pending" },
  { userId: 6, eventId: 6, quantity: 4, totalAmount: 8000, bookingStatus: "confirmed" },
  { userId: 7, eventId: 7, quantity: 2, totalAmount: 4000, bookingStatus: "cancelled" },
  { userId: 8, eventId: 8, quantity: 1, totalAmount: 2000, bookingStatus: "confirmed" },
  { userId: 9, eventId: 9, quantity: 3, totalAmount: 6000, bookingStatus: "pending" },
  { userId: 10, eventId: 10, quantity: 2, totalAmount: 4000, bookingStatus: "confirmed" },
]);

// Seed Payments
await db.insert(PaymentTable).values([
  { bookingId: 1, userId: 1, transactionId: 10001, amount: 4000, paymentStatus: "completed", paymentMethod: "m_pesa" },
  { bookingId: 2, userId: 3, transactionId: 10002, amount: 2000, paymentStatus: "pending", paymentMethod: "credit_card" },
  { bookingId: 3, userId: 2, transactionId: 10003, amount: 6000, paymentStatus: "failed", paymentMethod: "paypal" },
  { bookingId: 4, userId: 4, transactionId: 10004, amount: 4000, paymentStatus: "completed", paymentMethod: "m_pesa" },
  { bookingId: 5, userId: 5, transactionId: 10005, amount: 2000, paymentStatus: "pending", paymentMethod: "credit_card" },
  { bookingId: 6, userId: 6, transactionId: 10006, amount: 8000, paymentStatus: "completed", paymentMethod: "paypal" },
  { bookingId: 7, userId: 7, transactionId: 10007, amount: 4000, paymentStatus: "failed", paymentMethod: "credit_card" },
  { bookingId: 8, userId: 8, transactionId: 10008, amount: 2000, paymentStatus: "completed", paymentMethod: "m_pesa" },
  { bookingId: 9, userId: 9, transactionId: 10009, amount: 6000, paymentStatus: "pending", paymentMethod: "paypal" },
  { bookingId: 10, userId: 10, transactionId: 10010, amount: 4000, paymentStatus: "completed", paymentMethod: "m_pesa" },
]);

// Seed Customer Support Tickets
await db.insert(CustomerSupportTable).values([
  { userId: 1, subject: "Login Issue", description: "I can't log into my account.", status: "open" },
  { userId: 2, subject: "Payment Failed", description: "My payment didn't go through but money was deducted.", status: "in_progress" },
  { userId: 3, subject: "Event Cancelled", description: "I booked an event but it was cancelled. How do I get a refund?", status: "resolved" },
  { userId: 4, subject: "Profile Update Error", description: "Unable to update my contact phone number.", status: "open" },
  { userId: 5, subject: "Wrong Booking", description: "I booked the wrong event. Can I change it?", status: "resolved" },
  { userId: 6, subject: "App Crash", description: "The app crashes when I try to view my tickets.", status: "in_progress" },
  { userId: 7, subject: "Verification Issue", description: "My email is not verifying even after clicking the link.", status: "open" },
  { userId: 3, subject: "Refund Not Received", description: "I was told a refund was processed but I haven’t received it.", status: "in_progress" },
  { userId: 1, subject: "Ticket Not Downloading", description: "I'm unable to download my ticket after payment.", status: "resolved" },
  { userId: 2, subject: "Account Deletion", description: "I want to delete my account permanently.", status: "open" },
]);

  console.log("Seeding to database completed successfully.");
    process.exit(0); // 0 means success
}

seed().catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1); // 1 means an error occurred
})