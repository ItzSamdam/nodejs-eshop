//ADMINISTRATOR ROUTES
import DashboardRoutesConfig from "./adminRoutes/dashboard.routes.config";
import EmployeeRoutesConfig from "./adminRoutes/employees.routes.config";
import AuthRoutesConfig from "./adminRoutes/auth.routes.config";
import SessionTermsRoutesConfig from "./adminRoutes/sessionTerms.routes.config";
import EventsRoutesConfig from "./adminRoutes/events.routes.config";
import NoticesRoutesConfig from "./adminRoutes/notices.routes.config";
import AdmissionsRoutesConfig from "./adminRoutes/admission.routes.config";
import SettingsRoutesConfig from "./adminRoutes/settings.routes.config";
import StudentRoutesConfig from "./adminRoutes/students.routes.config";
import AcademicRoutesConfig from "./adminRoutes/academics.routes.config";

//TEACHER ROUTES


//STUDENT ROUTES
import StudentBoardRoutesConfig from "./studentsRoutes/studentBoard.routes.config";
import StudentProfileRoutesConfig from "./studentsRoutes/studentProfile.routes.config";
import StudentResourceRoutesConfig from "./studentsRoutes/studentResource.routes.config";
import StudentAcadRoutesConfig from "./studentsRoutes/studentAcad.routes.config";

const routesConfigs = [
  //ADMINISTRATOR ROUTES
  AuthRoutesConfig,
  DashboardRoutesConfig,
  StudentRoutesConfig,
  SessionTermsRoutesConfig,
  EventsRoutesConfig,
  NoticesRoutesConfig,
  AdmissionsRoutesConfig,
  SettingsRoutesConfig,
  AcademicRoutesConfig,
  EmployeeRoutesConfig,
  StudentRoutesConfig,

  //TEACHER ROUTES


  //STUDENT ROUTES
  StudentProfileRoutesConfig,
  StudentBoardRoutesConfig,
  StudentResourceRoutesConfig,
  StudentAcadRoutesConfig
];

export default routesConfigs;
