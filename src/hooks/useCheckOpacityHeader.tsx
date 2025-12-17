import { PATHS } from "@/routes/Routes";

const listOpacityHeader = [PATHS.services, PATHS.gallery];

export const useCheckOpacityHeader = () => {
  return listOpacityHeader.includes(window.location.pathname);
};
