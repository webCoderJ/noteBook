function $fetch(method, url, params){
    if(fetch){
        fetch(url, {
            mthod,
            mode: 'cors',
            headers: {
                "content-type": "application/json"
            },
            body: params,
            credentials: "include", // 是否携带 cookie
            
        })
    }
}