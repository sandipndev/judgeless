-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "photoURL" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
