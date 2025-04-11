import { useEffect, useState } from "preact/hooks";

export default function use<T>(fetcher: () => Promise<T>) {
  const [value, setValue] = useState<T>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetcher()
      .then(setValue)
      .finally(() => setLoading(false));
  }, []);

  return { value, loading };
}
