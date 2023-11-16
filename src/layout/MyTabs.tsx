import React, {useEffect, useState} from 'react';
import {Tabs, TabsProps} from 'antd';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {deleteTabItemsByKey, setSelectedKey} from "../store/routeStore";
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Tab 1',
        children: 'Content of Tab Pane 1',
    },
    {
        key: '2',
        label: 'Tab 2',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: 'Tab 3',
        children: 'Content of Tab Pane 3',
    },
];

const MyTabs: React.FC = () => {
    const {tabComponents} = useAppSelector((state) => state.combineReducer.routeStore)
    const {selectedKey} = useAppSelector((state) => state.combineReducer.routeStore)
    const dispatch = useAppDispatch();

    const onChange = (key: string) => {
        dispatch(setSelectedKey(key))
    };

    const remove = (targetKey: TargetKey) => {
        dispatch(deleteTabItemsByKey(targetKey.toString()))
    };

    const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
        if (action === 'add') {

        } else {
            remove(targetKey);
        }
    };

    return (
        <div>
            <Tabs
                hideAdd
                onChange={onChange}
                activeKey={selectedKey}
                type="editable-card"
                onEdit={onEdit}
                items={tabComponents}
            />
        </div>
    );
};

export default MyTabs;
