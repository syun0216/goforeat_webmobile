### goforeat mobile web app

### 文档目录结构
```
src  
├── assets                                                      assets
│   └── index.js                                                项目图片
├── components                                                  组件
│   ├── CommonHeader.tsx                                        公共头部
│   ├── Divider.tsx                                             间隔组件
│   ├── GenerateIcon.tsx                                        公共生成图标函数
│   ├── ListFooter.tsx                                          列表上拉加载显示状态组件
├── interfaces                                                  项目定义的接口
│   ├── index.ts                                                mobx接口定义
│   ├── server.ts                                               api接口定义
├── mobx                                                        mobx
│   ├── rootStore.ts                                            管理全局状态   
│   └── homepage.ts                                             homepage的状态管理
├── pages                                                       页面
│   ├── foodlist                                                餐单推荐
│   ├── home                                                    主页
│   ├── login                                                   登录页面
│   └── myOrder                                                 我的订单页面
├── router                                                      页面
│   ├── asyncComponents.tsx                                     异步引用页面
│   └── index.tsx                                               路由管理
├── styles                                                      app中的样式
│   ├── app-variables.less                                      app中的样式变量
│   ├── index.less                                              公用的样式
│   └── transition.less                                         动画
├── utils                                                       工具
│   ├── auth.ts                                                 验证
│   ├── common.ts                                               公共函数
│   └── global_params.ts                                        全局引用参数
├── App.css
├── App.test.tsx
├── App.tsx
├── index.css
├── index.tsx
├── logo.svg
└── registerServiceWorker.ts