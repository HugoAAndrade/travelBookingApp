import { prisma } from "@/lib/prisma";
import TripHeader from "@/app/trips/[tripId]/components/TripHeader";
import TripReservation from "@/app/trips/[tripId]/components/TripReservation";
import TripDescription from "@/app/trips/[tripId]/components/TripDescription";
import TripHighlights from "@/app/trips/[tripId]/components/TripHighlights";
import TripLocation from "@/app/trips/[tripId]/components/TripLocation";

const getTripDetails = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });
  return trip;
};

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
  const trip = await getTripDetails(params.tripId);

  if (!trip) return null;

  return (
    <div className="container mx-auto">
      <TripHeader trip={trip} />
      <TripReservation
        tripId={trip.id}
        pricePerDay={trip.pricePerDay.toNumber()}
        maxGuests={trip.maxGuests}
        tripStartDate={trip.startDate}
        tripEndDate={trip.endDate}
      />
      <TripDescription description={trip.description} />
      <TripHighlights highlights={trip.highlights} />
      <TripLocation
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  );
};

export default TripDetails;
