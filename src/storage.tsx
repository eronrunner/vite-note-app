import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {

  const [storage, setStorage] = useState<T>(() => {
    const data = localStorage.getItem(key)
    if (!data) {
      if (typeof initialValue == "function") {
        return (initialValue as () => T)()
      }
      else return initialValue
    } 
    else {
      return JSON.parse(data)
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storage))
  }, [storage, key])

  return [storage, setStorage] as [T, typeof setStorage]

}
