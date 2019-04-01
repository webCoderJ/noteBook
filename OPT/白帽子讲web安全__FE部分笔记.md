#### 安全三要素

- 机密性(用户密码，身份信息等)，机密性要求保护数据内容不能泄露，加密是实现机密性要求的常见手段。

- 完整性，完整性则要求保护数据内容是完整、没有被篡改的。常见的保证一致性的技术手段是数字

- 可用性，可用性要求保护资源是"随需可得"，`always available`

  

#### 安全评估

```flow
step1=>start: 资产登记划分
step2=>operation: 威胁分析
(STRIDE)
step3=>operation: 风险分析
step4=>end: 确认解决方案

step1->step2->step3->step4
```

#### ClickJacking

- 点击劫持ClickJacking，通过元素覆盖原网页，劫持用户点击
  - iframe点击劫持
  - Flash点击劫持
  - 图片覆盖劫持(XSIO)，跳转到目的页面
  - 拖拽劫持与数据窃取

> ClickJacking 相对于 XSS 与 CSRF 来说，因为需要诱使用户与页面产生交互行为，因此实
> 施攻击的成本更高，在网络犯罪中比较少见。但 ClickJacking 在未来仍然有可能被攻击者利用
> 在钓鱼、欺诈和广告作弊等方面，不可不察。

#### XSS

- 反射型XSS

  - 用户输入的scrpit脚本，被当作html数据返回到页面模板中，导致执行不可预料的程序。

- 存储型XSS

  - 把上述代码存储在服务器，导致每个用户访问这篇文章，都会执行这个恶意代码

- DOM Based XSS

  - 通过恶意代码修改页面DOM元素以达到某种攻击意图

- XSS进阶攻击

  - 攻击载体代码被称为 XSS Payload

  - Cookie劫持

    - 获得用户登陆token
    - 防御Cookie劫持
      - 服务端把Cookie和客户端绑定
        - IP绑定，但是IP也可以伪造
        - 客户机器指纹绑定

  - 植入各种恶意代码，一切能用JS完成的事情，都可以通过XSS Payload完成

  - XSS钓鱼

    - 在某个页面埋下一个链接，跳转到指定的(与源站相同)的登陆页，诱导用户输入账户密码

  - 识别用户浏览器和相关客户机信息

    - 客户端指纹
    - userAgent等
    - 操作系统
    - 检测客户机是否安装某软件
      - 终于知道了为啥之前做页面没法拉取用户软件列表了
      - 只有通过webview唤起的方式检测用户是否安装
      - 通过收集常见软件的classId，就可以扫描用户电脑中安装的软件列表
        - 在Flash的ActionScript中读取 system.capabilities
      - 不同浏览器有不同的实现方案
      - 扫描用户安装的浏览器插件

  - CSS History Hack

    - 通过CSS，发现用户曾经访问过的网站，原理是利用style的visited属性

    ```js
    // Loop through checking to see if the vitime has been there!
    var websites = [
        "login.yahoo.com",
        "mail.google.com"
        // ...
    ]
    
    for (var i = 0; i < websites.length; i++) {
        let link = document.createElement('a');
        link.id = "id" + i;
        link.href = websites[i];
        link.innerHTML = websites[i];
     	
        /* create a custom style tag for the specific link. Set the CSS cisited selector to a known value, in this case red*/
        document.write('<style>');
        document.write('#id' + i + ":visited { color: #FF0000 }");
        document.write('</style>');
        
        /*quickly add adn remove the link from the DOM with enough time to save the visible computed color.*/
        document.body.appendChild(link);
        let color = document.defaultView.getComputedStyle(link, null).getPropertyValue('color');
        document.body.remove(link);
        
        /*check to see if the link has been visited if the computed color is red*/
        let item = document.createElement('li');
        item.appendChild(link);
        if(color === 'rgb(255,0,0)'){
            document.getElementBuId('visited').appendChild(item);
        } else {
             document.getElementBuId('not-visited').appendChild(item);
        }
    }
    
    // 这个漏洞早已被修复
    ```

  - 获取用户真是IP地址(需要用户本地安装有java环境 JRE)

  - XSS攻击平台

    - AttackApi
    - BeFF
    - XSS-Proxy

  - 终极武器 XSS Worm

  - XSS构造技巧

- 能想到的攻击方式

  - 通过劫持用户网络，修改网站代码
  - 发现源站XSS漏洞
    - 直接把用户输入的代码或者其他地方的数据作为脚本执行了
    - 把代码不经过滤当作html解析

- 攻击技巧

  - 利用字符编码

  - 绕过长度限制

  - 使用base标签，base标签的作用是为页面上所有使用相对路径的标签提供host

    - 当攻击成功之后，可以使用这个标签来替换源站的资源，比如script，img等

  - window.name 利用这个属性可跨域的特性

    ...

- XSS防御

  - 现代很多浏览器都内置了对抗XSS的措施，但对于网站设计，仍要在安全方面花精力
  - HttpOnly，预防Cookie劫持
    - httpOnly是由微软提出，至今成为一个标准。浏览器禁止JS访问带有HttpOnly的Cookie

  - 输入检查，对用户输入的字符进行检查，过滤可能又恶意字符
  - 输出检查，检查输出到页面的字符是否安全，是否在设计范围内
  - 编码防御，避免错误使用编码导致到达用户浏览器中的代码可被黑客利用

#### CSRF Cross Site Request Forgery(跨站请求伪造)

> 诱导用户或自行伪造站点请求以达到攻击意图

- Cookie，攻击者利用浏览器可发送第三方cookie的漏洞，伪造请求，致使用户数据被修改，iframe img script link等标签可以发送它所请求页面的session cookie
- P3P头的副作用

> P3P Header是W3C制定的一项关于隐私的标准，The platform for privacy preferences,如果网站返给浏览器的HHTP头中包含P3P头，则在某种程度上来说，将允许浏览器发送第三方Cookie。

- GET? POST？
  - 非GET请求确实在安全性上会好一些(仅仅只是攻击难度，只要诱导用户打开攻击者的页面就可以)，如果在CSRF中，如果操作用户数据的接口是GET，同时该网站存在CSRF漏洞，则很容易被黑客利用。img、script、iframe等标签都可跨域GET请求
  - 但是真的有XSS漏洞的话，攻击者可轻易利用表单或JS伪造任何请求
  - Flash也可以有很多方式(如form标签)发起网络请求，包括非GET请求
- CSRF Worm
- CSRF的防御
  - 验证码
  - referer Check，HTTP Referer是header的一部分，当浏览器向web[服务器](https://baike.baidu.com/item/%E6%9C%8D%E5%8A%A1%E5%99%A8)发送请求的时候，一般会带上Referer，告诉服务器我是从哪个页面链接过来的，服务器基此可以获得一些信息用于处理。
    - 检查请求是否来自合法“源”
    - 但是服务器并非任何时候都能拿到referer，
      - 很多用户为了防止隐私泄露，禁止了referer的发送
      - 浏览器从HTTPS跳转到HTTP，也不会发送referer
  - 参数加密，让攻击者无法伪造合法请求

#### web框架安全

- MVC 框架安全

- 在 MVC 框架中，通过切片、过滤器等方式，往往能对数据进行全局处理，这为设计安全方案提供了极大的便利

- 模板引擎与 XSS 防御

  - XSS防御手段 `输出编码`

  - 需要针对不同上下文的 XSS 攻击场景，使用不同的编码方式

    - 在 HTML 标签中输出变量
    - 在 HTML 属性中输出变量
    - 在script标签中输出变量
    - 在事件中输出变量
    - 在css中输出变量
    - 在URL中输出变量
