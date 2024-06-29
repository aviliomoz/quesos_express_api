DROP TABLE "stock_outputs";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "status" boolean DEFAULT true NOT NULL;