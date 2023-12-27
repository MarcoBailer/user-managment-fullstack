import PageAccessTemplate from "../../components/dashboard/page-access/PageAccessTemplate";
import { FaUserTie } from "react-icons/fa";

const ManagerPage = () => {
  return ( 
  <div className="pagetemplate2">
    <PageAccessTemplate color='#0B96BC' icon={FaUserTie} role='Manager'></PageAccessTemplate>
  </div>
  );
};

export default ManagerPage;
