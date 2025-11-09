-- CreateTable
CREATE TABLE "Disease" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Symptom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "diseaseId" INTEGER NOT NULL,
    CONSTRAINT "Challenge_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DiseaseSymptoms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DiseaseSymptoms_A_fkey" FOREIGN KEY ("A") REFERENCES "Disease" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DiseaseSymptoms_B_fkey" FOREIGN KEY ("B") REFERENCES "Symptom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Disease_name_key" ON "Disease"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Symptom_name_key" ON "Symptom"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_date_key" ON "Challenge"("date");

-- CreateIndex
CREATE UNIQUE INDEX "_DiseaseSymptoms_AB_unique" ON "_DiseaseSymptoms"("A", "B");

-- CreateIndex
CREATE INDEX "_DiseaseSymptoms_B_index" ON "_DiseaseSymptoms"("B");
