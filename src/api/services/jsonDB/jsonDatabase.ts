import fs from "fs";
import path from "path";

export class JSONDatabase<T extends { id: number }> {
  private data: T[];
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = path.resolve(__dirname, filePath);
    this.data = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
  }

  // Save the current state of the data back to the file
  private saveData(): void {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(this.data, null, 2),
      "utf-8"
    );
  }

  // Get all records
  public getAll(): T[] {
    return this.data;
  }

  // Get a single record by ID
  public getById(id: number): T | undefined {
    return this.data.find((item) => item.id === id);
  }

  // Create a new record
  public create(newRecord: Omit<T, "id">): T {
    const newRecordWithId: T = {
      id: Math.max(...this.data.map((item) => item.id)) + 1,
      ...newRecord,
    } as T;
    this.data.push(newRecordWithId);
    this.saveData();
    return newRecordWithId;
  }

  // Update a record by ID
  public updateById(id: number, updatedFields: Partial<T>): T | undefined {
    const recordIndex = this.data.findIndex((item) => item.id === id);
    if (recordIndex !== -1) {
      const updatedRecord = { ...this.data[recordIndex], ...updatedFields };
      this.data[recordIndex] = updatedRecord;
      this.saveData();
      return updatedRecord;
    }
    return undefined;
  }

  // Delete a record by ID
  public deleteById(id: number): boolean {
    const recordIndex = this.data.findIndex((item) => item.id === id);
    if (recordIndex !== -1) {
      this.data.splice(recordIndex, 1);
      this.saveData();
      return true;
    }
    return false;
  }
}
