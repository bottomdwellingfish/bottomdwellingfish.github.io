function runHitokotoCarousel() {
  // 【关键配置】根据你要显示的位置，取消对应选择器的注释
  
  // 选项 A：修改侧边栏的个性签名
  // const el = document.querySelector('.author-info__description');
  
  // 选项 B：修改主页的副标题 (如果选这个，记得把上面的选项 A 注释掉)
   const el = document.querySelector('#subtitle'); 

  if (!el) return;

  // 清除可能因 Pjax 产生的多余定时器，防止打字机加速抽风
  if (window.hkoTimer) clearInterval(window.hkoTimer);
  if (window.hkoDelTimer) clearInterval(window.hkoDelTimer);

  function typeWriter() {
    // 发起接口请求（可按需添加参数，例如 ?c=a 获取动画分类，?c=i 获取诗词）
    fetch('https://v1.hitokoto.cn')
      .then(res => res.json())
      .then(data => {
        // 你也可以带上出处，例如：let text = `${data.hitokoto} —— ${data.from}`;
        let text = data.hitokoto; 
        el.innerText = '';
        let i = 0;

        // 1. 打字过程
        window.hkoTimer = setInterval(() => {
          if (i < text.length) {
            el.innerText += text.charAt(i);
            i++;
          } else {
            clearInterval(window.hkoTimer);
            // 2. 句子打完，停留 3 秒后开始删除
            setTimeout(() => {
              window.hkoDelTimer = setInterval(() => {
                if (i > 0) {
                  el.innerText = text.substring(0, i - 1);
                  i--;
                } else {
                  clearInterval(window.hkoDelTimer);
                  typeWriter(); // 3. 删完后，重新请求新的一言
                }
              }, 50); // 删除速度：50ms
            }, 3000); // 停留时间：3000ms
          }
        }, 150); // 打字速度：150ms
      }).catch(console.error);
  }
  
  typeWriter();
}

// 兼容首次加载与 Pjax 无刷新跳转
document.addEventListener('DOMContentLoaded', runHitokotoCarousel);
document.addEventListener('pjax:complete', runHitokotoCarousel);