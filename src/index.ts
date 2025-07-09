import express from 'express';
import user from './Auth/auth.router';
import venue from './Venue/venue.router';
import event from './Event/event.router';
import payment from './Payment/payment.router';
import support from './Support/support.router';
import booking from './Booking/booking.router';

const app = express();

// middleware
app.use(express.json())

// routes
user(app);
venue(app);
event(app);
payment(app);
support(app);
booking(app);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(8081, () => {
  console.log('Server is running on http://localhost:8081');
});

export default app;