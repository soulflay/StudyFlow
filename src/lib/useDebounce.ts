import React from 'react';

// passing the editorstate here and determining how long before we trigger the effect with the delay
export function useDebounce(value: string, delay: number){
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
    const handler = setTimeout(() => {
        setDebouncedValue(value);
    }, delay);
    return () => {
        clearTimeout(handler);
    };
    }, [value, delay]);

    return debouncedValue;
    
}