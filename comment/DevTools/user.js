async function comment(user,txt,parent_id,commentee_id) {
  function get_csrf_token() {
    const cookies_str = document.cookie;
    const cookies = cookies_str.split("; ").map(c => c.split("="));
    
    for (const [key,val] of cookies) {
      if (key == "scratchcsrftoken") {
        return val
      };
    };
    return null;
  };
  
  csrf_token = get_csrf_token()
  if (!csrf_token) {
    console.log("csrf_token not found");
    return;
  };
  
  let username;
  try {
    username = document.querySelector('.profile-name').textContent;
  } catch (error) {
    console.log("You Must Be Log In");
    return;
  };
  
  const fetch_respons = fetch(`https://scratch.mit.edu/site-api/comments/user/${user}/add/`, {
    method: "POST",
    headers: {
      "X-CSRFToken": csrf_token,
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      "Referer": "https://scratch.mit.edu/"
    },
    credentials: "include",
    body: JSON.stringify({
      content: txt,
      parent_id: parent_id,
      comentee_id: comentee_id
    })
  });
  console.log("status : ", fetch_respons.status);
};
