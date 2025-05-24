(function(){
  'use strict';

  const actionButtons = document.querySelector('.flex-row.action-buttons');
  if (!actionButtons) return;

  const btn = document.createElement('button');
  btn.className = 'button action-button set-thumbnail';
  btn.textContent = 'Set Thumbnail';

  // 横長＆高さ小さめの楕円ボタンスタイル
  btn.style.backgroundColor = '#855CD6';  // 紫
  btn.style.color = 'white';
  btn.style.border = 'none';
  btn.style.width = '120px';   // 横幅長め
  btn.style.height = '32px';   // 高さ小さめ
  btn.style.borderRadius = '16px';  // 高さの半分で丸みをつける
  btn.style.fontWeight = '700';
  btn.style.cursor = 'pointer';
  btn.style.marginLeft = '8px';

  // テキスト中央揃え
  btn.style.display = 'flex';
  btn.style.justifyContent = 'center';
  btn.style.alignItems = 'center';
  btn.style.userSelect = 'none';

  // ホバー時の色変化
  btn.addEventListener('mouseenter', () => {
    btn.style.backgroundColor = '#7a1ee0';  // 濃い紫
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.backgroundColor = '#8a2be2';  // 元の紫
  });

  btn.addEventListener('click', () => {
    alert('横長＆高さ小さめのSet Thumbnailボタンが押されました！');
  });

  actionButtons.appendChild(btn);
})();
