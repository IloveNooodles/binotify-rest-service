-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Song" (
    "song_id" SERIAL NOT NULL,
    "judul" VARCHAR(63) NOT NULL,
    "penyanyi_id" INTEGER NOT NULL,
    "audio_path" VARCHAR(255) NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("song_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_penyanyi_id_fkey" FOREIGN KEY ("penyanyi_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
