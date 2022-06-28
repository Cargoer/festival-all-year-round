# featival-all-year-round

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### requirements
#### basic requirements
1. 进入后可以看到今天是什么节日，包含日期、节日名称、（图片）
2. 若多个节日都在当日，可以以轮播图的形式展示这多个节日
3. 提供日历视图，可以看到（或选择）某个日期是什么节日

* 获取节日的方式：暂定写死静态文件
#### extend requirements
1. 对节日进行分类或添加标签
2. 可在当日或某一天添加其节日（此操作要接入airtable）
3. 添加节日时实现上传图片功能（难，没有后端协助，是否有轮子）
   参考：
   [csdn@代码界的陈冠希 | JavaScript前端上传文件到腾讯云](https://blog.csdn.net/weixin_43078354/article/details/123006660)
   [csdn@请打码 | 前端上传文件到腾讯云（对象存储）](https://blog.csdn.net/qq_41485414/article/details/80134908?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-80134908-blog-123006660.pc_relevant_paycolumn_v3&spm=1001.2101.3001.4242.1&utm_relevant_index=2)
   备用方案：
   若无法实现上传图片，变成手动输入图片链接
