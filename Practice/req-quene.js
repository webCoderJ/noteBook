let max = 10;
let pendingQuene = [];
let IdleQuene = [];

function onReq(req){
    if(pendingQuene.length < max){
        pendingQuene.push(req);
        req.send();
    } else {
        IdleQuene.push(req);
    }
}

function onRes(req){
    let index = pendingQuene.indexOf(req);
    if(index != -1){
        pendingQuene.splice(index, 1);

        IdleQuene.pop().send();
    }
}
