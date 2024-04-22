import { InfoCard } from "@/app/(dashboard)/_components/info-card";
import { CheckCircle, Clock } from "lucide-react";

const StudentDashboard = () => {
  const number = 10;
  return (
    <div className=" p-6 space-y-4">
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={Clock} label="Participated" numberOfItems="number" />
        <InfoCard
          icon={CheckCircle}
          variant="success"
          label="Planning to attend"
          numberOfItems="number "
        />
      </div>
    </div>
  );
};

export default StudentDashboard;
