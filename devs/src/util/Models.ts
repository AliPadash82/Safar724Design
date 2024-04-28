export interface City {
  Code: string;
  ID: number;
  IsCapital: boolean;
  Name: string;
  Order: number;
  PersianName: string;
  ProvinceName: string;
  ProvincePersianName: string;
  SearchExpressions: string[];
 }

export interface Service {
  ID: number;
  IsVip: boolean;
  BusType: string;
  BusCode: string;
  Price: number;
  MidwayCity: string;
  MidwayCityCode: string;
  MidwayEnglishName: string;
  CompanyId: number;
  CompanyUrl: string; 
  CompanyCode: string;
  CompanyName: string;
  CompanyPersianName: string;
  OriginTerminalUrl: string;
  OriginTerminalName: string;
  OriginTerminalPersianName: string;
  OriginTerminalCode: string;
  DestinationCode: string
  DestinationTerminalUrl: string;
  DestinationTerminalPersianName: string;
  DestinationTerminalName: string;
  DestinationTerminalCode: string;
  DepartureTime: string;
  DepartureDate: string;
  Description: string;
  BriefDescription: string;
  AvailableSeatCount: number;
  DiscountPercentage: number;
  CompanyLogo: string;
  Status: number;
}

export interface ServiceResponse {
  Date: string;
  OriginPersianName: string;
  OriginEnglishName: string;
  OriginCode: string;
  DestinationPersianName: string;
  DestinationEnglishName: string;
  DestinationCode: string;
  Today: string;
  Items: Service[];
}

export type SeatType = [number | null, string | null] | null;

export interface SeatArrayType {
  SeatNumber: number;
  Gender: string;
  Accessible: boolean;
};