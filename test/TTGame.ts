/// <reference path="../ttgame.d.ts">

/** 广告位ID */
const PID = {
    VIDEO: 'xxxxxxxxxxxxxxxxxx',
    BANNER: 'yyyyyyyyyyyyyyyyyy'
}

class TTGame {
    PID = PID;
    targetBannerAdWidth = 200; // 
    bannerAd = null; // banner广告实例
    videoAd = null; // 视频广告实例
    videoData = null; // 视频数据

    init() {
        tt.showShareMenu({ withShareTicket: false });
        tt.onShareAppMessage((res) => {
            console.log(res.channel);
            return {
                title: '吃一块好玩不发胖的煎肉，䃼心又走脑—_—',
                imageUrl: '',
                query: ''
            }
        });
    }

    login() {
        console.log('ttgame login');

    }

    /**
     *  分享
     * https://developer.toutiao.com/docs/game/share/tt.shareAppMessage.html
     */
    share(data) {
        if (!data) data = {};
        if (!data.title) data.title = '';
        if (!data.imageUrl) data.imageUrl = '';
        tt.shareAppMessage(data);
    }

    /**********************************************************/
    /** 创建视频广告 */
    createVideo() {
        const adUnitId = this.PID.VIDEO;
        this.videoAd = tt.createRewardedVideoAd({ adUnitId: adUnitId });
        return this.videoAd;
    }
    /**
     * 观看视频
     * https://developer.toutiao.com/docs/open/createRewardedVideoAd.html
     */
    watchVideo(data) {
        if (!cc.sys.isMobile) return;
        if (!this.videoAd) this.createVideo();
        this.videoData = data;
        this.videoAd.onClose(this.onVideoClose);
        this.videoAd.onError(this.onVideoClose);
        this.videoAd.show().then(() => { console.log('广告显示成功') });
    }
    /** 视频关闭 */
    onVideoClose(res) {
        console.log('close广告');
        const data = this.videoData;
        if (res.isEnded) {
            console.log('给予奖励');
            data.success && data.success();
        } else {
            console.log('没有看完广告');
            data.fail && data.fail('NO_COMPLETE');
        }
        this.resetVideo();
    }
    /** 视频错误 */
    onVideoError(res, data) {
        console.error('广告error => ' + res.errCode + ' : ' + res.errMsg);
        data.fail && data.fail('ERROR')
        this.resetVideo();
    }
    /** 重置视频广告 */
    resetVideo() {
        this.videoAd.offClose(this.onVideoClose);
        this.videoAd.offError(this.onVideoError);
        this.videoData = null;
    }

    /** 
     * 显示banner
     * https://developer.toutiao.com/docs/open/createBannerAd.html
     */
    showBanner(bool) {
        if (!cc.sys.isMobile) return;
        if (bool) {
            this.createBanner();
            this.bannerAd && this.bannerAd.show();
        } else {
            this.bannerAd && this.bannerAd.destroy();
        }
    }
    /** 创建banner */
    createBanner() {
        const { windowWidth, windowHeight } = tt.getSystemInfoSync();
        if (windowHeight <= 1280) { this.targetBannerAdWidth = 130 }
        var targetBannerAdWidth = this.targetBannerAdWidth;
        var top = windowHeight - (targetBannerAdWidth / 16 * 9); // 根据系统约定尺寸计算出广告高度
        var left = (windowWidth - targetBannerAdWidth) / 2;

        this.bannerAd = tt.createBannerAd({
            adUnitId: this.PID.BANNER,
            style: {
                left: left,
                top: top,
                width: targetBannerAdWidth
            }
        });
        return this.bannerAd;
    }

    /** 
     * 数据上报： 自定义上报接口
     * https://developer.toutiao.com/docs/open/reportAnalytics.html
     */
    report(eventName, data) {
        tt.reportAnalytics(eventName, data);
    }

    /** 获取远程图片 */
    getRemoteImage(url, cb) {
        var myImg = tt.createImage();
        myImg.onload = function () {
            var texture = new cc.Texture2D();
            texture.initWithElement(myImg);
            texture.handleLoadedTexture();
            cb && cb(null, texture);
        }
        myImg.onerror = function (err) {
            if (!myImg || myImg.src != url) return;
            cb && cb(err);
        }
        myImg.src = url;
    }
}

export default TTGame;