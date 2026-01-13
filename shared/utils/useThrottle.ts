//просто поупражнялся

import {useCallback, useRef} from "react";

// export const useThrottle = (cb: Function, delay: number) => {
//     let shouldRun = true
//
//     let timer: NodeJS.Timeout | null = null
//
//     return (...args: any[]) => {
//
//         if (!timer) cb(...args)
//
//         if (shouldRun) {
//             timer = setTimeout(() => {
//                 cb(...args)
//                 shouldRun = true
//             }, delay)
//             shouldRun = false
//         }
//
//     }
// }

function throttle(cb: Function, delay: number) {
    let timer:null | NodeJS.Timeout = null
    let lastArgs:any = null;

    return function(...args:any[]) {
        lastArgs = args;

        if (!timer) {
            timer = setTimeout(() => {
                cb.apply(null, lastArgs);
                timer = null;
            }, delay);
        }
    };
}


export const useThrottle = (cb: Function, delay: number) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const lastArgsRef = useRef<any[]>([]);

    return useCallback((...args: any[]) => {
        lastArgsRef.current = args;

        if (!timerRef.current) {
            timerRef.current = setTimeout(() => {
                cb(...lastArgsRef.current);
                timerRef.current = null;
            }, delay);
        }
    }, [cb, delay]);
};