import { useEffect, useState } from "react";

type Subscriber<T> = (onChange: (items: T[]) => void) => () => void;

/**
 * Hook عام: يشترك في أي خدمة Firestore ويرجع البيانات لحظيًا.
 * أي تعديل يحصل من لوحة الإدارة يظهر في الموقع فورًا من غير عمل Refresh.
 */
export function useCollection<T>(subscribe: Subscriber<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribe((data) => {
      setItems(data);
      setLoading(false);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { items, loading };
}
