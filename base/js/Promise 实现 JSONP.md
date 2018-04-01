## Promise 实现 JSONP

```js
; (function (win) {
    win['PJsonP'] = PJsonP;
    function PJsonP() {
        var _this = this;
        _this.options = {
            uid: 0,
            prefix: '__callback_for_jsonp_',
            overtime: 3000,
            callbackParam: 'callback'
        }
        _this.timer = undefined
        _this.grabData = undefined
        _this.closure = undefined;
        _this.script = undefined
    }
    PJsonP.prototype = {
        constructor: PJsonP,
        clear: function () {
            var _this = this
            win[_this.closure] = null
            _this.script.parentNode.removeChild(_this.script)
            clearTimeout(_this.timer)
        },
        getUrl: function (src) {
            var _this = this
            this.options.callbackName = this.options.prefix + this.options.uid++
            return `${src}&${_this.options.callbackParam}=${_this.options.callbackName}`
        },
        createScript: function (src) {
            var script = document.createElement('script');
            script.src = this.getUrl(src)
            this.script = script
            return script
        },
        dispatch: function (options) {
            var _this = this
            this.options = options ? Object.assign({}, this.options, options) : this.options
            document.body.appendChild(_this.createScript(options.src))
            return new Promise(function (resolve, reject) {
                win[_this.options.callbackName] = function (data) {
                    _this.grabData = data;
                    resolve(data)
                }

                var timerId = setTimeout(function () {
                    reject('[PJsonP] dispatch overtime!')
                    _this.clear()
                }, _this.options.overtime)
                
                _this.closure = _this.options.callbackName
                _this.timer = timerId
            })
        }
    }
}(window))
```



