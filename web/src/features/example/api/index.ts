import {
  createFirestoreSelectFetcher,
  createFirestoreSelectCreator,
} from "@services/selectFactory";

export const fetchExampleOptions = createFirestoreSelectFetcher({
  collectionPath: "example",
  labelField: "label",
});

export const createExampleOption = async (name: string) => {
  createFirestoreSelectCreator({ collectionPath: "example", labelField: name });
};
