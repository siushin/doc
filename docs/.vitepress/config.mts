import { defineConfig } from 'vitepress'
// @ts-ignore
import { defineTeekConfig } from 'vitepress-theme-teek/config'

const description = [
    "欢迎来到 小新博客",
    "合作交流 : siushin@163.com",
    "软件开发、管理系统开发、小程序开发、APP开发、网站建设、软件外包、软件定制开发",
].toString();

// 随机打乱数组（使用Fisher-Yates洗牌算法）
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const banner_description = [
    "故事由我书写，旅程由你见证，传奇由她聆听 —— 来自 Young Kbt",
    "积跬步以至千里，致敬每个爱学习的你 —— 来自 Evan Xu",
    "这世界上一直存在一条路，让我们的能力从平庸到杰出，这条路漫长而且艰辛，只有少数人愿意走下去。所以，优秀的人永远是少数。——MacTalk·人生元编程",
    "不要试图从头开始，站在巨人的肩膀上。",
    "没有人有义务必须透过连你自己都毫不在意的邋遢外表，去发现你优秀的内在。",
    "种一棵树最好的时间是十年前，其次是现在。",
    "那些杀不死我的，会使我更强大。--尼采",
]

// Teek 主题配置
const teekConfig = defineTeekConfig({
    author: { name: "siushin", link: "https://github.com/siushin" },
    footerInfo: {
        theme: {
            name: `Theme By Teek`,
        },
        copyright: {
            // createYear: 2019,
        },
    },
    codeBlock: {
        copiedDone: TkMessage => TkMessage.success("复制成功！"),
    },
    post: {
        showCapture: true,
    },
    articleShare: { enabled: true },
    vitePlugins: {
        sidebarOption: {
            initItems: false,
        },
    },
    banner: {
        enabled: true,
        name: "不要试图从头开始，站在巨人的肩膀上。", // Banner 标题，默认读取 vitepress 的 title 属性
        bgStyle: "partImg", // Banner 背景风格：pure 为纯色背景，partImg 为局部图片背景，fullImg 为全屏图片背景
        pureBgColor: "#28282d", // Banner 背景色，bgStyle 为 pure 时生效
        imgSrc: ["/img/bg1.jpg", "/img/bg2.png"], // Banner 图片链接。bgStyle 为 partImg 或 fullImg 时生效
        imgInterval: 15000, // 当多张图片时（imgSrc 为数组），设置切换时间，单位：毫秒
        imgShuffle: false, // 图片是否随机切换，为 false 时按顺序切换，bgStyle 为 partImg 或 fullImg 时生效
        imgWaves: true, // 是否开启 Banner 图片波浪纹，bgStyle 为 fullImg 时生效
        mask: true, // Banner 图片遮罩，bgStyle 为 partImg 或 fullImg 时生效
        maskBg: "rgba(0, 0, 0, 0.4)", // Banner 遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。bgStyle 为 partImg 或 fullImg 且 mask 为 true 时生效
        textColor: "#ffffff", // Banner 字体颜色，bgStyle 为 pure 时为 '#000000'，其他为 '#ffffff'
        titleFontSize: "3.2rem", // 标题字体大小
        descFontSize: "1.4rem", // 描述字体大小
        descStyle: "types", // 描述信息风格：default 为纯文字渲染风格（如果 description 为数组，则取第一个），types 为文字打印风格，switch 为文字切换风格
        description: shuffleArray(banner_description), // 描述信息
        switchTime: 4000, // 描述信息切换间隔时间，单位：毫秒。descStyle 为 switch 时生效
        switchShuffle: false, // 描述信息是否随机切换，为 false 时按顺序切换。descStyle 为 switch 时生效
        typesInTime: 200, // 输出一个文字的时间，单位：毫秒。descStyle 为 types 时生效
        typesOutTime: 100, // 删除一个文字的时间，单位：毫秒。descStyle 为 types 时生效
        typesNextTime: 800, // 打字与删字的间隔时间，单位：毫秒。descStyle 为 types 时生效
        typesShuffle: false, // 描述信息是否随机打字，为 false 时按顺序打字，descStyle 为 types 时生效
    },
})

