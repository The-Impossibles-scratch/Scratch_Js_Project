(function() {
  function get_current_url_type() {
    var path = new URL(window.location.href).pathname.split('/')[1];
    if (["users","projects","studios"].includes(path)) {
      return path;
    } else {
      return;
    };
  };
  
