## 手写一个掘金客户端

文档:

https://bytedance.feishu.cn/docs/doccnWJZyfzHGMyt0fyy3E99LIh#21zEmd

### 功能简介

#### 首页（热门 / 最新 Tab 页）
- 首页有三个主 Tab 分别为 「热门」、「最新」和「历史」，「热门」和「最新」保留跟掘金一样的交互逻辑
- 文章列表还有两个二级 Tab ，分别对应文章列表二级 Tab，点击切换 Tab。
- 头顶上两个二级 Tab 要求可以固定在屏幕最上方。
- 文章列表里面基本逻辑跟掘金的页面一致，文章列表显示基本文章信息如标题，作者，发布时间等等，点击跳转到文章页。
- 文章列表拉到最底后自动加载后面的列表内容（俗称：无限滚动列表）。

#### 文章页
- 文章页面分成两个大部分，上面一部分是文章头图、作者信息，并且显示文章内容。
- 下半部分显示文章的评论，要求能够显示一二级评论。

#### 历史
- 历史页面非常简单，大致文章列表和首页的一样，但是这里记录我们在这个掘金客户端里面浏览过的文章。

### Timeline

第一周 —— 页面框架
- [x] 搭建 React/Vue 基础框架，开始进行进行基本的开发。
- [x] 开发出整个页面的框架，要求实现一个假的（无功能，数据我们提供一个 JSON）三个 Tab 的基本框架。

第二周 —— 完整样式
- [x] 实现页面列表样式。（数据我们提供 JSON）
- [x] 实现文章页样式。（数据我们提供 JSON）

第三周 —— 接入数据
- [x] 接入真实接口，实现基本浏览功能。
- [x] 我们提供接口功能和文档。

第四周 —— 增加功能
- [x] 实现滑到文章列表底部自动加载功能（列表页与文章页面）
- [x] 实现浏览历史 / 稍后再看功能
- [x] 搜索功能（PC适配）
- [x] 图片懒加载

目前遇到的问题及解决方法:

- web端搜索展开二级菜单相关问题: relative+absolute布局纵向会被hidden
- 解决: 舍弃absolute，直接纵向flex，给定top-margin然后外部flex align-items:start
- 写完web发现让写的是h5? 
- 解决: 迁移样式: postcss-px2rem 由于用的tailwindcss因此大部分都是rem，只有少数需要改改
- 发现接口查询返回的文章（例如《快速入门kotlin笔记》）重复，导致作为key的article_id重复，导致重新渲染出问题，会出现多个
- 解决: 手动去重
- CardList切换到new时右边会出现2px左右的margin，应该是内容溢出导致
- 解决: CardList添加overflow-hidden
- 无限滚动实现方案
- 采用IntersectionObserver，实现固定items数量懒加载
- 问题：函数组件ref无法直接获取
- 解决：使用findDOMNode
- 问题：ref在useEffect中是undefined
- 固定数量item加载，上方填充问题
- 解决:在最上方添加一个单独的div用来填充margin,但是概率会出现抖动
- 问题：使用url保存当前位置 or 使用状态分发保存当前位置
- 目前采用后者，优点是url清爽，缺点是各组件状态重复
- 问题：切换tab后无限加载失效
- 计划：抽象无限加载组件只接受一个update函数和一个列表，也方便以后评论使用
- 问题：在自定义组件useHitBottom中调用update函数失效
- 解决：因为使用了useCallBack，导致update被冻结，将update作为useCallback的参数后，会引发无限render；需要将update也放入useCallBack
- 问题：onblur和onclick冲突，onblur优先级更高
- 解决：优先级onMouseDown > onBlur > onClick所以使用onMouseDown代替onClick
- 问题：搜索栏伸缩问题，focus-within仅作用于直接子元素
- 解决：用js吧