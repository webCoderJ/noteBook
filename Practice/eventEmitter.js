class EventEmitter {
    constructor() {
        this.subs = {};
    }

    addEvent(name, cb) {
        if (this.subs.hasOwnProperty(name)) {
            this.subs[name].push(function() {
                setTimeout(cb, 0);
            });
        } else {
            this.subs[name] = [
                function() {
                    setTimeout(cb, 0);
                }
            ];
        }

        console.log(this.subs);
    }

    triggerEvent(name) {
        if (this.subs.hasOwnProperty(name)) {
            this.subs[name].map(fn => fn());
        }
    }

    clearEvent(name){
        if (this.subs.hasOwnProperty(name)) {
            this.subs[name] = null;
            delete this.subs[name];
        }
    }
}

let evtBus = new EventEmitter();

evtBus.addEvent("FUCK_PM", function(){
    console.log("STAND UP AND FUCK PM");
});

evtBus.addEvent("FUCK_PM", function(){
    console.log("JUMP UP AND FUCK PM");
});

evtBus.addEvent("FUCK_PM", function(){
    console.log("FLY UP AND FUCK PM");
});

setTimeout(_ => {
    evtBus.triggerEvent("FUCK_PM");
}, 2000);