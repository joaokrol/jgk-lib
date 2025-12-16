import { OptionType } from "@components/inputs/select/SelectField2";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  where,
} from "firebase/firestore";

interface FirestoreSelectConfig {
  collectionPath: string;
  labelField: string;
  valueField?: string;
  searchField?: string;
  maxResults?: number;
}

export function createFirestoreSelectFetcher({
  collectionPath,
  labelField,
  valueField = "id",
  searchField,
  maxResults = 20,
}: FirestoreSelectConfig) {
  return async (searchText: string): Promise<OptionType[]> => {
    const colRef = collection(db, collectionPath);
    const constraints: QueryConstraint[] = [limit(maxResults)];

    if (searchText) {
      const field = searchField || labelField;
      constraints.push(orderBy(field));
      constraints.push(where(field, ">=", searchText));
      constraints.push(where(field, "<=", searchText + "\uf8ff"));
    } else {
      constraints.push(orderBy(labelField));
    }
    try {
      const q = query(colRef, ...constraints);
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          label: data[labelField],
          value: valueField === "id" ? doc.id : data[valueField],
        };
      });
    } catch (error) {
      console.error(`Erro ao buscar em ${collectionPath}:`, error);
      return [];
    }
  };
}

interface FirestoreSelectCreatorConfig {
  collectionPath: string;
  labelField: string;
}

export async function createFirestoreSelectCreator({
  collectionPath,
  labelField,
}: FirestoreSelectCreatorConfig) {
  const docRef = await addDoc(collection(db, collectionPath), {
    label: labelField,
    id: labelField.toLowerCase(),
  });
  return { label: labelField, id: labelField.toLowerCase(), value: docRef.id };
}
