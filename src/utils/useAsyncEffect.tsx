import {DependencyList, useEffect} from "react";

export default function useAsyncEffect(effect: () => any, dependencies: DependencyList | undefined) {
    return useEffect(() => {
        const cleanupPromise = effect()
        return () => {
            cleanupPromise.then((cleanup: () => any) => cleanup && cleanup())
        }
    }, dependencies)
}
