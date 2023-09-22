import { Box } from "@mui/material";
import Error from '../../Error';
import Loading from "../../Loading";
import Recipes from "../recipes/Recipes";
import "./Home.css";
import { useRecipes } from "../../hooks";

export function Home() {
  const { loading, error } = useRecipes();

  if (loading) return (<Loading />)
  if (error) return (<Error message={error as String} />)
  return (

    <div className="App">
      <Box>
        <Recipes />
      </Box>
    </div>
  );
}

export default Home;
