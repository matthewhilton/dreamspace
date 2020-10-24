BEGIN TRANSACTION;
DROP TABLE IF EXISTS "tags";
CREATE TABLE IF NOT EXISTS "tags" (
	"name"	TEXT NOT NULL UNIQUE,
	"color"	TEXT NOT NULL,
	"used"	INTEGER DEFAULT 0,
	PRIMARY KEY("name")
);
DROP TABLE IF EXISTS "taggedEntries";
CREATE TABLE IF NOT EXISTS "taggedEntries" (
	"entry_id"	INTEGER NOT NULL,
	"tag_id"	INTEGER NOT NULL,
	FOREIGN KEY("entry_id") REFERENCES "entry"("id") ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY("tag_id") REFERENCES "tags"("name") ON UPDATE CASCADE ON DELETE CASCADE
);
DROP TABLE IF EXISTS "entry";
CREATE TABLE IF NOT EXISTS "entry" (
	"id"	INTEGER UNIQUE,
	"title"	TEXT NOT NULL,
	"description"	TEXT,
	"vividness"	INTEGER DEFAULT 0,
	"lucidity"	INTEGER DEFAULT 0,
	"dateRecorded"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "drawings";
CREATE TABLE IF NOT EXISTS "drawings" (
	"id"	INTEGER UNIQUE,
	"height"	INTEGER NOT NULL DEFAULT 0,
	"width"	INTEGER NOT NULL DEFAULT 0,
	"uri"	TEXT NOT NULL,
	"entry_id"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("entry_id") REFERENCES "entry"("id") ON UPDATE CASCADE ON DELETE CASCADE
);
DROP TABLE IF EXISTS "recordings";
CREATE TABLE IF NOT EXISTS "recordings" (
	"id"	INTEGER UNIQUE,
	"length"	INTEGER DEFAULT 0,
	"uri"	TEXT NOT NULL,
	"entry_id"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("entry_id") REFERENCES "entry"("id") ON UPDATE CASCADE ON DELETE CASCADE
);
COMMIT;
