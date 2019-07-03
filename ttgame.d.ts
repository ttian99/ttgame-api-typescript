/**
 * ********************************************
 *      ┌─┐       ┌─┐ + +
 *   ┌──┘ ┴───────┘ ┴──┐++
 *   │                 │
 *   │       ───       │++ + + +
 *   ███████───███████ │+
 *   │                 │+
 *   │       ─┴─       │
 *   │                 │
 *   └───┐         ┌───┘
 *       │         │
 *       │         │   + +
 *       │         │
 *       │         └──────────────┐
 *       │                        │
 *       │                        ├─┐
 *       │                        ┌─┘
 *       │                        │
 *       └─┐  ┐  ┌───────┬──┐  ┌──┘  + + + +
 *         │ ─┤ ─┤       │ ─┤ ─┤
 *         └──┴──┘       └──┴──┘  + + + +
 * *******************************************
 *        ttgame-api-typescript 
 *        Author: Monkey-Jiao
 *        Version: 0.0.1
 * *******************************************
 */
declare namespace tt {
    /** 标准对象输入 */
    interface standardInput {
        success?: (res: res) => void;
        fail?: (res: res) => void;
        complete?: (res: res) => void;
    }
    /** 空参数回调函数 */
    type noParamListener = () => void;
    type videoCloseListener = (res: videoCloseRes) => void;
    type videoErrorListener = (res: videoErrorRes) => void;
    /** 标准对象函数参数 */
    interface res { errMsg: string }
    /** 视频广告关闭回调函数参数 */
    interface videoCloseRes {
        /** 是否完整看完视频 */
        isEnded: boolean
    }
    /** 
     * 视频广告错误回调函数参数    
     * [广告错误码说明(AdError)](https://developer.toutiao.com/docs/open/AdError.html)
     */
    interface videoErrorRes {
        /** 错误码 */
        errCode: Number,
        /** 错误信息 */
        errMsg: String,
    }

