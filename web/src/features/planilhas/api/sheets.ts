import { db } from "@services/firebase";
import { SheetDefTypes, SheetDataTypes, OptionsType } from "../types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { convertTimestamps } from "../utils/helpers";

export const getSheetDefinition = async (
  sheetId: string
): Promise<SheetDefTypes> => {
  const docRef = doc(db, "sheets", sheetId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    throw new Error(`Planilha com Id "${sheetId}" não encontrada.`);
  }
  return { key: snapshot.id, ...snapshot.data() } as SheetDefTypes;
};

export const getSheetData = async (
  sheetId: string
): Promise<SheetDataTypes[]> => {
  const col = collection(db, "sheets", sheetId, "data");
  const q = query(col, orderBy("data", "desc"));
  const snap = await getDocs(q);
  const records = snap.docs.map((d) => ({
    id: d.id,
    ...convertTimestamps(d.data()),
  }));
  return records;
};

export const getCatalog = async (catalogId: string): Promise<OptionsType[]> => {
  const docRef = doc(db, "catalogs", catalogId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error(`Catalog com Id "${catalogId}" não encontrado.`);
  }
  return snapshot.data().options;
};
