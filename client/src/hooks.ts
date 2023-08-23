import { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { Recipe } from "./components/backendTypes";
import { HttpClientContext } from "./client";

export function useRecipes() {
  const client = useContext(HttpClientContext);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const loadRecipes = useCallback(() => {
    client
      ?.get<Recipe[]>(`recipes`)
      .then((res) => {
        console.log("DATA FROM HERE IS", res.data);
        setRecipes(res.data);
      })
      .catch((e: AxiosError) => console.log(e))
      .finally(() => setLoading(false));
  }, [client]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  return { recipes, loading, reload: loadRecipes };
}
