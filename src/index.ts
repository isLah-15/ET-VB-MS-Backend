import express from 'express';
import user from './Auth/auth.router';
import venue from './Venue/venue.router';
import event from './Event/event.router';
import payment from './Payment/payment.router';
import support from './Support/support.router';
import booking from './Booking/booking.router';
import cors from 'cors';


const initilizeApp = () => {

  const app = express();
    app.use(express.json()); //used to parse JSON bodies

    app.use(cors({
    origin:'http://localhost:8081',
    credentials: true
    }));

    // routes
    user(app);
    venue(app);
    event(app);
    payment(app);
    support(app);
    booking(app);


    app.get('/', (req, res) => {
        res.send('Hello, World!');
    })

    return app;

}

const app = initilizeApp();
export default app;