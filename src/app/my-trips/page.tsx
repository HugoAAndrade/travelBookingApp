"use client";
import UserReservationItem from "@/app/my-trips/components/UserReservationItem";
import Button from "@/components/Button";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyTrips = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/");
    }

    const fetchReservations = async () => {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any).id}/reservations`
      );
      const json = await response.json();

      setReservations(json);
    };

    fetchReservations();
  }, [data?.user, router, status]);

  console.log(reservations);

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl">
        Minhas viagens
      </h1>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <UserReservationItem reservation={reservation} key={reservation.id} />
        ))
      ) : (
        <div className="flex flex-col">
          <p className=" mt-2 font-medium text-primaryDarker">
            Você ainda não tem nenhuma reserva! =(
          </p>
          <Link href="/">
            <Button className="w-full mt-2">Fazer reserva</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
