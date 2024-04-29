import { SeatArrayType, ServiceResponse } from "./Models";

export const fetchSeats = async (serviceID: number): Promise<SeatArrayType[]> => {
  const url = new URL("http://localhost:8080/api/v1/getseats");
  url.searchParams.append("ServiceID", serviceID.toString());
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const fetchNumberOfAvailableSeats = (serviceID: number) => {
  const url = new URL("http://localhost:8080/api/v1/getnumberofavailableseat");
  url.searchParams.append("ServiceID", serviceID.toString());

  return fetch(url.toString())
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Failed to fetch number of available seats:", err);
      throw err;
    });
};

export const fetchServices = async (date: string, originID: number, destinationID: number): Promise<ServiceResponse> => {
  const url = new URL("http://localhost:8080/api/v1/getservices");
  url.searchParams.append("Date", date);
  url.searchParams.append("OriginID", originID.toString());
  url.searchParams.append("DestinationID", destinationID.toString());

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ServiceResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};