DO $$ BEGIN
 CREATE TYPE "public"."movementTypeEnum" AS ENUM('entry', 'output');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "movementTypeEnum" NOT NULL,
	"product_id" uuid NOT NULL,
	"amount" double precision NOT NULL,
	"date" timestamp NOT NULL,
	"description" varchar NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
DROP TABLE "stock_entries";--> statement-breakpoint
ALTER TABLE "sale_details" ALTER COLUMN "amount" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "sale_details" ALTER COLUMN "price" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "sale_details" ALTER COLUMN "discount" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "sale_details" ALTER COLUMN "total" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "order_date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "delivery_date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "payment_date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "total" SET DATA TYPE double precision;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movements" ADD CONSTRAINT "movements_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movements" ADD CONSTRAINT "movements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