    /** 创建banner属性 */
    interface CreateBannerAdOptions {
        adUnitId: string,
        style: StyleObject
    }
    /** banner样式 */
    interface StyleObject {
        left: number,
        top: number,
        /** width默认值 128 */
        width: number
    }
    /** banner对象 */
    interface bannerAd {
        onLoad: (listener: noParamListener) => void;
        show: () => Promise<any>;
        hide: () => Promise<any>;
    }
    /** 自定义分析数据 */
    interface reportData {
        /** 配置中的字段名 */
        key: string,
        /** 上报的数据 */
        value: number | string | boolean
    }
    /**
     * videoAd实例。  
     * 提示：全局只有一个videoAd实例，重复创建没有用 
     * */
    interface videoAd {
        /** 
         * 当广告素材加载出现错误时，可以通过load方法手动加载。   
         * 该方法返回一个Promise。 如果广告已经自动拉取成功，调用该方法返回一个resolved Promise； 
         * */
        load: () => Promise<any>;
        /**
         * 绑定load事件的监听器。    
         * 广告组件成功拉取广告素材时会触发load事件的监听器。
         */
        onLoad: (listener: noParamListener) => void;
        /** 解除绑定load事件的监听器 */
        offLoad: (listener: noParamListener) => void;
        /** 
         * 广告创建后默认是隐藏的，可以通过该方法显示广告。   
         * 该方法返回一个 Promise 对象。当广告组件正常获取素材时，该Promise对象会是一个resolved Promise。当广告组件发生错误时，会是一个rejected Promise，参数与error事件监听器获得的参数相同。 
         * */
        show: () => Promise<any>;
        onClose: (listener: videoCloseListener) => void;
        offClose: (listener: videoCloseListener) => void;
        /** 
         * 绑定error事件的监听器。    
         * 广告组件拉取广告素材时如果发生错误，会触发error事件的监听器。监听器会获得一个包含errCode和errMsg属性的对象参数。     
         * [广告错误码说明(AdError)](https://developer.toutiao.com/docs/open/AdError.html)
         * */
        onError: (listener: videoErrorListener) => void;
        /** 解除绑定error事件的监听器 */
        offError: (listener: videoErrorListener) => void;
    }
    /** 显示分享按钮参数 */
    interface showShareMenuOpts extends standardInput {
        /** 是否使用带 shareTicket 的转发 (必填) */
        withShareTicket: boolean
    }
    /** 分享监听的回调函数 */
    type onShareAppMessageCallback = (res?: onShareAppMessageRes) => onShareAppMessageReturnObject;
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
    /** 分享接口附加信息对象 */
    interface shareAppMessageExtra {
        /** 视频地址 */
        videoPath?: string,
        /** 视频话题(只在抖音可用) */
        videoTopics?: Array<string>,
        /** 是否分享为挑战视频（头条支持） */
        createChallenge?: false
    }
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
    /** 创建更多游戏按钮输入参数 */
    interface createMoreGamesButtonOptions {
        /**按钮的类型 */
        type: 'text' | 'image',
        /** 按钮的背景图片，仅当 type 为 image 时有效。仅支持本地图片，包括代码包目录、临时文件目录和本地用户目录 */
        image?: String,
        /** 按钮上的文本，仅当 type 为 text 时有效 */
        text?: String,
        /** 按钮的样式 */
        style: createMoreGamesButtonStyle,
        /** 小游戏的启动参数 */
        appLaunchOptions?: Array<appLaunchOption>
        /** 跳转小游戏时的回调函数 */
        onNavigateToMiniGame?: Function
    }
    /** 更多游戏按钮的样式 */
    interface createMoreGamesButtonStyle {
        /** 左上角横坐标 */
        left: Number,
        /** 左上角纵坐标 */
        top: Number,
        /** 宽度 */
        width: Number,
        /** 高度 */
        height: Number,
        /** 背景颜色 */
        backgroundColor: String,
        /** 边框颜色 */
        borderColor: String,
        /** 边框宽度 */
        borderWidth: Number,
        /** 边框圆角 */
        borderRadius: Number,
        /** 文本的水平居中方式 */
        textAlign: String,
        /** 字号 */
        fontSize: Number,
        /** 文本的行高 */
        lineHeight: Number,
        /** 文本颜色 */
        textColor: String,
    }
    /** appLaunchOptions 参数为一个 Array<object> 类型，结构如下： */
    interface appLaunchOption {
        /** 要打开的小游戏 appId */
        appId: String,
        /** 查询字符串，必须是 key1 = val1 & key2=val2 的格式。可通过 tt.getLaunchOptionSync() 或 tt.onShow() 获取启动参数中的 query */
        query?: String,
        /** 需要传递给目标小游戏的数据。可通过 tt.getLaunchOptionsSync() 或 tt.onShow() 返回的 referrerInfo 字段获取对应数据 */
        extraData?: Object,
    }
    /** onNavigateToMiniGame 回调函数接收的参数 res */
    interface onNavigateToMiniGameRes {
        /** 跳转结果状态码 Int */
        errCod: Number,
        /** 跳转失败时的详细信息 */
        errMsg: String
    }
    /** 获取系统信息输入 */
    interface SystemInfoInput extends standardInput {
        success?: (res: SystemInfo) => void;
    }
    /** 系统信息 */
    interface SystemInfo {
        /**手机品牌*/
        brand: string,
        /**手机型号*/
        model: string,
        /**设备像素比*/
        pixelRatio: number,
        /**屏幕宽度*/
        screenWidth: number,
        /**屏幕高度*/
        screenHeight: number,
        /**可使用窗口宽度*/
        windowWidth: number,
        /**可使用窗口高度*/
        windowHeight: number,
        /**头条设置的语言*/
        language: string,
        /**头条版本号*/
        version: string,
        /**宿主APP名称 
         * - Toutiao 今日头条
         * - Douyin	抖音
         * */
        appName: string,
        /**操作系统版本*/
        system: string,
        /**客户端平台*/
        platform: string,
        /**用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位 px。*/
        fontSizeSetting: number,
        /**客户端基础库版本*/
        SDKVersion: string,
        /**性能等级，-2 或 0：该设备无法运行小游戏，-1：性能未知，>=1 设备性能值，该值越高，设备性能越好(目前设备最高不到50)*/
        benchmarkLevel: number,
        /**电量，范围 1 - 100*/
        battery: number,
        /**wifi 信号强度，范围 0 - 4*/
        wifiSignal: number,
    }
    /** 图片对象 */
    interface Image {
        /** 图片的 URL */
        src: string,
        /** 图片的真实宽度 */
        width: number,
        /** 图片的真实高度 */
        height: number,
        /** 图片加载完成后触发的回调函数 */
        onload: function,
        /** 图片加载发生错误后触发的回调函数 */
        onerror: function
    }
    /** 画布对象 */
    type contextType = '2d'|'webgl';
    interface Canvas {
        width: number;
        height: number;
        getContext: (contextType: contextType) => RenderingContext;
        toDataURL: () => string;
        toTempFilePath: (object: Object) => string;
    }
    
