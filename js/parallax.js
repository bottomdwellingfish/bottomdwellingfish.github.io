document.addEventListener("mousemove", parallax);

function parallax(e) {
  // 获取所有带有 parallax-layer 类的图层
  const layers = document.querySelectorAll('.parallax-layer');
  
  // 计算鼠标距离屏幕中心的相对位置
  const x = (window.innerWidth - e.pageX * 2) / 100; 
  const y = (window.innerHeight - e.pageY * 2) / 100; 

  layers.forEach(layer => {
    // 获取你在 HTML 中写的速度倍率
    const speed = layer.getAttribute('data-speed');
    
    // 计算位移量
    const xPos = x * speed * 100; 
    const yPos = y * speed * 100;
    
    // 应用 CSS 变换，使用 translate3d 开启硬件加速
    layer.style.transform = `translate3d(${xPos}px, ${yPos}px, 0px)`;
  });
}