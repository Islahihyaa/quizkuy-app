import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://opentdb.com";

const useAxios = ({ url }) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url)
        setResponse(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, [url]);

  return { response, error, loading };
};

export default useAxios;
