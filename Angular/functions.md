## about some functions

+ ($sope || $rootScope).$new() //创建一个新的子scope，将继承parentScope

+ $compile()();
  $compile的功能是,将一个html字符串或者一个DOM进行编译,最后返回一个链接函数,这个链接函数可以用于将作用域(Scope)和模版"链接"到一起.编译的过程,其实质是遍历DOM树,匹配和处理DOM上的各种指令的过程.

