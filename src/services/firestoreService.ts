import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { logActivity } from "./activityLogService";

/**
 * خدمة عامة قابلة لإعادة الاستخدام مع أي Collection في Firestore.
 * كل خدمة خاصة (products, projects, ...) تُبنى فوق دي.
 */
export function createCollectionService<T extends { id: string }>(
  collectionName: string
) {
  const colRef = collection(db, collectionName);

  return {
    /** الاستماع اللحظي للتغييرات (يُستخدم في الموقع العام لتحديث المحتوى فورًا بعد أي تعديل من الإدارة) */
    subscribe(
      onChange: (items: T[]) => void,
      constraints: QueryConstraint[] = [orderBy("order", "asc")]
    ) {
      const q = query(colRef, ...constraints);
      return onSnapshot(
        q,
        (snap) => {
          const items = snap.docs.map(
            (d) => ({ id: d.id, ...d.data() } as T)
          );
          onChange(items);
        },
        (error) => {
          console.error(`Firestore subscribe error [${collectionName}]:`, error);
          onChange([]); // الصفحة تتعامل مع القائمة الفارغة وتعرض بيانات تجريبية بدلًا منها
        }
      );
    },

    async getAll(constraints: QueryConstraint[] = [orderBy("order", "asc")]) {
      const q = query(colRef, ...constraints);
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
    },

    async getById(id: string) {
      const ref = doc(db, collectionName, id);
      const snap = await getDoc(ref);
      return snap.exists() ? ({ id: snap.id, ...snap.data() } as T) : null;
    },

    async create(data: Omit<T, "id">, userName = "admin") {
      const ref = await addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      await logActivity(userName, "create", collectionName, ref.id);
      return ref.id;
    },

    async update(id: string, data: Partial<T>, userName = "admin") {
      const ref = doc(db, collectionName, id);
      await updateDoc(ref, { ...data, updatedAt: serverTimestamp() } as any);
      await logActivity(userName, "update", collectionName, id);
    },

    /** حذف ناعم (Soft Delete) — يُفضّل استخدامه للعناصر المهمة بدل الحذف النهائي */
    async softDelete(id: string, userName = "admin") {
      const ref = doc(db, collectionName, id);
      await updateDoc(ref, {
        isDeleted: true,
        deletedAt: Date.now(),
      } as any);
      await logActivity(userName, "delete", collectionName, id);
    },

    async restore(id: string, userName = "admin") {
      const ref = doc(db, collectionName, id);
      await updateDoc(ref, { isDeleted: false, deletedAt: null } as any);
      await logActivity(userName, "restore", collectionName, id);
    },

    /** حذف نهائي — يُستخدم بحذر شديد، غالبًا فقط للـ Super Admin */
    async hardDelete(id: string, userName = "admin") {
      const ref = doc(db, collectionName, id);
      await deleteDoc(ref);
      await logActivity(userName, "delete", collectionName, id, "حذف نهائي");
    },
  };
}
