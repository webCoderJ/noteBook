> boomerang是一个JavaScript库，用于衡量真实用户所经历的页面加载时间，通常称为RUM（实际用户测量）。 它能够将此数据发送回您的服务器以进行进一步分析。 通过回旋镖，您可以确切了解用户对您网站的看法。
>
> 除了页面加载时间外，boomerang还可以衡量用户网络浏览体验的性能时间，指标和特征。 您所要做的就是将其包含在您的网页中并调用BOOMR.init（）方法。 捕获性能数据后，它将被映射到您选择的URL。
>
> boomerang旨在成为一个高效灵活的库，可以根据您的网站需求进行调整。 它具有广泛的插件架构，可与传统和现代网站（包括单页应用程序）配合使用。
>
> boomerang的目标是不影响页面的加载时间（避免观察者效果。它可以以异步方式加载，即使boomerang.js不可用也不会延迟页面加载。

- 浏览器
  - IE6 + 
- 捕获项
  - 页面特征，例如URL和Referrer
  - 总页面加载时间（通过NavigationTiming，如果可用）
  - DNS，TCP，请求和响应时间（通过NavigationTiming）
  - 浏览器特征，如屏幕大小，方向，内存使用情况，可见性状态
  - DOM特性，例如节点数，HTML长度，图像数量，脚本等
  - ResourceTiming数据（重建页面的瀑布）
  - 带宽
  - 移动连接数据
  - DNS延迟
  - JavaScript错误
  - XMLHttpRequest检测
  - 第三方分析提供商ID
  - 单页应用程序交互

### 使用

- 支持同步或者异步引用

    ```html
    <script>
    (function(d, s) {
      var js = d.createElement(s),
          sc = d.getElementsByTagName(s)[0];

      js.src="http://your-cdn.host.com/path/to/boomerang-<version>.js";
      sc.parentNode.insertBefore(js, sc);
    }(document, "script"));
    </script>
    ```

- 引入核心库和相应插件

- 打包所有插件

- ```shell
  grunt clean build
  ```

