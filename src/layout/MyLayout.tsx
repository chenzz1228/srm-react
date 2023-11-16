import React, {useState} from 'react';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Dropdown, Layout, Menu, theme} from 'antd';
import {useNavigate} from "react-router-dom";
import {MailOutlined, SettingOutlined} from '@ant-design/icons';
import {Avatar, ConfigProvider} from 'antd';
import MyTabs from "./MyTabs";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {addTabKeys,addTabComponent,setSelectedKey} from '../store/routeStore'
import getViewComponent from "../utils/getViewComponent";
import reactImage from '../assets/picture/reactImage.png'

const {Header, Content, Sider} = Layout;
const menu_item1: MenuProps['items'] = [
    {
        label: '模块一',
        key: 'a',
        icon: <MailOutlined/>,
    }
];
const menu_item2: MenuProps['items'] = [
    {
        label: '模块二',
        key: 'b',
        icon: <MailOutlined/>,
    }
];
const menu_item3: MenuProps['items'] = [
    {
        label: '模块三',
        key: 'c',
        icon: <SettingOutlined/>,
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    {
                        label: 'Option 1',
                        key: 'setting:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
        ],
    },
];
const menu_item4: MenuProps['items'] = [
    {
        label: '模块四',
        key: 'c',
        icon: <SettingOutlined/>,
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    {
                        label: 'Option 1',
                        key: 'setting:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
        ],
    },
];

const sliderList: MenuProps['items'] = [
    {key: 'first', icon: React.createElement(UserOutlined), label: 'team1',
        children: [{key: JSON.stringify({'label':'标签1','path':'test1/test1'}), label: '标签1'},
            {key: JSON.stringify({'label':'标签2','path':'test2/test2'}), label: '标签2'},
            {key:  JSON.stringify({'label':'标签3','path':'test3/test3'}), label: '标签3'}]},
    {key: '2', icon: React.createElement(LaptopOutlined), label: 'team2',
        children: [{key: JSON.stringify({'label':'标签4','path':'test4/test4'}), label: '标签4'},
            {key: JSON.stringify({'label':'标签5','path':'test5/test5'}), label: '标签5'},
            {key:  JSON.stringify({'label':'标签6','path':'test6/test6'}), label: '标签6'}]},
]


const sliderList2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);
        return {
            key: `test${key}`,
            icon: React.createElement(icon),
            label: `test ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `test${subKey}`,
                };
            }),
        };
    },
);

const MyLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [siderIndex, setSiderIndex] = useState<number>(1)
    const {
        token: {colorBgContainer},
    } = theme.useToken();


    const chooseSider = (index: number) => {
        setSiderIndex(index)
    }
    const items: MenuProps['items'] = [
        {
            label: '1st menu item',
            key: '1',
        },
        {
            label: '2nd menu item',
            key: '2',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];


    const toRouter = (item: React.ReactInstance, key: string, keyPath: string[], domEvent: any) => {//获取组件放到tabs
        console.log(JSON.parse(key))
        let obj = JSON.parse(key)
        dispatch(addTabKeys(obj.path))
        dispatch(addTabComponent({label:obj.label,children:(getViewComponent(obj.path)),key:obj.path}))
        dispatch(setSelectedKey(obj.path))
    }

//获取组件
    const viewComponent = (path: string) => {
        const Comp = React.lazy(() => import(`../views/${path}`))
        return (
            <React.Suspense fallback={<>加载中...</>}>
                <Comp/>
            </React.Suspense>
        )
    }

    return (

        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        dropdownWidth: 200,
                    },
                },
            }}
        >
            <Layout>
                <Header
                    style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', height: '100px'}}>
                    <div style={{flex: '0.3',marginTop:'30px'}}>
                        <img src={reactImage} alt='logo' style={{height:'60px'}}/>
                    </div>
                    <div style={{flex:'0.3'}}></div>
                    <div style={{flex: '1'}} onClick={() => chooseSider(1)}>
                        <Menu theme="light" mode="horizontal" items={menu_item1}/>
                    </div>
                    <div style={{flex: '1'}} onClick={() => chooseSider(2)}>
                        <Menu theme="light" mode="horizontal" items={menu_item2}/>
                    </div>
                    <div style={{flex: '1'}} onClick={() => chooseSider(3)}>
                        <Menu theme="light" mode="horizontal" items={menu_item3}/>
                    </div>
                    <div style={{flex: '1'}} onClick={() => chooseSider(4)}>
                        <Menu theme="light" mode="horizontal" items={menu_item4}/>
                    </div>
                    <div style={{flex: '0.3',backgroundColor:'white'}}>
                        <Dropdown menu={{items}} placement="bottom">
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                        </Dropdown>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} style={{background: colorBgContainer, display: siderIndex === 1 ? '' : 'none'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                            items={sliderList}
                            onClick={({item, key, keyPath, domEvent}) => toRouter(item, key, keyPath, domEvent)}
                        />
                    </Sider>
                    <Sider width={200} style={{background: colorBgContainer, display: siderIndex === 2 ? '' : 'none'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                            items={sliderList2}
                        />
                    </Sider>


                    <Layout style={{padding: '0 24px 24px'}}>
                        {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                        {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                        {/*</Breadcrumb>*/}
                        <Content
                            style={{
                                padding: 24,
                                margin: 10,
                                minHeight: document.documentElement.clientHeight - 90,
                                background: colorBgContainer,
                            }}
                        >
                            <MyTabs/>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </ConfigProvider>
    );

};

export default MyLayout;