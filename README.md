# featival-all-year-round

## run
```
yarn install
yarn serve
```

### requirements
#### basic requirements
1. 进入后可以看到今天是什么节日，包含日期、节日名称、（图片）
2. 若多个节日都在当日，可以以轮播图的形式展示这多个节日
3. 提供日历视图，可以看到（或选择）某个日期是什么节日

* 获取节日的方式：暂定微信小程序写死静态文件，其他端通过airtable获取
#### extend requirements
1. 对节日进行分类或添加标签
2. 可在当日或某一天添加其节日（此操作要接入airtable）
3. 添加节日时实现上传图片功能（难，没有后端协助，是否有轮子）
   参考：  
   [csdn@代码界的陈冠希 | JavaScript前端上传文件到腾讯云](https://blog.csdn.net/weixin_43078354/article/details/123006660)    
   [csdn@请打码 | 前端上传文件到腾讯云（对象存储）](https://blog.csdn.net/qq_41485414/article/details/80134908?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-80134908-blog-123006660.pc_relevant_paycolumn_v3&spm=1001.2101.3001.4242.1&utm_relevant_index=2)  
   备用方案：  
   若无法实现上传图片，变成手动输入图片链接
4. 接入农历节日（是否有对应的判断api，可以copy实现，但是逻辑上有待兼容）
5. 日历上方添加筛选功能，1）基于节日类型筛选 2）基于节日标签筛选（是否可以获得airtable多选项里的选项枚举）
6. 支持自行导入excel表格数据（适用于自定义节日，如家庭成员生日）
   参考：  
   [csdn@很单纯的娃 | js读取excel数据](https://blog.csdn.net/qq_37826599/article/details/122307771)
7. 增加“距xx节日还有x天”功能，可以选择某个节日，查看剩余天数，支持固定在页面上显示
8. 支持查询（查询输入即筛选选项置于日历上方，输入查询关键词后实时匹配节日，支持输入日期/节日名/节日标签，点击匹配项可在日历定位到节日那天）
9. 每日首次进入，显示今日节日弹窗
10. 历史上的今天（如汶川大地震、唐山打人事件）

### bug
#### h5端
1. 导入文件后恢复成默认节日，再次导入无反应
#### app端
