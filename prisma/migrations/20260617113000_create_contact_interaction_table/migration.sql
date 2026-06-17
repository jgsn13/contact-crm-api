-- CreateTable
CREATE TABLE "contact_interaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "occurredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "contactId" TEXT NOT NULL,
    CONSTRAINT "contact_interaction_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
