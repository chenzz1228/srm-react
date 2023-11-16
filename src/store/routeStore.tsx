import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TabComponentType} from "../bean/tabType";
import getViewComponent from "../utils/getViewComponent";



interface routeState {
    tabComponents:  TabComponentType[],
    tabKeys: string[],
    selectedKey:string,
}

// 使用该类型定义初始 state
const initialState: routeState = {
    tabComponents: [],
    tabKeys: [],
    selectedKey:''
}

export const routeStore = createSlice({
    name: 'routeList',
    initialState: initialState,
    reducers: {
        addTabComponent: (state, action:PayloadAction<TabComponentType>) => {
            console.log("add")
            let has = state.tabComponents.some(item=>item.key==action.payload.key)
            if(!has)
                state.tabComponents.push(action.payload)
        },
        clearTabComponent: (state, action) => {
            state.tabComponents.length = 0
        },
        setSelectedKey:(state, action)=>{
            state.selectedKey = action.payload
        },
        deleteTabItemsByKey:(state, action:PayloadAction<string>)=>{
            let delIndex:number = -1;
            state.tabComponents.forEach((item,index,arr)=>{
                if(item.key===action.payload)
                    delIndex=index;
            })
            if (delIndex !== -1){
                //删除tab
                console.log(delIndex)
                state.tabComponents.splice(delIndex,1);

            }

        },
        addTabKeys: (state, action: PayloadAction<string>) => {
            let has = state.tabKeys.includes(action.payload)
            if (!has)
                state.tabKeys.push(action.payload)
        },
        clearTabKeys: (state, action:PayloadAction<string>) => {
            state.tabKeys.length = 0
        }

    }
})
export const {
    addTabComponent,
    deleteTabItemsByKey,
    clearTabComponent,
    addTabKeys,
    clearTabKeys,
    setSelectedKey
} = routeStore.actions
export default routeStore.reducer