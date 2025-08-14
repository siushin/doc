---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
features:
  - icon: 💡
    title: 奉献精神
    details: 知识体系整理沉淀，随时复盘
  - icon: ⚡️
    title: 大型 ITer 面基现场
    details: 打造个人技术领域IP
  - icon: 🛠️
    title: 练手
    details: 依靠VitePress体验Vue生态各种轮子
  - icon: 🔩
    title: 作者简介
    details: 全栈工程师，多年企业级系统平台PHP开发，熟悉Vue，base深圳
  - icon: 🔑
    title: 联系方式
    details: 邮箱：siushin@163.com <br> 微信：lintonggg (注明来意)
  - icon: 📦
    title: 恰饭
    details: 后期接入广告联盟（合作请私信）
---

## 💡 反馈交流

在使用过程中有任何想法、合作交流，请加我微信 `lintonggg` （备注 <mark>小新博客</mark> ）：

<img src="/public/微信二维码.jpg" alt="添加我微信备注「小新文档」" style="width: 180px;" />

## ☕️ 打赏赞助

如果你觉得这个博客内容对您有帮助，可以请作者喝一杯咖啡 ☕️

<div class="coffee">
<img src="/public/微信收款码.jpg" alt="微信收款码" style="width: 180px;" />
<img src="/public/支付宝收款码.jpg" alt="支付宝收款码" style="width: 180px;" />
</div>

<style>

/* 彩虹动画 */
:root {
  animation: rainbow 12s linear infinite;
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}

.VPFeatures.VPHomeFeatures {
  margin-top: 20px;
}

.coffee {
  display: flex;
  align-items: center;
  margin-top: 20px;

  & > img {
    margin-right: 80px;
  }
}
</style>
