export const loadFromLocalStorage = <T>(key: string): T| undefined => {
  try {
    const serialized =  localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

export const saveToLocalStorage = (key: string, value: unknown): void => {
  try{
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
   console.log(error);
  }
};


// хук або щось інше