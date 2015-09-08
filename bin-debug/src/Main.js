var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    __egretProto__.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    __egretProto__.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    __egretProto__.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    __egretProto__.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    __egretProto__.createGameScene = function () {
        var bg = this.createBitmapByName("bgImage");
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        bg.width = stageW;
        bg.height = stageH;
        this.addChild(bg);
        this._state = -1;
        //游戏的各个界面通过状态机实现，首先进入的是游戏介绍界面
        this.state = Main.STATE_INTRO;
        //this.state = Main.STATE_GAME;
        //this.state = Main.STATE_OVER;
        //var curState:egret.DisplayObject = new StateIntro();
        //this.addChild(curState);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    __egretProto__.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Object.defineProperty(__egretProto__, "state", {
        /**
         *设置舞台的方法
         */
        set: function (s) {
            if (this._state != s) {
                this._state = s;
                if (this._curState && this._curState.parent) {
                    this.removeChild(this._curState);
                }
                switch (this._state) {
                    case Main.STATE_INTRO:
                        //创建游戏介绍界面
                        this._curState = new StateIntro();
                        //当点击游戏介绍界面后，进入游戏主界面
                        this._curState.addEventListener("GameStart", this.gameStart, this);
                        this.addChild(this._curState);
                        break;
                    case Main.STATE_GAME:
                        //创建游戏主界面
                        this._curState = new PhysicsTest();
                        //当游戏结束后进入游戏结束界面
                        this._curState.addEventListener("GameOver", this.gameOver, this);
                        this.addChild(this._curState);
                        break;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.gameStart = function (event) {
        this.state = Main.STATE_GAME;
    };
    Main.STATE_INTRO = 1;
    Main.STATE_GAME = 2;
    Main.STATE_OVER = 3;
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
//# sourceMappingURL=Main.js.map