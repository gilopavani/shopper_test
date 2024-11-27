import { SelectRouteForm } from "../../components/Forms/SelectRote/Index";
import { useEstimate } from "../../hooks/Api/useEstimate";
import { toast } from "react-toastify";
import { EstimateModel } from "../../models/estimate.model";
import { useEffect, useState } from "react";
import { DirectionsResponse } from "../../models/estimateResponse.model";
import { ListDrivers } from "../../components/ListDrivers/Index";
import { useConfirm } from "../../hooks/Api/useConfirm";
import {
  ContructedRaceApprovalPointsModel,
  RaceApprovalPointsModel,
} from "../../models/confirm.model";
import { useNavigate } from "react-router-dom";
const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function Home() {
  const [route, setRoute] = useState<{ lat: number; lng: number }[]>([]);
  const [origin, setOrigin] = useState<string>();
  const [destination, setDestination] = useState<string>();
  const [data, setData] = useState<DirectionsResponse>();
  const [mapURL, setMapURL] = useState<string>();
  const [selectedRoute, setSelectedRoute] =
    useState<ContructedRaceApprovalPointsModel>();
  const navigate = useNavigate();

  const { mutate, isPending } = useEstimate({
    customSuccess: (data) => {
      toast.success("Estimativa realizada com sucesso");
      setData(data);

      setOrigin(`${data.origin.latitude},${data.origin.longitude}`);
      setDestination(
        `${data.destination.latitude},${data.destination.longitude}`
      );

      const routePoints = data.routeResponse.routes[0].legs[0].steps.map(
        (step) => ({
          lat: step.end_location.lat,
          lng: step.end_location.lng,
        })
      );
      setRoute(routePoints);
    },
    customError: (error) => {
      console.log(error.response.data.error_description);
      toast.error(error.response.data.error_description);
    },
  });

  const { mutate: confirmEstimate, isPending: inPendingEstimate } = useConfirm({
    customSuccess: (data) => {
      toast.success("Corrida confirmada com sucesso");
      navigate(
        `/historico/${
          selectedRoute?.customer_id
            ? "?customer_id=" + selectedRoute?.customer_id
            : ""
        }`
      );
    },
    customError: (error) => {
      console.log(error.response.data.error_description);
      toast.error(error.response.data.error_description);
    },
  });

  useEffect(() => {
    if (data) {
      // https://developers.google.com/maps/documentation/maps-static/overview?hl=pt-br
      const path = route.map((point) => `${point.lat},${point.lng}`).join("|");
      const mapURL = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=color:0x0000ff|weight:5|${path}&markers=color:green&key=${googleApiKey}`;
      setMapURL(mapURL);
    }
  }, [data]);

  const handleEstimate = (data: EstimateModel) => {
    const route: ContructedRaceApprovalPointsModel = {
      origin: data.origin,
      destination: data.destination,
      customer_id: data.customer_id,
    };
    setSelectedRoute(route);
    mutate(data);
  };
  const handleConfirm = (
    driverId: number,
    driverName: string,
    price: number
  ) => {
    if (
      !selectedRoute ||
      !selectedRoute.customer_id ||
      !selectedRoute.origin ||
      !selectedRoute.destination
    ) {
      toast.error("Dados da rota incompletos");
      return;
    }

    const routeData: RaceApprovalPointsModel = {
      ...selectedRoute,
      distance: data?.distance || 0,
      duration: data?.duration || "",
      value: price,
      driver: {
        id: driverId,
        name: driverName,
      },
    };
    console.log(routeData);
    confirmEstimate(routeData);
  };
  return (
    <div className="h-full w-full flex px-10 py-10 justify-center items-center ">
      <div className="flex w-3/5 h-full justify-center items-center md:w-full">
        {data ? (
          <ListDrivers
            drivers={data?.options || []}
            handleConfirm={handleConfirm}
            loading={inPendingEstimate}
          />
        ) : (
          <SelectRouteForm
            handleEstimate={handleEstimate}
            loading={isPending}
          />
        )}
      </div>

      <div className="md:flex items-center justify-center w-2/5 h-full hidden">
        {mapURL ? (
          <img
            src={mapURL}
            alt="mapa da rota"
            className="rounded-lg w-full h-auto max-h-full object-cover"
          />
        ) : (
          <img
            src="/images/girl-in-car.jpeg"
            alt="garota saindo do carro"
            className="rounded-lg w-full h-auto max-h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
