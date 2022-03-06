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
  orderBy,
  setDoc,
  updateDoc,
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
  if (key?.search?.query && key?.search?.type) {
    queries.push(where(key.search.type, "==", key.search.query));
  }
  const q = query<Item.Item>(itemsRef, ...queries);
  const itemsSnap = await getDocs(q);
  return itemsSnap.docs.map((doc) => doc.data());
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

export const getRequestedItems = async (key: {
  search?: Partial<{ type: "id" | "name"; query: string }>;
  sort: "releasedAt" | "releasedAt,desc";
  state?: Item.RequestState;
}) => {
  const itemsRef = collection(
    db,
    "requests"
  ) as CollectionReference<Item.Requested>;

  const queries = [];
  if (key?.search?.query && key?.search?.type) {
    queries.push(where(key.search.type, "==", key.search.query));
  }
  queries.push(
    orderBy(...(key.sort.split(",") as [string] | [string | "desc"]))
  );
  if (key.state) {
    queries.push(where("state", "==", key.state));
  }
  const q = query<Item.Requested>(itemsRef, ...queries);

  const itemsSnap = await getDocs(q);
  return itemsSnap.docs.map((doc) => doc.data());
};

export const acceptRegisterItem = async (
  item: Item.Requested,
  options: string[]
) => {
  const payload: Item.Item = {
    ...item,
    asks: options.map((option) => ({ name: option, options: [] })),
    bids: options.map((option) => ({ name: option, options: [] })),
  };
  await setDoc<Item.Item>(
    doc(db, "items", item.id) as DocumentReference<Item.Item>,
    payload
  );
  await updateDoc<Item.Requested>(
    doc(db, "requests", item.id) as DocumentReference<Item.Requested>,
    {
      state: "ACCEPTED",
    }
  );
};
