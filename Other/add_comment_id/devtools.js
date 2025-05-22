// made by chatGPT so I will make this by myself
(function() {
  // Userページ用：liのコメント要素にcomment idを付加
  function addUserCommentId(li) {
    if (
      !li.classList.contains('top-level-reply') &&
      !li.classList.contains('reply') &&
      !li.classList.contains('last')
    ) return;

    const commentDiv = li.querySelector('div.comment');
    if (!commentDiv) return;

    const timeSpan = commentDiv.querySelector('span.time');
    if (!timeSpan) return;

    const commentId = commentDiv.getAttribute('data-comment-id');
    if (!commentId) return;

    if (timeSpan.nextSibling && timeSpan.nextSibling.textContent.includes(`comment id : ${commentId}`)) {
      return; // 既に追加済み
    }

    const span = document.createElement('span');
    span.textContent = ` | comment id : ${commentId}`;
    span.style.color = 'gray';
    span.style.marginLeft = '5px';

    timeSpan.parentNode.insertBefore(span, timeSpan.nextSibling);
  }

  // Project・Studioページ用：div.flex-row.commentにcomment idを付加
  function addProjectStudioCommentId(div) {
    if (!div.classList.contains('flex-row') || !div.classList.contains('comment')) return;

    let timeSpan = div.querySelector('span.comment-time > span');
    if (!timeSpan) {
      const timeContainer = div.querySelector('span.comment-time');
      if (timeContainer && timeContainer.childNodes.length > 0) {
        for (const node of timeContainer.childNodes) {
          if (node.nodeType === 1) { // ELEMENT_NODE
            timeSpan = node;
            break;
          }
        }
      }
      if (!timeSpan) return;
    }

    const idMatch = div.getAttribute('id')?.match(/comments-(\d+)/);
    if (!idMatch) return;
    const commentId = idMatch[1];

    if (timeSpan.parentNode.textContent.includes(`comment id : ${commentId}`)) {
      return; // 既に追加済み
    }

    const span = document.createElement('span');
    span.textContent = ` | comment id : ${commentId}`;
    span.style.color = 'gray';
    span.style.marginLeft = '5px';

    timeSpan.parentNode.insertBefore(span, timeSpan.nextSibling);
  }

  // 現在のページタイプを判別 user / project / studio / other
  function getPageType() {
    const path = new URL(window.location.href).pathname.split('/')[1];
    if (path === 'users') return 'user';
    if (path === 'projects') return 'project';
    if (path === 'studios') return 'studio';
    return 'other';
  }

  // 初期化関数
  function init() {
    const pageType = getPageType();

    if (pageType === 'user') {
      const commentList = document.querySelector('ul.comments[data-content="comments"]');
      if (!commentList) {
        console.log('Userコメントリストが見つかりません。');
        return;
      }
      // 既存コメントにID追加
      commentList.querySelectorAll('li.top-level-reply, li.reply, li.last').forEach(addUserCommentId);

      // 追加コメントの監視
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              if (
                node.classList.contains('top-level-reply') ||
                node.classList.contains('reply') ||
                node.classList.contains('last')
              ) {
                addUserCommentId(node);
              }
              node.querySelectorAll('li.top-level-reply, li.reply, li.last').forEach(addUserCommentId);
            }
          });
        });
      });
      observer.observe(commentList, { childList: true, subtree: true });
    }
    else if (pageType === 'project' || pageType === 'studio') {
      // 既存コメントにID追加
      document.querySelectorAll('div.flex-row.comment').forEach(addProjectStudioCommentId);

      // 追加コメントの監視
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              if (node.classList.contains('flex-row') && node.classList.contains('comment')) {
                addProjectStudioCommentId(node);
              }
              // 追加されたノード内の該当コメントもすべて処理
              node.querySelectorAll('div.flex-row.comment').forEach(addProjectStudioCommentId);
            }
          });
        });
      });
      // body直下だけでなく subtree:true で子孫まで監視
      observer.observe(document.body, { childList: true, subtree: true });
    }
    else {
      console.log('ユーザー、プロジェクト、スタジオのページではありません。');
    }
  }

  // DOM準備完了でinitを呼ぶ
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
