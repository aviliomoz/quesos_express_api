DO $$ BEGIN
 CREATE TYPE "public"."saleStatusEnum" AS ENUM('pending', 'completed', 'deleted');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "status" SET DATA TYPE saleStatusEnum;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "status" SET DEFAULT 'pending';