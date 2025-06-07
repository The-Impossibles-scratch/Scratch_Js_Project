(function () {
  const headers = {
    "X-CSRFToken": null,
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    "User-Agent": navigator.userAgent,
    "Referer": "https://scratch.mit.edu/"
  };
  
  function get_csrf_token() {
    const cookies = document.cookie.split(' ;').map(c => c.split('='));
    
    for ([key, val] of cookies) {
      if (key === "scratchcsrftoken") return val
    }
    return null;
  }

  async function get_username(csrf_token, headers) {
    let return_val;
    
    if (!csrf_token) {
      throw new Error("CSRF Token Is Not Found");
    };
    
    let headers_copy = {...headers, "X-CSRFToken":csrf_token};
    
    try {
      const fetch_res = await fetch('https://scratch.mit.edu/session', {
        method: "POST",
        headers: headers_copy,
        credentials: "include"
      })
      
      return_val = await fetch_res.json().user?.username
      if (!return_val) {
        throw new Error("you must be log in");
      };
      return return_val;
      
    } catch (e) {
      throw new Error("ERROR : " + e.message);
    };
  };

  async function del_comment(username, comment_id, headers, csrf_token) {
    let headers_copy = {...headers, "X-CSRFToken":csrf_token};
    
    try {
      const fetch_res = await fetch(`https://scratch.mit.edu/site-api/comments/user/${username}/del/`, {
        method: "POST",
        headers: headers_copy,
        credentials: "include",
        body: JSON.stringify({id: String(comment_id)})
      });
      
    } catch (e) {
      throw new Error("ERROR : " + e.message);
    };
  };

  async function post_comment(username, commentee_id, headers, csrf_token) {
    let headers_copy = {...headers, "X-CSRFToken":csrf_token};
    
    try {
      const fetch_res = await fetch(`https://scratch.mit.edu/site-api/comments/user/${username}/add/`, {
        method: "POST",
        headers: headers_copy,
        credentials: "include",
        body: JSON.stringify({
          content: "From Scratch Js Project",
          parent_id: "",
          commentee_id: commentee_id
        })
      });
      
      let html = await fetch_res.text()
      
    } catch (e) {
      throw new Error("ERROR : " + e.message);
    };
  };
})(); 
