### Http2 新特性

- 信息载体
  - 帧
    - 在HTTP2中的最小通信单元，每个帧包括一个帧头，里面有个很小的标志，来区别属于哪个流
  - 消息
    - 一个完整的帧序列，它映射到逻辑的请求和相应消息
  - 流
    - 已经简历的连接之间的双向流动的字节，它能携带一个或多个消息
- 二进制传输
  - HTTP1.x 中采用文本方式传输数据
  - HTTP2.0中引入了新的编码机制，并且所有数据都会被分隔采用二进制格式编码，使得体积更小
- 请求和响应的多路复用
  - 新的二进制帧、流层，解决了HTTP1.x每个连接只能被使用一次的情况
  - 多个请求可以复用单个TCP连接
  - 通过帧、流层来对信息拆分交错传输，在服务端进行组装
- Header压缩
  - HPACK算法来压缩Header以减少文本型数据的体积
- 服务端Push
  - 服务端可以向客户端推送请求之外的资源。
- QUIC