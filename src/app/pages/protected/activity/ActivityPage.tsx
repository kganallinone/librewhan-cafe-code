import ActivitySection from "./sub-components/Acititvity";
import { Activity } from "../../../../model/activityModel";

const ActivityPage = () => {
  const activities: Activity[] = [
    {
      id: 1,
      title: "Accident at Main St.",
      description: "A collision occurred between two vehicles at Main St.",
      date: "2024-08-23T12:00:00Z",
      status: "Completed",
    },
    {
      id: 2,
      title: "Road Maintenance on Elm St.",
      description: "Ongoing road maintenance work at Elm St.",
      date: "2024-08-24T09:00:00Z",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Safety Inspection at Maple Ave.",
      description: "Safety inspection scheduled for Maple Ave.",
      date: "2024-08-25T10:00:00Z",
      status: "Pending",
    },
  ];

  return <ActivitySection activities={activities} />;
};

export default ActivityPage;
