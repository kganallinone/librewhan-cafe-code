export interface Activity {
  id: number;
  title: string;
  description: string;
  date: string; // Consider using a Date type if you prefer working with Date objects
  status: "Completed" | "Pending" | "In Progress";
}
