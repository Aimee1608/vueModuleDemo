
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev 项目文件夹名

# build for production with minification
npm run build    项目文件夹名

# build for production and view the bundle analyzer report
npm run build --report 项目文件夹名
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## axios

``` bash
#设置axios请求的唯一性
【post请求】
axios.post(url, {
	cancelGroupName: 'name' // 	 cancelGroupName为唯一性请求标识，cancelGroupName相同的所有请求同一时间只能存在一个,
	...
})
【get请求】
axios.get(url, {
	params: {
		cancelGroupName: 'filterCourse',
		...
	}
})


```
