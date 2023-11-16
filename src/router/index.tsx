import React from 'react';
import {Navigate,useRoutes} from "react-router-dom";

function MyRouter(props:any) {
    const router = useRoutes([
        {
            path: "/",
            element: <Navigate to="/homePage"/>
        },
        {
            path: '/homePage',
            element: viewComponent("homePage")
        },
        {
            path: '/test1',
            element: viewComponent("test1/test1")
        }
        ,
        {
            path: '/test2',
            element: viewComponent("test2/test2")
        }
    ])
    return (
        router
    );
}
const viewComponent = (path:string) => {
    const Comp = React.lazy(() => import(`../views/${path}`))
    return (
        <React.Suspense fallback={<>加载中...</>}>
            <Comp/>
        </React.Suspense>
    )
}

export default MyRouter;