import { Activity } from "../../../../../model/activityModel";

interface ActivityPageProps {
  activities: Activity[];
}

const ActivitySection = ({ activities }: ActivityPageProps) => {
  return (
    <div className="  min-h-screen">
      <h1 className="text-xl font-bold text-gray-800 mb-6 p-4">
        Activity Page
      </h1>

      <div className=" p-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Activities
        </h2>

        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="p-4 bg-gray-50 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800">
                {activity.title}
              </h3>
              <p className="text-gray-600">{activity.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500 text-sm">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-lg ${
                    activity.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : activity.status === "In Progress"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivitySection;
