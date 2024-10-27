import ProtectedRoute from "@/components/authprovider/page";
import Data from "../components/corsedata/page";

const Home = () => {
  return (
    <ProtectedRoute>
      <Data />
    </ProtectedRoute>
  );
};

export default Home;
