CREATE TABLE IF NOT EXISTS "movement_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"movement_id" uuid NOT NULL,
	"amount" double precision NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "stock" TO "initial_stock";--> statement-breakpoint
ALTER TABLE "movements" DROP CONSTRAINT "movements_product_id_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movement_details" ADD CONSTRAINT "movement_details_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movement_details" ADD CONSTRAINT "movement_details_movement_id_movements_id_fk" FOREIGN KEY ("movement_id") REFERENCES "public"."movements"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "lastname";--> statement-breakpoint
ALTER TABLE "movements" DROP COLUMN IF EXISTS "product_id";--> statement-breakpoint
ALTER TABLE "movements" DROP COLUMN IF EXISTS "amount";--> statement-breakpoint
ALTER TABLE "movements" DROP COLUMN IF EXISTS "stock";--> statement-breakpoint
ALTER TABLE "purchase_details" DROP COLUMN IF EXISTS "total";--> statement-breakpoint
ALTER TABLE "purchases" DROP COLUMN IF EXISTS "total";--> statement-breakpoint
ALTER TABLE "sale_details" DROP COLUMN IF EXISTS "total";--> statement-breakpoint
ALTER TABLE "sales" DROP COLUMN IF EXISTS "total";