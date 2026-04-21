import { useState, useEffect, useRef } from 'react';

export default function useFetchData(fetchFunction, dependencias = []) {
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    // Si ya se ha hecho la petición (y no queremos repetirla por StrictMode), salimos.
    // Solo si dependencias está vacío (mount only). Si hay dependencias, queremos que vuelva a ejecutar.
    if (dependencias.length === 0 && dataFetchedRef.current) return;
    
    let isMounted = true;
    dataFetchedRef.current = true;

    const fetchData = async () => {
      setCargando(true);
      try {
        const result = await fetchFunction();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setCargando(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencias);

  const refetch = async () => {
    setCargando(true);
    try {
      const result = await fetchFunction();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setCargando(false);
    }
  };

  return { data, cargando, error, refetch, setData };
}
