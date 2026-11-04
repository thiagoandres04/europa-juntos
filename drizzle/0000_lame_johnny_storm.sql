CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`description` text NOT NULL,
	`amount` integer NOT NULL,
	`person` text NOT NULL,
	`method` text NOT NULL,
	`category` text NOT NULL,
	`date` text NOT NULL,
	`city` text NOT NULL,
	`shared` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`first` text NOT NULL,
	`second` text NOT NULL,
	`budget` integer NOT NULL
);
