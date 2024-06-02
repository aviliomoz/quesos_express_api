CREATE TABLE IF NOT EXISTS "currencies" (
	"code" varchar(3) PRIMARY KEY NOT NULL,
	"country" varchar NOT NULL,
	"name" varchar NOT NULL,
	"symbol" varchar(10) NOT NULL,
	"flag" varchar(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"currency_code" varchar(3) NOT NULL,
	"purchase_tax" smallint DEFAULT 18 NOT NULL,
	"status" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_currency_code_currencies_code_fk" FOREIGN KEY ("currency_code") REFERENCES "public"."currencies"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
