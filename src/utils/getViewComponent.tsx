import React from "react";

const getViewComponent = (path:string) => {
    const Component = React.lazy(() => import(`../views/${path}`))
    return (
        <React.Suspense fallback={<>加载中...</>}>
            <Component key={path}/>
        </React.Suspense>
    )
}

export default getViewComponent;