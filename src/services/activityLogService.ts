import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ActivityLog } from "@/types";

export async function logActivity(
  userName: string,
  action: ActivityLog["action"],
  entityType: string,
  entityId?: string,
  details?: string
) {
  try {
    await addDoc(collection(db, "activityLogs"), {
      userName,
      action,
      entityType,
      entityId: entityId ?? null,
      details: details ?? null,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    // سجل العمليات ثانوي، لا يجب أن يوقف العملية الأساسية عند فشله
    console.error("Activity log error:", error);
  }
}
