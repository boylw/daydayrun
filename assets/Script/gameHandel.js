// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_hero: cc.Animation,
        m_jump_btn: cc.Button,
        m_roll_btn: cc.Button
    },

    onLoad() {
        cc.log('游戏开始了');
        // this.m_Hero.play('run');
        this.m_roll_btn.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this); // 什么事件，对应回调，谁触发
        this.m_roll_btn.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this); 
        this.m_roll_btn.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this); 
    },

    start() {
    },
    touchStart() {
        if ((this.m_hero.currentClip && this.m_hero.currentClip.name == 'jump')) {
            return;
        }
        this.m_hero.play('roll');
        this.m_hero.node.y = -72;
    },
    touchEnd() {
        if (this.m_hero.currentClip && this.m_hero.currentClip.name == 'jump') {
            return;
        }
        this.m_hero.play('run');
        this.m_hero.node.y = -65;
    },

    jumpFinish() {
        cc.log('跳跃结束了')
        this.m_hero.play('run');
    },

    jumpHandel(target, data) {
        if ((this.m_hero.currentClip && this.m_hero.currentClip.name == 'roll') || (this.m_hero.currentClip && this.m_hero.currentClip.name == 'jump')) {
            return;
        }
        cc.log(this.m_hero.node);
        let moveToUp = cc.moveTo(0.6, cc.v2(this.m_hero.node.x, -15)).easing(cc.easeCubicActionOut());
        let moveToDown = cc.moveTo(0.6, cc.v2(this.m_hero.node.x, -65)).easing(cc.easeCubicActionIn());
        let callFun = cc.callFunc(this.jumpFinish.bind(this));
        let sequence = cc.sequence(moveToUp, moveToDown, callFun);
        this.m_hero.node.runAction(sequence);
        this.m_hero.play('jump');
    },
    // update(dt) {},
});