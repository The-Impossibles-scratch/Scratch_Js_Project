(function() {
  function get_current_url_type() {
    var path = new URL(window.location.href).pathname.split('/')[1];
    if (["users","projects","studios"].includes(path)) {
      return path;
    } else {
      throw new Error("Please Go to User Page Or Project Page Or Studio Page");
      return;
    };
  };
  
  function add_comment_id_user(li) {
    if (
      !li.classList.contains('top-level-reply') &&
      !li.classList.contains('reply') &&
      !li.classList.contains('last')
    ) return;

    var comment_div = li.querySelector('div.comment');
    if (!comment_div) return;

    var time_span = comment_div.querySelector('span.time');
    if (!time_span) return;

    var comment_id = comment_div.getAttribute('data-comment-id');
    if (!comment_id) return;

    if (time_spam.nextSibling && time_spam.nextSibling.textContent.includes(`comment id : ${comment_id}`)) return;

    var span = document.createElement('span');
    span.textContent = ` | comment id : ${comment_id}`;
    span.style.color = 'gray';
    span.style.marginLeft = '5px';

    time_span.parentNode.insertBefore(span, time_span.nextSibling);
  };
  
  function add_comment_id_project_or_studio(div) {
    if (!div.classList.contains('flex-row') || !div.classList.contains('comment')) return;

    var time_span = div.querySelector('span.comment-time > span');
    if (!time_span) {
      var time_container = div.querySelector('span.comment-time');
      
