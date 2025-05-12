const ws = new WebSocket("wss://clouddata.scratch.mit.edu");

ws.onopen = () => {
  const username = document.querySelector('.profile-name').textContent;
  
  let project_id = prompt("Input Project ID (If nothing is entered, it will automatically be the current Project Id.)");
  if (!project_id) {
    const url = window.location.href;
    const projectId = url.match(/projects\/(\d+)/)?.[1];
    project_id = Number(projectId)
  };
  
  if (typeof project_id !== 'number' || isNaN(project_id)) {
    throw new Error("Input Project Id (Number Only)");
  };

  ws.send(JSON.stringify({
    "method":"handshake",
    "user":username,
    "project_id":project_id
  }) + "\n");

  let cloud_var = prompt("Input Cloud Var Name (If nothing is entered, it will automatically be 'My Cloud Var')");
  let cloud_value = prompt("Input Cloud Value (If nothing is entered, it will automatically be '0')");
  
  if (!cloud_value) {
    cloud_value = 0;
  } else{
    cloud_value = Number(cloud_value);
  };

  if (!cloud_var) {
    cloud_var = "My Cloud Var";
  };

  if (typeof cloud_value !== 'number' || isNaN(cloud_value)) {
    throw new Error("Input Cloud Value (Number Only)");
  };

  console.log("Start");
  
  ws.send(JSON.stringify({
    "method":"set",
    "user":username,
    "project_id":project_id,
    "name":"☁" + cloud_var,
    "value":cloud_value
  }) + "\n");

  console.log("FINISH");
  ws.close()
}

ws.onclose = () => {
  console.log("Closed")
}
