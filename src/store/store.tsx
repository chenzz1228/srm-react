import {combineReducers, configureStore} from "@reduxjs/toolkit";
import routeStore from './routeStore'
import storageSession from 'redux-persist/lib/storage/session'
import {persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk'

//持久化配置
const persistConfig = {
    key: 'root',
    storage:storageSession, // 缓存机制
}

//合并多个Reducer
const combineReducer = combineReducers({routeStore})
// 持久化改造，第二个参数传入要改造的store/reducer
// const persistedCombinedReducer = persistReducer(persistConfig, combineReducer)
const store = configureStore({
    // 合并多个store,经过持久化改造的store/reducer的值要使用改造后的
    reducer: {
        // persistedCombinedReducer,
        combineReducer
    },
    //中间件，异步解决方案
    middleware: [thunk]
});
// export const persistor = persistStore(store)
// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;