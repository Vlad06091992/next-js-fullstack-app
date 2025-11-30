//просто поупражнялся

import {useEffect, useRef} from "react";

export const debounce = (cb:any, delay = 500) => {
        let timer:any = null
        return (...args: any) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                cb(...args);
            }, delay);
        }
}

export const useDebounce = (
    cb: () => void,
    delay = 500,
    deps: any[] = []
) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            cb();
        }, delay);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, deps); // Зависимости эффекта
};