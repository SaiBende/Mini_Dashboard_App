
import ProjectForm from "../component/ProjectForm";
import ProjectList from "../component/ProjectList";

const Dashboard = () => {
  return (
    <div className="p-8">
      <ProjectForm />
      <ProjectList />
    </div>
  );
};

export default Dashboard;