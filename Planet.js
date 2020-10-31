export default class Planet {
    constructor(x,y,tagName,imageComponent){
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;

        this.tagName = tagName;
        this.image = imageComponent;
    }
}