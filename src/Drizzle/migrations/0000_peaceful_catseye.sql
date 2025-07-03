CREATE TABLE "bookings" (
	"booking_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"event_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"total_amount" integer NOT NULL,
	"booking_status" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer_support" (
	"ticket_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"subject" text NOT NULL,
	"description" text NOT NULL,
	"status" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"event_id" serial PRIMARY KEY NOT NULL,
	"event_name" text NOT NULL,
	"venue_id" integer NOT NULL,
	"category" text NOT NULL,
	"event_date" date NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"description" text NOT NULL,
	"ticket_price" integer NOT NULL,
	"tickets_total" integer NOT NULL,
	"tickets_available" integer NOT NULL,
	"image_url" varchar(255) NOT NULL,
	"tickets_sold" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"payment_id" serial PRIMARY KEY NOT NULL,
	"booking_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"transaction_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"payment_status" text NOT NULL,
	"payment_method" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password" varchar(255) NOT NULL,
	"contact_phone" integer NOT NULL,
	"address" varchar(255) NOT NULL,
	"role" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "venues" (
	"venue_id" serial PRIMARY KEY NOT NULL,
	"venue_name" text NOT NULL,
	"address" integer NOT NULL,
	"capacity" integer NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_event_id_events_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("event_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_support" ADD CONSTRAINT "customer_support_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_venue_id_venues_venue_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("venue_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_bookings_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;