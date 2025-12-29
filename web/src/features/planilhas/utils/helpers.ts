import { Timestamp } from "firebase/firestore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertTimestamps = (data: any) => {
  const converted = { ...data };
  Object.keys(converted).forEach((key) => {
    const value = converted[key];
    if (value instanceof Timestamp) {
      converted[key] = value.toDate();
    }
  });

  return converted;
};
