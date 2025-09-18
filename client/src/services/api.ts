import { Endpoints } from "../enums/endpoints";

export const API_BASE_URL: string = "http://localhost:3000";

type EndpointType = {
  products: string;
  accessory: string;
  partners: string;
  auth: string;
};

export const endpoints: EndpointType = {
  products: Endpoints.products,
  accessory: Endpoints.accessory,
  partners: Endpoints.partners,
  auth: Endpoints.auth,
};