// https://vitepress.dev/reference/site-config
export default defineConfig({
    extends: teekConfig,
    title: "小新博客",
    description: "基于VitePress自动化构建",
    cleanUrls: false,
    lastUpdated: true,
    lang: "zh-CN",
    head: [
        ["link", { rel: "icon", type: "image/svg+xml", href: "/teek-logo-mini.svg" }],
        ["link", { rel: "icon", type: "image/png", href: "/teek-logo-mini.png" }],
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:locale", content: "zh-CN" }],
        ["meta", { property: "og:title", content: "小新博客" }],
        ["meta", { property: "og:site_name", content: "小新博客" }],
        ["meta", { property: "og:image", content: "" }],
        ["meta", { property: "og:url", content: "" }],
        ["meta", { property: "og:description", description }],
        ["meta", { name: "description", description }],
        ["meta", { name: "author", content: "小新" }],
        [
            "meta",
            {
                name: "viewport",
                content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
            },
        ],

        ["meta", { name: "keywords", description }],
        // ["meta", { name: "baidu-site-verification", content: "codeva-GdK2q9MO1i" }], // 百度收录
        // ["meta", { name: "msvalidate.01", content: "48CABE70F538B8D117567176ABF325AF" }], // Bing 收录验证
        // ["script", { charset: "UTF-8", id: "LA_COLLECT", src: "//sdk.51.la/js-sdk-pro.min.js" }], // 51.la
        // [
        //   "script",
        //   {},
        //   `typeof LA !== 'undefined' && LA.init({ id: "3LqfP8Icg0GeEvtn", ck: "3LqfP8Icg0GeEvtn", hashMode: true })`,
        // ], // 51.la
    ],
    markdown: {
        // 开启行号
        lineNumbers: true,
        image: {
            // 默认禁用；设置为 true 可为所有图片启用懒加载。
            lazyLoading: true,
        },
        // 更改容器默认值标题
        container: {
            tipLabel: "提示",
            warningLabel: "警告",
            dangerLabel: "危险",
            infoLabel: "信息",
            detailsLabel: "详细信息",
        },
    },
    sitemap: {
        hostname: "http://www.siushin.com",
        transformItems: items => {
            const permalinkItemBak: typeof items = [];
            // 使用永久链接生成 sitemap
            const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig.permalinks;
            items.forEach(item => {
                const permalink = permalinks?.map[item.url];
                if (permalink) permalinkItemBak.push({ url: permalink, lastmod: item.lastmod });
            });
            return [...items, ...permalinkItemBak];
        },
    },
    themeConfig: {
        darkModeSwitchLabel: "主题",
        sidebarMenuLabel: "菜单",
        returnToTopLabel: "返回顶部",
        lastUpdatedText: "上次更新时间",
        outline: {
            level: [2, 4],
            label: "本页导航",
        },
        docFooter: {
            prev: "上一页",
            next: "下一页",
        },
        nav: [
            { text: '首页', link: '/' },
            { text: "Go笔记", link: "/go/intro", activeMatch: "/10.Go初级入门/", },
            { text: 'Python笔记', link: "/python/intro", activeMatch: "/10.Python基础知识/", },
            {
                text: 'PHP笔记',
                items: [
                    { text: 'PHP基础知识', link: '/php/intro', activeMatch: "/1.序言/", },
                    { text: 'PHP精选文章', link: '/php/article', activeMatch: "/10.PHP精选文章/", },
                    { text: 'Laravel', link: '/php/laravel', activeMatch: "/10.Laravel基础知识/", },
                    { text: 'Swoole', link: '/php/swoole', activeMatch: "/10.Swoole笔记/", },
                    { text: 'Hyperf', link: '/php/Hyperf', activeMatch: "/10.Hyperf笔记/", },
                    { text: 'workerman', link: '/php/workerman', activeMatch: "/10.序言/", },
                    { text: 'GatewayWorker', link: '/php/GatewayWorker', activeMatch: "/10.官方问答/", },
                    { text: 'webman', link: '/php/webman', activeMatch: "/10.官方问答/", },
                    { text: 'ThinkPHP', link: '/php/thinkphp', activeMatch: "/10.ThinkPHP/", },
                    { text: 'Composer笔记', link: '/php/composer', activeMatch: "/10.常用命令/", },
                ]
            },
            {
                text: '前端笔记',
                items: [
                    { text: 'Vue笔记', link: '/frontend/vue', activeMatch: "/10.Vue文章/", },
                    { text: 'React笔记', link: '/frontend/react', activeMatch: "/10.序言/", },
                    { text: 'uni-app笔记', link: '/frontend/uniapp', activeMatch: "/10.插件/", },
                    { text: 'JavaScript笔记', link: '/frontend/js', activeMatch: "/10.基础知识/", },
                    { text: 'NodeJS笔记', link: '/frontend/nodejs', activeMatch: "/10.NodeJS命令/", },
                    { text: 'HTML笔记', link: '/frontend/html', activeMatch: "/10.HTML笔记/", },
                    { text: 'CSS笔记', link: '/frontend/css', activeMatch: "/10.CSS笔记/", },
                    { text: 'Typescript笔记', link: '/frontend/course', activeMatch: "/10.Vue3 + Typescript 从0到1开发通用基础组件/", },
                ]
            },
            {
                text: '技术笔记',
                items: [
                    { text: 'Linux笔记', link: '/tech/linux', activeMatch: "/10.基本命令/", },
                    { text: 'Docker笔记', link: '/tech/docker', activeMatch: "/10.Docker命令大全/", },
                    { text: 'Git文档', link: '/tech/git', activeMatch: "/10.常用命令/", },
                    { text: 'MySQL笔记', link: '/tech/mysql', activeMatch: "/10.MySQL笔记/", },
                    { text: 'Nginx笔记', link: '/tech/nginx', activeMatch: "/10.Nginx安装/", },
                    { text: 'Ansible快速入门', link: '/tech/ansible', activeMatch: "/10.序言/", },
                ]
            },
            {
                text: '效率工具',
                items: [
                    { text: '影刀RPA', link: '/software/yingdao', activeMatch: "/10.影刀RPA案例/", },
                    { text: 'AI知识', link: '/software/AI', activeMatch: "/10.AI序言/", },
                    { text: '软件工具', link: '/software/app', activeMatch: "/10.软件工具/", },
                ]
            },
            {
                text: '精选系列',
                items: [
                    { text: '开源项目', link: '/star/open-source', activeMatch: "/10.开源项目/", },
                    { text: '技术文档（书籍）', link: '/star/book', activeMatch: "/20.技术文档（书籍）/", },
                    { text: '关于技术、知识、播客', link: '/star/website', activeMatch: "/30.关于技术、知识、播客/", },
                    { text: '关于软件、效率工具、资源库', link: '/star/soft', activeMatch: "/40.关于软件、效率工具、资源库/", },
                    { text: '使用技巧（技术相关）', link: '/star/skill', activeMatch: "/50.使用技巧（技术相关）/", },
                    { text: 'Linux技巧', link: '/star/Linux', activeMatch: "/60.Linux技巧/", },
                    { text: 'Windows技巧', link: '/star/Windows', activeMatch: "/70.Windows技巧/", },
                    { text: '视频教程', link: '/star/video', activeMatch: "/80.视频教程/", },
                    { text: '灵感创意', link: '/star/idea', activeMatch: "/10.需求收集/", },
                ]
            },
            {
                text: "网站导航",
                items: [
                    { text: "归档页", link: "/archives" },
                    { text: "清单页", link: "/articleOverview" },
                    { text: "分类页", link: "/categories" },
                    { text: "标签页", link: "/tags" },
                ],
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/siushin' }
        ],
        search: {
            provider: "local",
        },
    },
})
