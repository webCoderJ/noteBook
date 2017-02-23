 Stock_game.prototype = {
            constructor: Stock_game,
            // 初始化游戏方法-主循环-调用方法
            init: function () {
                var _this = this;
                //开启创建方块功能
                this.create_blocks();

                //开启键盘控制
                //this.key_ctrl();

                (function loop() {
                    // 更新数据
                    _this.updata();
                    //渲染画布
                    _this.render();
                    //开启miss判断
                    _this.MainController().judge_miss();

                    //开启游戏结束功能
                    _this.MainController().gameOverChecker();

                    // 原生动画引擎
                    var requestAnimationFrame = window.requestAnimationFrame
                        || window.mozRequestAnimationFrame
                        || window.webkitRequestAnimationFrame
                        || window.msRequestAnimationFrame
                        || setInterval;

                    //如果游戏结束,停止渲染
                    if (!_this.isGameOver) {
                        requestAnimationFrame(loop)
                    }
                })();

                //DEBUG 重复绑定事件
                this.FirstLoaded = true;
            },

            /**
             * 初始化资源
             * 资源加载 - 初始化资源尺寸
             * @param callback
             */
            initialRes: function (callback) {
                var imgs = {};
                var count = 0;
                var _this = this;
                var res = this.resConfig;
                // 每次有图片完成加载之后都执行这个函数，如果所有图片都加载完成则执行callback函数
                function loadHandler() {
                    count++;
                    if (count >= res.length) {
                        // 将拿到的图片资源放在游戏对象上
                        _this.imgs = imgs;

                        //生成配置单
                        //初始化方块的间隔
                        var block_width = imgs.rise_bar.width;
                        var amount = parseInt(_this.cur_w / block_width);
                        var interval = _this.cur_w / 15;
                        //console.log('方块间隔' + interval);
                        //console.log('当前屏幕最多方块数' + amount);
                        //动态生成方块位置数组
                        for (var i = 0; i < amount; i++) {
                            _this.block.pos_x_arr.push(parseInt(interval + block_width * i));
                        }

                        //初始化判断区间
                        var judgeInfo = {judgeTopRatio: 870 / 1333, judgeHeightRatio: 90 / 1333};
                        _this.judge_top = parseInt(_this.cur_h * judgeInfo.judgeTopRatio);
                        //console.log("判定区间的top"+_this.judge_top);
                        _this.judge_bottom = parseInt(_this.cur_h * (judgeInfo.judgeTopRatio + judgeInfo.judgeHeightRatio));
                        _this.judge_interval = _this.judge_bottom - _this.judge_top;

                        //初始化方块数组 -> 用于产生方块时候使用
                        _this.block_colors = [imgs.rise_bar, imgs.fall_bar];

                        //更改loading状态
                        _this.isLoadding = false;
                        _this.loadding.trigger("hide_loadding");
                        // 重新设置count
                        count = 0;
                    }
                }

                for (var i = 0; i < res.length; i++) {
                    _this.isLoadding = true;
                    // 遍历资源数组，创建img标签
                    var img = new Image();
                    //设置图片的宽度
                    img.width = res[i].ratio * _this.cur_w;

                    img.src = res[i].path;

                    img.addEventListener('load', function () {
                        loadHandler()
                    });
                    imgs[res[i].name] = img;
                }
            },
            //请求全屏
            launchFullScreen: function (element) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            },
            // 数据更新方法，用于更新实景中的各个事物数据
            updata: function () {
                this.updata_score();
                // 更新每个方块的数据
                this.updata_blocks();
                // 提升难度
                this.updata_difficulty();
            },
            updata_score: function () {
                // 更新分数
                this.score_wt += 16.67;
                if (this.score_wt >= this.score_dt) {
                    this.score_wt -= this.score_dt;
                    this.score += this.score_curve;
                    this.score_sec += 1;
                }
            },
            // 更新每个方块的数据
            updata_blocks: function () {
                for (var i = 0; i < this.blocks.length; i++) {
                    this.blocks[i].pos_y = this.block.pos_y > 0 ? this.blocks[i].pos_y += this.block.speed : this.blocks[i].pos_y -= this.blocks[i].pos_y;
                }
            },
            updata_difficulty: function () {
                var _this = this;
                //根据时间增加下落速度
                this.diff_wt_v += 16.67;

                if (this.diff_wt_v >= this.diff_dt_v) {
                    this.diff_wt_v -= this.diff_dt_v;
                    //增加下落速度
                    _this.block.speed = _this.block.speed < _this.block.speed_max ? _this.block.speed += _this.block.speed_add : _this.block.speed;
                    console.log("当前速度----" + _this.block.speed)
                }

                this.diff_wt += 17;
                if (this.diff_wt >= this.diff_dt) {
                    this.diff_wt -= this.diff_dt;
                    //减少创建间隔时间
                    console.log("创建计时器更新");
                    //清理创建计时器
                    this.clear_TIMER();
                    //更改间隔时间
                    _this.block.create_interval = _this.block.create_interval > _this.block.create_interval_min ? _this.block.create_interval -= _this.block.create_interval_cut : _this.block.create_interval;
                    console.log('当前创建时间为----' + _this.block.create_interval);
                    //重启计时器
                    _this.create_blocks();
                }
            },
            //创建方块
            create_blocks: function () {
                var _this = this;
                function create(){
                    // 创建方块的颜色
                    var index = Math.round(Math.random());
                    var block_color = _this.block_colors[index];
                    var block = {
                        w: _this.block.w,
                        h: _this.block.h,
                        pos_x: _this.block.pos_x_arr[parseInt(Math.random() * (_this.block.pos_x_arr.length))],
                        pos_y: _this.block.start_y,
                        color: block_color,
                        speed: _this.block.speed,
                        judge_st: 0 //0为nothing -1为判断错误 -2为miss 1为正确
                    };

                    _this.blocks.push(block);
                    //console.log(_this.block.create_interval);
                    console.log("当前方块数 -> " + _this.blocks.length);
                }
                //create();
                _this.create_timer = setInterval(function () {
                    // 间隔一定时间新创建一个方块
                    create();
                }, _this.block.create_interval)
            },
            //渲染每个方块
            render_blocks: function () {
                //遍历blocks数组
                for (var i = 0; i < this.blocks.length; i++) {
                    //this.ctx.fillStyle = this.blocks[i].color;
                    //this.ctx.fillRect(this.blocks[i].pos_x, this.blocks[i].pos_y, this.blocks[i].w, this.blocks[i].h);
                    //console.log(this.blocks[i].color.height);
                    var block_height = parseInt(this.blocks[i].color.width * (45 / 170));
                    this.ctx.drawImage(this.blocks[i].color, this.blocks[i].pos_x, this.blocks[i].pos_y, this.blocks[i].color.width, block_height);
                }
                //产生一次,清理一次内存
                this.clear_RAM("normal");
            },
            //render_bloods: function () {
            //    this.ctx.fillStyle = this.blood.color;
            //    for (var i = 0; i < this.blood.amount; i++) {
            //        var start_x = this.blood.pos_x + i * (this.blood.w + this.blood.interval);
            //        this.ctx.fillRect(start_x, this.blood.pos_y, this.blood.w, this.blood.h);
            //    }
            //},
            //随机取出一个正确提示语
            random_tip: function () {
                this.right_tip = this.tips[1 + parseInt(Math.random() * (this.tips.length - 1))];
            },
            render_missTip: function () {
                var _this = this;
                if (this.miss_stu == true) {
                    this.ctx.fillStyle = this.miss_color[0];
                    this.ctx.font = '25px square';
                    this.ctx.fillText(this.miss_tip, this.cur_w / 2 - 25, this.cur_h / 2);
                    setTimeout(function () {
                        _this.miss_stu = false;
                    }, 120)
                } else if (this.miss_stu == "right") {
                    this.ctx.fillStyle = this.miss_color[1];
                    this.ctx.font = '25px square';
                    this.ctx.fillText(this.right_tip, this.cur_w / 2 - (20 * this.right_tip.length / 2 + 1), this.cur_h / 2);
                    setTimeout(function () {
                        _this.miss_stu = false;
                    }, 380)
                }
            },
            render_score: function () {
                this.real_score.html(this.score_sec + "''")
            },
            render_blood: function () {
                //根据当前的生命值数 绘制不同的图片
                var amount = this.blood.amount;
                //console.log(this.imgs);
                var bloodImg = null;
                if (amount <= 1) {
                    bloodImg = this.imgs.blood1;
                } else if (amount == 2) {
                    bloodImg = this.imgs.blood2;
                } else {
                    bloodImg = this.imgs.blood3;
                }

                var blood_height = parseInt(bloodImg.width * (55 / 308));
                this.ctx.drawImage(bloodImg, this.blood.pos_x, this.blood.pos_y, bloodImg.width, blood_height);
            },
            //清理内存
            clear_RAM: function (type) {
                if (this.blocks.length <= 0) return;
                if (type == 'normal') {
                    //第一个方块的pos_y超过设定高度的时候,清除掉
                    if (this.blocks[0].pos_y >= (this.judge_top + 100)) {
                        this.blocks.shift();
                    }
                } else if (type == 'now') {
                    this.blocks.shift();
                }
            },
            //清理计时器
            clear_TIMER: function () {
                var count = 1;
                while (count > 0) {
                    console.log("计时器清理" + count + "次");
                    clearInterval(this.create_timer);
                    count--;
                }
                count = 1;
            },
            // 渲染到画布，用于绘制景物
            render: function () {
                this.ctx.textBaseline = 'top';
                // 清除之前绘制图形
                this.ctx.clearRect(0, 0, this.cur_w + 1000, this.cur_h);
                // 绘制判定区间
                //this.ctx.fillStyle = "#fff";
                //this.ctx.fillRect(0, this.judge_top, this.cur_w, this.judge_interval);

                //绘制方块
                this.render_blocks();

                //绘制血槽
                this.render_blood();

                //绘制miss
                this.render_missTip();

                //绘制分数
                this.render_score();
            },
            //控制组
            MainController: function () {
                var _this = this;

                function find_block() {
                    if (_this.blood.amount <= 0 || _this.blocks.length <= 0) {
                        return;
                    }
                    return 0;
                }

                function decrease_blood() {
                    _this.blood.amount = _this.blood.amount > 0 ? _this.blood.amount - 1 : _this.blood.amount;
                    console.log('当前生命值----------' + _this.blood.amount);
                    if (_this.blood.amount <= 0) {
                        _this.isGameOver = true;
                        //触发gameover事件
                        _this.game_box.trigger("game_over");
                    }
                }

                function increase_score() {
                    _this.score += 150;
                }

                return {
                    /**
                     * 判定当前方块的坐标
                     * 返回坐标是否在判定区间内的布尔值
                     */
                    judge_coord: function () {
                        if (_this.blood.amount <= 0 || _this.blocks.length <= 0) {
                            return;
                        }

                        var index = find_block();
                        var block_height = parseInt(_this.blocks[index].color.width * (45 / 170));
                        //按键按下的时候获得当前第一个block的坐标
                        var y_coord = _this.blocks[index].pos_y;

                        if ((y_coord + block_height >= _this.judge_top) && (y_coord <= _this.judge_bottom)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    /**
                     * 获取当前的按钮或者按健所对应的值
                     * 返回布尔值
                     * 涨为1
                     * 跌为0
                     */
                    judge_color: function () {
                        if (_this.blood.amount <= 0 || _this.blocks.length <= 0) {
                            return;
                        }
                        var index = find_block();
                        var cur_color = _this.blocks[index].color;
                        cur_color = cur_color == _this.block_colors[index] ? 1 : 0;
                        return cur_color;
                    },
                    /** 生命条
                     * decrease_blood
                     */
                    decrease_blood: decrease_blood,
                    //miss
                    /**
                     * 判断方块下落时的miss状态
                     * 改变方块的judge_st
                     */
                    judge_miss: function () {
                        if (_this.blood.amount <= 0 || _this.blocks.length <= 0) {
                            return;
                        }

                        //var block_height = parseInt(_this.blocks[0].color.width * (45 / 170));

                        if (_this.blocks[0].pos_y > _this.judge_bottom) {
                            _this.blocks[0].judge_st = -2;
                            // 更改miss状态
                            _this.miss_stu = true;
                            _this.blocks.shift();
                            decrease_blood();
                        }
                    },
                    /**
                     * 判断按键时候方块下落时的miss状态
                     * 改变方块的judge_st
                     */
                    judge_acMiss: function () {
                        if (_this.blood.amount <= 0 || _this.blocks.length <= 0) {
                            return;
                        }

                        if (_this.blocks[0].pos_y < _this.judge_top) {
                            _this.blocks[0].judge_st = -2;
                            // 更改miss状态
                            _this.miss_stu = true;
                        }
                    },
                    //分数
                    increase_score: increase_score,
                    /**
                     * 停止所有的计时器,updata 游戏不再执行
                     * 收集游戏数据
                     */
                    gameOverChecker: function () {
                        if (_this.isGameOver) {
                            _this.clear_TIMER()
                        }
                    }
                };
            },
            //控制页面中按钮的动作
            /**
             * 涨跌代码在判断颜色函数中会用到
             */
            btn_ctrl: function () {
                var MC = this.MainController();
                var _this = this;
                this.fall_btn.on('touchstart', function () {

                    if (_this.blocks.length < 1) {
                        return false;
                    }

                    //添加激活样式
                    var color_flag = MC.judge_color();
                    var coord_flag = MC.judge_coord();
                    MC.judge_acMiss();

                    if (color_flag == 0 && coord_flag) {
                        //判断正确
                        MC.increase_score();
                        _this.random_tip();
                        _this.miss_stu = "right";
                    } else {
                        //减分
                        MC.decrease_blood();
                    }
                });

                this.rise_btn.on('touchstart', function () {

                    if (_this.blocks.length < 1) {
                        return false;
                    }

                    color_flag = MC.judge_color();
                    coord_flag = MC.judge_coord();
                    MC.judge_acMiss();
                    if (color_flag == 1 && coord_flag) {
                        //判断正确
                        MC.increase_score();
                        _this.random_tip();
                        _this.miss_stu = "right";
                    } else {
                        MC.decrease_blood();
                    }
                });

                this.fall_btn.on('touchend', function () {
                    //判断完成,清除第一个方块
                    _this.clear_RAM('now');
                });

                this.rise_btn.on('touchend', function () {
                    //判断完成,清除第一个方块
                    _this.clear_RAM('now');
                });
            }
        };