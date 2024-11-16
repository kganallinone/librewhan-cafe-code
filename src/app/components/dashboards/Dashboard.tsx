import React from "react";

interface DashboardProps {
  highRiskRoads: number;
  totalAccidents: number;
  accidentSeverity: { severe: number; moderate: number; mild: number };
  roadConditions: { good: number; fair: number; poor: number };
}

const Dashboard: React.FC<DashboardProps> = ({
  highRiskRoads,
  totalAccidents,
  accidentSeverity,
  roadConditions,
}) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Road Safety Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* High Risk Roads */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            High Risk Roads
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-red-500 mt-2">
            {highRiskRoads}
          </p>
        </div>

        {/* Total Accidents */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            Total Accidents
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-orange-500 mt-2">
            {totalAccidents}
          </p>
        </div>

        {/* Accident Severity */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            Accident Severity
          </h2>
          <div className="mt-2">
            <p className="text-base md:text-lg">
              Severe:{" "}
              <span className="font-bold text-red-600">
                {accidentSeverity.severe}
              </span>
            </p>
            <p className="text-base md:text-lg">
              Moderate:{" "}
              <span className="font-bold text-yellow-600">
                {accidentSeverity.moderate}
              </span>
            </p>
            <p className="text-base md:text-lg">
              Mild:{" "}
              <span className="font-bold text-green-600">
                {accidentSeverity.mild}
              </span>
            </p>
          </div>
        </div>

        {/* Road Conditions */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            Road Conditions
          </h2>
          <div className="mt-2">
            <p className="text-base md:text-lg">
              Good:{" "}
              <span className="font-bold text-green-600">
                {roadConditions.good}
              </span>
            </p>
            <p className="text-base md:text-lg">
              Fair:{" "}
              <span className="font-bold text-yellow-600">
                {roadConditions.fair}
              </span>
            </p>
            <p className="text-base md:text-lg">
              Poor:{" "}
              <span className="font-bold text-red-600">
                {roadConditions.poor}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
