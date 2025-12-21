import { Dayjs } from "dayjs";

export type PartyFormData = {
  name: string;
  email: string;
  phone: string;
  date: Dayjs | null;
  partySize: string;
  message: string;
};
