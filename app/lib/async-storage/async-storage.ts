import AsyncStorage from "@react-native-async-storage/async-storage";

export const setStorage = async (
  key: string,
  value: Record<string, string>,
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    return false;
  }
};

export const getStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return JSON.parse(jsonValue ?? "null");
  } catch (e) {
    return null;
  }
};
