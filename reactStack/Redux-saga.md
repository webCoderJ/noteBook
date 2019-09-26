## Effects

在redux-saga中，sagas都是使用generator来实现，我们从generator里yield的`plain Object`被称为Effects，effects是一个简单的对象，可以看做是发送诶middleware的指令以执行某些操作(调用异步函数、发起一个action到store，etc.)

