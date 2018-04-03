// 问题是primise的使用方法以及promise的一个then中抛出了错误，下面的then还会执行吗？

var pro = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('promise resolved!')
    }, 1000)
})

pro
    .then(data => {
        console.log('then 1', data)

        return {
            then: 'then1',
            data: data
        }
        // 已经return 不会执行...
        throw new Error('then 1 err')
    })
    .then(data => {
        // 可以执行到
        console.log('then2', data)
    })


pro
    .then(data => {
        console.log('then 1')
        throw new Error('then 1 err')
    })

    .then(data => {

        console.log('then2')
    }, err => {
        console.log('then2 err')
        console.log(err)
    })

    // then 1 promise resolved!
    // VM177:28 then 1
    // VM177:22 then2 {then: "then1", data: "promise resolved!"}
    // VM177:36 then2 err
    // VM177:37 Error: then 1 err
    //     at pro.then.data (<anonymous>:29:15)

/**
 * 结论： 当在then1中抛出错误的时候，then2中的err方法会被触发执行
 */