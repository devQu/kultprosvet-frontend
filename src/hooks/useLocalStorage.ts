import { useEffect, useState } from "react";

export const useLocalStorage = (initialValue: unknown, key: string) => {

    const getValue = () => {
        const storage = localStorage.getItem(key);

        if (storage) {
            return JSON.parse(storage);
        } 

        return initialValue;
    }

    const [value, setValue] = useState(getValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]

}