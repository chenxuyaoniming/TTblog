### 缓存

网络
- 强缓存
- 协商缓存

本地
- cookie
- localStorage
- sessionStorage


**强缓存**  
cache-control优先，cache-control 的max-age字段表示缓存时间（秒），expires保存一个服务器返回的过期时间（相对服务器的时间）  

**协商缓存**  

Etag保存服务器资源标示Id，每次请求服务器时对比id是否变更，来决定是否重新获取数据，Last-Modified保存服务器资源的最后修改时间，通过对比前后资源的最后修改时间是否一致来决定是否重新获取数据  

**优先级**  

cache-control  > expires > Last-Modified = Etag