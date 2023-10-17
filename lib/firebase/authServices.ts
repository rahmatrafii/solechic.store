import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import firestore from "./init";
import bcrypt from "bcrypt";

const getUser = async (email: any) => {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

export const signIn = async ({ email }: { email: string }) => {
  const data = await getUser(email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
};

export const signUp = async (userData: any) => {
  const user = await getUser(userData.email);
  if (user.length > 0) {
    // callback({ status: false, message: "Email already Exists" });
    return { status: false, message: "Email already Exists" };
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    const res = await addDoc(collection(firestore, "users"), userData)
      .then(() => ({ status: true, message: "Register Success" }))
      .catch(() => ({ status: false, message: "Register Failed" }));
    return res;
  }
};

export const signinWithGoogle = async (userData: any) => {
  const user = await getUser(userData.email);

  if (user.length > 0) {
    const data = await updateDoc(doc(firestore, "users", user[0].id), userData)
      .then(() => ({ status: true, message: "login Success", data: userData }))
      .catch(() => ({ status: false, message: "Login Failed" }));
    return data;
  } else {
    const data = await addDoc(collection(firestore, "users"), userData)
      .then(() => ({ status: true, message: "login Success", data: userData }))
      .catch(() => ({ status: false, message: "Login Failed" }));
    return data;
  }
};
