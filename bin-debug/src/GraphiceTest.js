/**
 * Created by Lennon on 15/9/7.
 */
var GraphiceTest = (function (_super) {
    __extends(GraphiceTest, _super);
    function GraphiceTest() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.drawLine();
    }
    var __egretProto__ = GraphiceTest.prototype;
    __egretProto__.onAddToStage = function (event) {
        var shp = new egret.Shape();
        shp.graphics.beginFill(0xff0000);
        shp.graphics.lineStyle(10, 0x0000ff);
        //shp.graphics.drawRect(0,0,100,100);
        shp.graphics.drawCircle(100, 100, 50);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    __egretProto__.drawLine = function () {
        var shp = new egret.Shape();
        shp.graphics.lineStyle(5, 0xff000);
        shp.graphics.moveTo(10, 10);
        shp.graphics.lineTo(100, 100);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    return GraphiceTest;
})(egret.DisplayObjectContainer);
GraphiceTest.prototype.__class__ = "GraphiceTest";
//# sourceMappingURL=GraphiceTest.js.map