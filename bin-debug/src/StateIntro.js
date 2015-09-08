/**
 * Created by Lennon on 15/9/8.
 */
var StateIntro = (function (_super) {
    __extends(StateIntro, _super);
    function StateIntro() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = StateIntro.prototype;
    __egretProto__.onAddToStage = function (event) {
        this.init();
    };
    __egretProto__.init = function () {
        //游戏介绍界面，只有一个开始按钮和一个背景
        var btnStart = new egret.Sprite();
        btnStart.graphics.beginFill(0xffff00);
        btnStart.graphics.drawRect(0, 0, 200, 100);
        btnStart.graphics.endFill();
        btnStart.width = 200;
        btnStart.height = 100;
        btnStart.touchEnabled = true;
        btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tamHandler, this);
        btnStart.x = (this.stage.stageWidth - 200) / 2;
        btnStart.y = (this.stage.stageHeight - 100) / 2;
        //this.addChild(btnStart);
        this._bg = new egret.Bitmap();
        this._bg.texture = RES.getRes("startPage");
        this._bg.width = this.stage.stageWidth;
        this._bg.height = this.stage.stageHeight;
        this._bg.touchEnabled = true;
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tamHandler, this);
        this.addChild(this._bg);
    };
    __egretProto__.tamHandler = function (e) {
        //在界面上点击下，就开始游戏啦
        this.dispatchEvent(new egret.Event("GameStart"));
    };
    return StateIntro;
})(egret.DisplayObjectContainer);
StateIntro.prototype.__class__ = "StateIntro";
//# sourceMappingURL=StateIntro.js.map