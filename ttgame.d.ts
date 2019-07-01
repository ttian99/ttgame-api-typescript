type noParam = () => void;

/** 标准对象函数参数 */
interface res {
    errMsg: string
}
/** 标准对象输入 */
interface standardInput {
    success?: (res: res) => void;
    fail?: (res: res) => void;
    complete?: (res: res) => void;
}

type listener = (res: noParam) => void;

/** banner样式 */
interface StyleObject {
    left: number,
    top: number,
    width: 128
}
/** 创建banner属性 */
interface CreateBannerAdOptions {
    adUnit: string,
    style: StyleObject
}
/** banner对象 */
interface BannerAd {
    onLoad: (listener: listener) => void;
    show: () => Promise<any>;
    hide: () => Promise<any>;
}

/** 开放能力api */
interface OpenApis {
    /** 创建banner */
    createBannerAd: (options: CreateBannerAdOptions) => BannerAd;
}
/** 显示分享按钮参数 */
interface showShareMenuOpts extends standardInput {
    /** 是否使用带 shareTicket 的转发 (必填) */
    withShareTicket: boolean
}
/** 监听分享回调函数的参数 */
interface onShareAppMessageRes {
    channel?: 'article' | 'video' | 'token'
}
/** 分享接口附加信息对象 */
interface shareAppMessageExtra {
    /** 视频地址 */
    videoPath?: string,
    /** 视频话题(只在抖音可用) */
    videoTopics?: Array<string>,
    /** 是否分享为挑战视频（头条支持） */
    createChallenge?: false
}
/** 监听分享接口返回对象 */
interface onShareAppMessageReturnObject {
    /** 转发标题，不传则默认使用当前小游戏的名称 */
    title?: string,
    /** 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径，显示图片长宽比推荐 5: 4 */
    imageUrl?: string,
    /**查询字符串，必须是 key1 = val1 & key2=val2 的格式。从这条转发消息进入后，可通过 tt.getLaunchOptionSync() 或 tt.onShow() 获取启动参数中的 query。*/
    query?: string,
    /** 附加信息 */
    extra?: shareAppMessageExtra
}
/** 分享监听的回调函数 */
type onShareAppMessageCallback = (res?: onShareAppMessageRes) => onShareAppMessageReturnObject;
/** 主动拉起转发页面参数 */
interface shareAppMessageOptions extends standardInput {
    /** 
     * 转发内容类型   
     * - article	发布图文内容   
     * - video	发布视频内容   
     * - token	口令分享，生成一串特定的字符串文本，仅头条APP支持   
     * */
    channel?: 'article' | 'video' | 'token',
    /**转发标题，不传则默认使用当前小游戏的名称。*/
    title?: string,
    /**转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径，显示图片长宽比推荐 5:4*/
    imageUrl?: string,
    /**查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 tt.getLaunchOptionSync() 或 tt.onShow() 获取启动参数中的 query。*/
    query?: string,
    /**附加信息*/
    extra?: shareAppMessageExtra,
}
/** 转发api */
interface TransmitApis {
    /** 显示当前页面的转发按钮 */
    showShareMenu: (options: showShareMenuOpts) => void;
    /** 隐藏转发按钮 */
    hideShareMenu: (options: standardInput) => void;
    /** 取消监听用户点击右上角菜单的“转发”按钮时触发的事件 */
    onShareAppMessage: (callback: onShareAppMessageCallback) => onShareAppMessageReturnObject;
    /** 监听用户点击右上角菜单的“转发”按钮时触发的事件 */
    offShareAppMessage: (callback: onShareAppMessageCallback) => void;
    /** 主动拉起转发页面 */
    shareAppMessage: (options: shareAppMessageOptions) => void;
}
// Declares
declare let tt: OpenApis & TransmitApis;