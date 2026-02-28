import { defineConfig } from 'vitepress'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
// @ts-ignore
import { defineTeekConfig } from 'vitepress-theme-teek/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 在 SSR 包代码中修补 createDynamicComponent：空 template 返回空组件，compile 抛错时也返回空组件
function patchCreateDynamicComponentInCode(code) {
    let out = code
    // 1) 空值 guard：避免空字符串进入 compile
    if (!out.includes('template.trim')) {
        const guard = "if (template == null || typeof template !== 'string' || !template.trim()) { return defineComponent({ render: () => null }); } "
        const patterns = [
            [/(const createDynamicComponent\s*=\s*\(template\)\s*=>\s*\{\s*)(const\s*\{\s*code\s*\}\s*=\s*compile\s*\(template\))/g, '$1' + guard + '$2'],
            [/(createDynamicComponent\s*=\s*function\s*\(template\)\s*\{\s*)(var\s*\{[^}]*code[^}]*\}\s*=\s*compile\s*\(template\))/g, '$1' + guard + '$2'],
        ]
        for (const [re, replacement] of patterns) {
            out = out.replace(re, replacement)
            if (out !== code) break
        }
    }
    // 2) try/catch：非法 template（如不完整标签）导致 compile 抛 "Element is missing end tag" 时返回空组件
    const tryCatchRe = /(\s+)(const\s*\{\s*code:\s*(\w+)\s*\}\s*=\s*(\w+)\.compile\(template\);)\s*(const\s+(\w+)\s*=\s*new Function\("Vue",\s*\3\)\(Vue\);)\s*(return defineComponent\(\{\s*render:\s*\6\s*}\);)/m
    out = out.replace(tryCatchRe, (_, sp, line1, _codeVar, _compiler, line2, _renderVar, line3) =>
        `${sp}try {${sp}  ${line1.trim()}${sp}  ${line2.trim()}${sp}  ${line3.trim()}${sp}} catch (e) {${sp}  return defineComponent({ render: () => null });${sp}}`)
    return out
}

