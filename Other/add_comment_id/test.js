(function() {
  function get_current_url() {
    var path = new URL(window.location.href).pathname.split('/')[1];
    if (path == 'users' || path == 'projects' || path == 'studios') return path;
    throw new Error("");
  };
  
  function add_comment_id_in_users(li) {
    if (!li.classList.contains('top-level-reply') && !!li.classList.contains('reply') && !li.classList.contains('last')) return;
    
    var comment_div = document.querySelector('div.comment');
    if (!comment_div) return;
    
    var comment_time_span = comment_div.querySelector('time.span');
    if (!comment_time_span) return;
    
    var comment_id = comment_div.querySelector('data-comment-id');
    if (!comment_id) return;
    
    if (comment_time_span.nextSibling && comment_time_span.nextSibling.textContent.includes(`comment id : ${comment_id}`)) return;
    
    var span = document.createElement('span');
    span.textContent = ` | comment id : ${comment_id}`;
    span.style.color = 'gray';
    span.style.marginLeft = '5px';
    
    comment_time_span.parentNode.insertBefor(span, comment_time_span.nextSibling);
  };
  
  function add_comment_id_in_projects(div) {
    if (div.classList.contains('flex-row') || div)
    
