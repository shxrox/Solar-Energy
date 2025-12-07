import { useGetSolarUnitForUserQuery } from "@/lib/redux/query";
import DataCard from "./components/DataCard";
import { useUser } from "@clerk/clerk-react";

const AnomaliesPage = () => {
  const { user, isLoaded } = useUser();

  const { data: solarUnit, isLoading: isLoadingSolarUnit, isError: isErrorSolarUnit, error: errorSolarUnit } = useGetSolarUnitForUserQuery();

  if (isLoadingSolarUnit) {
    return <div>Loading...</div>;
  }

  if (isErrorSolarUnit) {
    return <div>Error: {errorSolarUnit.message}</div>;
  }

  console.log(solarUnit);

  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">{user?.firstName}'s House</h1>
      <p className="text-gray-600 mt-2">
        Monitor anomalies in your solar unit
      </p>
      <div className="mt-8">
        <DataCard solarUnitId={solarUnit._id} />
      </div>
    </main>
  );
};

export default AnomaliesPage;


