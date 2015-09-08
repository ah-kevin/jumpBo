class Main extends egret.DisplayObjectContainer {
    public static STATE_INTRO:number = 1;
    public static STATE_GAME:number = 2;
    public static STATE_OVER:number = 3;

    private _state:number;
    private textContainer:egret.Sprite;
    private _curState:egret.DisplayObject;
    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var bg:egret.Bitmap = this.createBitmapByName("bgImage");
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
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

    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     *设置舞台的方法
     */
    public set state(s:number) {
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
                    //case Main.STATE_GAME:
                    //    //创建游戏主界面
                    //    this._curState = new PhysicsTest();
                    //    //当游戏结束后进入游戏结束界面
                    //    this._curState.addEventListener("GameOver", this.gameOver, this);
                    //    this.addChild(this._curState);
                    //    break;
                    //case Main.STATE_OVER:
                    //    //创建游戏结束界面
                    //    this._curState = new StateOver();
                    //    //当点击重新开始游戏时，再次进入游戏主界面
                    //    this._curState.addEventListener("GameStart", this.gameStart, this);
                    //    this.addChild(this._curState);
                    //    break;
            }
        }
    }

    private gameStart(event:egret.Event){
        this.state=Main.STATE_GAME;
    }
}


