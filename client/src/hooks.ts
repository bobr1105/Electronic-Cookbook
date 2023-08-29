import { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { Recipe } from "./components/backendTypes";
import { HttpClientContext } from "./client";

export function useRecipes() {
  const client = useContext(HttpClientContext);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | unknown>(undefined);

  const loadRecipes = useCallback(() => {
    client
      ?.get<Recipe[]>(`recipes`)
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((e: AxiosError) => { setError(e.message); })
      .finally(() => setLoading(false));
  }, [client]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  return { recipes, loading, error, reload: loadRecipes };
}

