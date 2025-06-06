(function () {
  async function get_username(csrf_token) {
    if (!csrf_token) {
      throw new Error("csrf token is not found!");
      return;
    }
    const fetch_username = try {
      await fetch("https://scratch.mit.edu/session/", {
        method: "GET",
        headers: {
          "X-CSRFToken": csrf_token,
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "include"
      });
    } catch (error) {
      throw new Error("you must be log in!");
      return;
    }
    return fetch_username.user?.username;
  }
  
  function get_csrf_token() {
    const cookies = document.cookie.split('; ').map(c => c.split('='));
    for (const [key, val] of cookies) {
      if (key === "scratchcsrftoken") return val;
    }
    return null;
  }

  async function post(user_id) {
    const P_respons = await fetch("")
  }

  function del(comment_id) {
  }

  function get_username_by_id(user_id) {
  }
})();  
