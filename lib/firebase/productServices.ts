import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
  serverTimestamp,
  deleteDoc,
  writeBatch,
  onSnapshot,
} from "firebase/firestore";
import firestore from "./init";
import { getServerSession } from "next-auth";
import { CartProducType } from "@/types";

export async function getDataCart(_id: string) {
  const q = query(collection(firestore, "cart"), where("_id", "==", _id));

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}
export async function getAllProducts() {
  const session = await getServerSession();
  const q = query(
    collection(firestore, "cart"),
    where("user_email", "==", session?.user?.email),
    orderBy("time_stamp", "desc")
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return data;
}
export async function phusToCart(product: CartProducType) {
  const res: any = await getDataCart(product._id);
  const Newproduct = {
    ...product,
    time_stamp: serverTimestamp(),
  };
  const index = res.findIndex((obj: any) => obj.size === Newproduct.size);
  if (index !== -1) {
    const data = await updateDoc(doc(firestore, "cart", res[index].id), {
      quantity: res[index].quantity + 1,
    })
      .then(() => ({ status: true, message: " Success", data: res }))
      .catch((err) => ({ status: false, message: ` Failed ${err}` }));
    return data;
  } else {
    const data = await addDoc(collection(firestore, "cart"), Newproduct)
      .then(() => ({ status: true, message: "Success", data: res }))
      .catch(() => ({ status: false, message: "Failed" }));
    return data;
  }
}
export async function updateProduct(data: {
  _id: string;
  size?: number;
  quantity?: number;
}) {
  const res: any = await getDataCart(data._id);
  if (data.size) {
    const results = await updateDoc(doc(firestore, "cart", res[0]?.id), {
      size: data.size,
    })
      .then(() => ({ status: true, message: " Success" }))
      .catch((err) => ({ status: false, message: ` Failed ${err}` }));
    return results;
  } else {
    const results = await updateDoc(doc(firestore, "cart", res[0]?.id), {
      quantity: data.quantity,
    })
      .then(() => ({ status: true, message: " Success" }))
      .catch((err) => ({ status: false, message: ` Failed ${err}` }));

    return results;
  }
}
export async function deleteProduct({
  _id,
  size,
}: {
  _id: string;
  size: number;
}) {
  const q = query(
    collection(firestore, "cart"),
    where("_id", "==", _id),
    where("size", "==", size)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const result = await deleteDoc(doc(firestore, "cart", data[0].id))
    .then(() => ({ status: true, message: " Success Deleted Product" }))
    .catch((err) => ({ status: false, message: `  Deleted Product: ${err}` }));

  return result;
}
export async function clearCart({ email }: { email: string }) {
  const q = query(
    collection(firestore, "cart"),
    where("user_email", "==", email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const batch = writeBatch(firestore);

  for (const docData of data) {
    const docRef = doc(firestore, "cart", docData.id);
    batch.delete(docRef);
  }

  await batch.commit();
}
