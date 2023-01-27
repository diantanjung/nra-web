import UserRoutes from "./user.js";
import ActivityLogRoutes from "./activity-log";
import ClientRoutes from "./client.js";
import ContractRoutes from "./contract.js";
import DepartmentRoutes from "./department";
import AreaRoutes from "./area.js";
import RegulationRoutes from "./regulation.js";
import ProductCategoryRoutes from "./product-category";
import ContractTypeRoutes from "./contract-type";
import ArchiveRoutes from "./archive";
import SupplierRoutes from "./supplier";




const routes = [
  {
    path: "master",
    redirect: "/master/user",
    children: [
      ...UserRoutes,
      ...ActivityLogRoutes,
      ...ClientRoutes,
      ...ContractRoutes,
      ...DepartmentRoutes,
      ...AreaRoutes,
      ...RegulationRoutes,
      ...ArchiveRoutes,
      ...SupplierRoutes,
      ...ContractTypeRoutes,
      ...ProductCategoryRoutes
    ],
  },
]

export default routes;