    /*=============================================
     *  渲染
     * ============================================*/
    /*------ 画布 ------*/
    /** 
     * 创建一个画布对象。    
     * 首次调用创建的是显示在屏幕上的画布，之后调用创建的都是离屏画布 
     * */
    export function createCanvas(): Canvas;
    /*------ 字体 ------*/
    /*------ 帧率 ------*/
    /*------ 图片 ------*/
    export function createImage(): Image;
    /*------ 帧率 ------*/

    /*=============================================
     *  开放能力
     * ============================================*/
    /*------ 广告 -----------*/
    /** 创建banner */
    export function createBannerAd(options: CreateBannerAdOptions): bannerAd;
    /**
     *  创建video    
     *  adUnitId - 广告位id
    */
    export function createRewardedVideoAd(options: { adUnitId: string }): videoAd;
    /*------ 数据分析 -------*/
    /** 
     * 自定义分析数据上报接口。    
     * 使用前，需要在小程序管理后台事件中新建事件，配置好事件名与字段
    */
    export function reportAnalytics(eventName: string, data: reportData): void;

    /*=============================================
     *  转发
     * ============================================*/
    /*------ 转发api -------*/
    /** 显示当前页面的转发按钮 */
    export function showShareMenu(options: showShareMenuOpts): void;
    /** 隐藏转发按钮 */
    export function hideShareMenu(options: standardInput): void;
    /** 取消监听用户点击右上角菜单的“转发”按钮时触发的事件 */
    export function onShareAppMessage(callback: onShareAppMessageCallback): onShareAppMessageReturnObject;
    /** 监听用户点击右上角菜单的“转发”按钮时触发的事件 */
    export function offShareAppMessage(callback: onShareAppMessageCallback): void;
    /** 主动拉起转发页面 */
    export function shareAppMessage(options: shareAppMessageOptions): void;

    /*=============================================
     *  系统
     * ============================================*/
    /*------ 系统信息 -------*/
    /** 获取系统信息 */
    export function getSystemInfo(options: SystemInfoInput): void;
    /** 获取系统信息同步版本 */
    export function getSystemInfoSync(): SystemInfo;

    /*=============================================
     *  开放接口
     * ============================================*/
    /*------ 更多游戏 -------*/
    /** 
     * 创建更多游戏按钮。  
     * 用户点击该按钮后，会弹出一个固定样式的弹窗，弹窗中包含预先配置的小游戏列表。    
     * 功能说明: https://developer.toutiao.com/docs/game/open/navigate/intro.html
     * */
    export function createMoreGamesButton(options: createMoreGamesButtonOptions): void;
}
