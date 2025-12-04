import { useNavigateTo } from "@/utils/navigator";

export const useStatusNavigation = () => {
  const navigateTo = useNavigateTo();

  const navigationOnRoutes = (
    statusCode: string,
    id?: string | number
  ) => {
    switch (statusCode) {
      case "TEN_002":
        navigateTo("/tender-information");
        break;

      case "SIT_001":
        navigateTo("/site-visits", "pending");
        break;

      case "SIT_006":
        navigateTo("/site-visits", "upcoming", id);
        break;

      case "SIT_002":
        navigateTo("/site-visits", "rescheduled", id);
        break;

      case "VID_002":
        navigateTo("/video-calls", "rescheduled", id);
        break;

      case "VID_006":
        navigateTo("/video-calls", "upcoming", id);
        break;

      case "SHO_001":
        navigateTo("/shortlist-agent");
        break;

      case "FIN_001":
        navigateTo("/final-selection");
        break;

      default:
        console.warn(`No route defined for status code: ${statusCode}`);
        break;
    }
  };

  return navigationOnRoutes;
};