function teekCompilePatchTransform(code, id) {
    if (!id.includes('vitepress-theme-teek')) return null
    if (code.includes('template.trim')) return null // 已有补丁
    const guardMjs = "if (template == null || typeof template !== 'string' || !template.trim()) { return defineComponent({ render: () => null }); }\n  "
    const guardJs = "if (template == null || typeof template !== 'string' || !template.trim()) { return Vue.defineComponent({ render: () => null }); }\n    "
    const mjsRe = /(const createDynamicComponent = \(template\) => \{\s*)(const \{ code \} = compile\(template\))/
    const jsRe = /(const createDynamicComponent = \(template\) => \{\s*)(const \{ code \} = compilerDom\.compile\(template\))/
    const outMjs = code.replace(mjsRe, '$1' + guardMjs + '$2')
    if (outMjs !== code) return outMjs
    const outJs = code.replace(jsRe, '$1' + guardJs + '$2')
    if (outJs !== code) return outJs
    return null
}

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
    "Be water my friend -- Bruce Lee",
    "故事由我书写，旅程由你见证，传奇由她聆听 —— Young Kbt",
    "积跬步以至千里，致敬每个爱学习的你 —— Evan Xu",
    "这世界上一直存在一条路，让我们的能力从平庸到杰出，这条路漫长而且艰辛，只有少数人愿意走下去。所以，优秀的人永远是少数。 —— MacTalk·人生元编程",
    "不要试图从头开始，站在巨人的肩膀上。",
    "没有人有义务必须透过连你自己都毫不在意的邋遢外表，去发现你优秀的内在。",
    "种一棵树最好的时间是十年前，其次是现在。",
    "那些杀不死我的，会使我更强大。 -- 尼采",
]

// Teek 主题配置
const teekConfig = defineTeekConfig({
    author: { name: "siushin", link: "https://github.com/siushin" },
    friendLink: {
        enabled: true, // 是否启用友情链接卡片
        list: [
            {
                name: "Teeker",
                desc: "朝圣的使徒，正在走向编程的至高殿堂！",
                avatar: "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar2.png",
                link: "http://notes.teek.top/",
            },
            {
                name: "vuepress-theme-vdoing",
                desc: "🚀一款简洁高效的VuePress 知识管理&博客 主题",
                avatar: "https://doc.xugaoyi.com/img/logo.png",
                link: "http://notes.teek.top/",
            },
            {
                name: "One",
                desc: "明心静性，爱自己",
                avatar: "https://onedayxyy.cn/img/xyy-touxiang.png",
                link: "https://onedayxyy.cn/",
            },
        ], // 友情链接数据列表
        limit: 5, // 一页显示的数量
        autoScroll: false, // 是否自动滚动
        scrollSpeed: 2500, // 滚动间隔时间，单位：毫秒。autoScroll 为 true 时生效
        autoPage: false, // 是否自动翻页
        pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
    },
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
    vite: {
        server: {
            allowedHosts: ['www.siushin.com', 'localhost', '127.0.0.1']
        },
        build: {
            chunkSizeWarningLimit: 1000,
        },
        optimizeDeps: {
            exclude: ['vitepress-theme-teek'],
        },
        ssr: {
            noExternal: ['vitepress-theme-teek'],
        },
        plugins: [
            {
                name: 'teek-compile-patch',
                enforce: 'pre',
                transform(code, id) {
                    return teekCompilePatchTransform(code, id)
                },
            },
            {
                name: 'teek-compile-patch-ssr-bundle',
                apply: 'build',
                generateBundle(_options, bundle) {
                    for (const chunk of Object.values(bundle)) {
                        if (chunk.type !== 'chunk' || !chunk.code) continue
                        if (!chunk.code.includes('createDynamicComponent') || chunk.code.includes('template.trim')) continue
                        const patched = patchCreateDynamicComponentInCode(chunk.code)
                        if (patched !== chunk.code) chunk.code = patched
                    }
                },
                closeBundle() {
                    const candidates = [
                        path.join(__dirname, '.temp', 'app.js'),
                        path.join(__dirname, '..', '.temp', 'app.js'),
                        path.join(process.cwd(), 'docs', '.temp', 'app.js'),
                        path.join(process.cwd(), 'docs', '.vitepress', '.temp', 'app.js'),
                    ]
                    for (const appPath of candidates) {
                        try {
                            if (!fs.existsSync(appPath)) continue
                            const code = fs.readFileSync(appPath, 'utf8')
                            const patched = patchCreateDynamicComponentInCode(code)
                            if (patched !== code) fs.writeFileSync(appPath, patched)
                            break
                        } catch (_) { }
                    }
                },
            },
        ],
    },
    head: [
        ["link", { rel: "icon", type: "image/png", href: "/src/pokemon.png" }],
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
        logo: "/src/pokemon.png",
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
            { text: 'AI笔记', link: '/ai/guide', activeMatch: "/ai/" },
            { text: "Go笔记", link: "/go/intro", activeMatch: "/go/" },
            {
                text: 'PHP笔记',
                items: [
                    { text: 'PHP基础知识', link: '/php/intro', activeMatch: "/php/intro" },
                    { text: 'PHP精选文章', link: '/php/article', activeMatch: "/php/article" },
                    { text: 'ThinkPHP', link: '/php/thinkphp', activeMatch: "/php/thinkphp" },
                    { text: 'Laravel', link: '/php/laravel', activeMatch: "/php/laravel" },
                    { text: 'Swoole', link: '/php/swoole', activeMatch: "/php/swoole" },
                    { text: 'Hyperf', link: '/php/Hyperf', activeMatch: "/php/Hyperf" },
                    { text: 'workerman', link: '/php/workerman', activeMatch: "/php/workerman" },
                    { text: 'GatewayWorker', link: '/php/GatewayWorker', activeMatch: "/php/GatewayWorker" },
                    { text: 'webman', link: '/php/webman', activeMatch: "/php/webman" },
                    { text: 'Composer笔记', link: '/php/composer', activeMatch: "/php/composer" },
                ]
            },
            {
                text: '前端笔记',
                items: [
                    { text: 'Vue笔记', link: '/frontend/vue', activeMatch: "/frontend/vue" },
                    { text: 'React笔记', link: '/frontend/react', activeMatch: "/frontend/react" },
                    { text: 'uni-app笔记', link: '/frontend/uniapp', activeMatch: "/frontend/uniapp" },
                    { text: 'JavaScript笔记', link: '/frontend/js', activeMatch: "/frontend/js" },
                    { text: 'NodeJS笔记', link: '/frontend/nodejs', activeMatch: "/frontend/nodejs" },
                    { text: 'Typescript笔记', link: '/frontend/course', activeMatch: "/frontend/course" },
                ]
            },
            {
                text: '技术笔记',
                items: [
                    { text: 'Redis笔记', link: '/redis/command', activeMatch: "/redis/command" },
                    { text: 'RabbitMQ笔记', link: '/rabbitmq/note', activeMatch: "/rabbitmq/note" },
                    { text: 'Docker笔记', link: '/tech/docker', activeMatch: "/tech/docker" },
                    { text: 'Git文档', link: '/tech/git', activeMatch: "/tech/git" },
                    { text: 'MySQL笔记', link: '/tech/mysql', activeMatch: "/tech/mysql" },
                    { text: 'Nginx笔记', link: '/tech/nginx', activeMatch: "/tech/nginx" },
                    { text: 'Python笔记', link: '/python/intro', activeMatch: "/python/intro" },
                    { text: 'Linux笔记', link: '/tech/linux', activeMatch: "/tech/linux" },
                ]
            },
            {
                text: '效率工具',
                items: [
                    { text: 'Mac使用技巧', link: '/software/mac', activeMatch: "/software/mac" },
                    { text: '影刀RPA', link: '/software/yingdao', activeMatch: "/software/yingdao" },
                    { text: '软件工具', link: '/software/app', activeMatch: "/software/app" },
                ]
            },
            {
                text: '精选系列',
                items: [
                    { text: '开源项目', link: '/star/open-source', activeMatch: "/star/open-source" },
                    { text: '技术文档（书籍）', link: '/star/book', activeMatch: "/star/book" },
                    { text: '关于技术、知识、播客', link: '/star/website', activeMatch: "/star/website" },
                    { text: '关于软件、效率工具、资源库', link: '/star/soft', activeMatch: "/star/soft" },
                    { text: '使用技巧（技术相关）', link: '/star/skill', activeMatch: "/star/skill" },
                    { text: 'Linux技巧', link: '/star/Linux', activeMatch: "/star/Linux" },
                    { text: 'Windows技巧', link: '/star/Windows', activeMatch: "/star/Windows" },
                    { text: '视频教程', link: '/star/video', activeMatch: "/star/video" },
                ]
            },
            {
                text: "开源项目",
                items: [
                    { text: "GPAdmin", link: "https://github.com/siushin/GPAdmin" },
                    { text: "GPAdmin-api", link: "https://github.com/siushin/GPAdmin-api" },
                    { text: "laravel-tool", link: "https://github.com/siushin/laravel-tool" },
                    { text: "php-util", link: "https://github.com/siushin/php-util" },
                ],
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/siushin' }
        ],
        search: {
            provider: "local",
        },
    },
})
