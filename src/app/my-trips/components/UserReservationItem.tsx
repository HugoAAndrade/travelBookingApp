import Button from "@/components/Button";
import { Prisma } from "@prisma/client";
import format from "date-fns/format";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-toastify";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
  fetchReservations: () => void;
}

const UserReservationItem = ({
  reservation,
  fetchReservations,
}: UserReservationItemProps) => {
  const { trip } = reservation;

  const handleDeleteClick = async () => {
    const res = await fetch(`/api/trips/reservation/${reservation.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return toast.error("Ocorreu um erro ao cancelar a reserva!");
    }
    toast.success("Reserva cancelada com sucesso!", {
      position: "bottom-center",
    });
    fetchReservations();
  };

  return (
    <div>
      <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip.coverImage}
              fill
              style={{ objectFit: "cover" }}
              alt={trip.name}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary underline">
                {trip.location}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 text-primaryDarker">
          <h3 className="text-sm font-medium">Data</h3>
          <div className="flex gap-1">
            <p className="text-sm">
              {format(new Date(reservation.startDate), "dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
            {" - "}
            <p className="text-sm">
              {format(new Date(reservation.endDate), "dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>
          <h3 className="text-sm font-medium text-primaryDarker mt-5">
            Hóspedes
          </h3>
          <p className="text-sm pb-5">{reservation.guests} hóspedes</p>
          <h3 className="font-medium text-primaryDarker mt-3 pt-5 border-t border-solid border-grayLighter">
            Informações sobre o preço
          </h3>
          <div className="flex justify-between mt-2">
            <p className="text-primaryDarker text-sm">Total: </p>
            <p className="font-medium text-sm">
              R$ {Number(reservation.totalPaid)}
            </p>
          </div>
          <Button onClick={handleDeleteClick} className="mt-5" variant="danger">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserReservationItem;
