import SurveyDataRoutes from "./survey-data";
import ScheduleRoutes from "./schedule";
import ReportRoutes from "./report";
import ImportRoutes from "./import";
import StoreRoutes from "./store";
import ProductRoutes from "./product";

const routes = [
  ...SurveyDataRoutes,
  ...ScheduleRoutes,
  ...ReportRoutes,
  ...ImportRoutes,
  ...StoreRoutes,
  ...ProductRoutes
]

export default routes;