# Suspense

#### 参考

- [知乎](https://zhuanlan.zhihu.com/p/34210780)

### 过程(原理)

- 在render函数中，我们可以写入一个异步请求，请求数据
- react会从我们缓存中读取这个缓存
- 如果有缓存了，直接进行正常的render
- 如果没有缓存，那么会抛出一个异常，这个异常是一个promise
- 当这个promise完成后（请求数据完成），react会继续回到原来的render中（实际上是重新执行一遍render），把数据render出来
- 完全同步写法，没有任何异步callback之类的东西

```flow
render=>start: render
async=>operation: 请求/异步
error=>operation: Error: Pomise
errorStatus=>operation: resolved
cache=>condition: Cache
end=>end: End render

render->async->cache
cache(yes)->end
cache(no)->error->errorStatus
errorStatus(right)->async
```