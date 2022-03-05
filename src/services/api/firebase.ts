import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  startAfter,
  limit,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  DocumentReference,
  CollectionReference,
  where,
} from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "yogi-auction.firebaseapp.com",
  projectId: "yogi-auction",
  storageBucket: "yogi-auction.appspot.com",
  appId: "1:177114118932:web:7360a5c9ea80742e5de001",
});

const db = getFirestore(app);

export const getItems = async (
  key: Partial<{
    search: Partial<{ type: "id" | "name"; query: string }>;
  }>
) => {
  const itemsRef = collection(db, "items") as CollectionReference<Item.Item>;
  const queries = [];
  key?.search?.query &&
    key?.search?.type &&
    queries.push(where(key.search.type, "==", key.search.query));
  const q = query<Item.Item>(itemsRef, ...queries);
  const itemsSnap = await getDocs(q);
  return itemsSnap.docs.map((doc) => doc.data());
};

export const getQueriedItems = async (key: {
  bookmark: QueryDocumentSnapshot<DocumentData> | "INITIAL_REQUEST";
  query?: string;
}) => {
  const itemsRef = collection(db, "items") as CollectionReference<Item.Item>;
  const q =
    key.bookmark === "INITIAL_REQUEST"
      ? query<Item.Item>(itemsRef, where("name", "==", key.query))
      : query<Item.Item>(
          itemsRef,
          startAfter(key.bookmark),
          where("name", "==", key.query)
        );
  const itemsSnap = await getDocs(q);
  return {
    bookmark: itemsSnap.docs[itemsSnap.docs.length - 1],
    data: itemsSnap.docs.map((doc) => doc.data()),
  };
};

export const getItem = async (id: string): Promise<{ data: Item.Item }> => {
  const docRef = doc(db, "items", id) as DocumentReference<Item.Item>;
  const docSnap = await getDoc<Item.Item>(docRef);
  if (!docSnap.exists()) {
    throw new Error("no data exist");
  } else {
    return { data: docSnap.data() };
  }
};
