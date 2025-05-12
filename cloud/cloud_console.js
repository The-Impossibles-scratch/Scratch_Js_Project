const ws = new WebSoket("wss://clouddate.scratch.mit.edu");

ws.onopen = () => {
  const user = prompt("Input Your User Name");
  const project_id = prompt("Input Project Id");
  ws.send(JSONstringify({"method":"handshake","user":user,"project_id":project_id}) + "\n");
  const cloud_var_name = prompt("Input Cloud Var Name");
  const cloud_value = prompt("Input Cloud Value");
  console.log("start");
  ws.send(JSONstringify({"method":"handshake","user":user,"project_id":project_id,"name":"☁︎" + cloud_var_name,"value":cloud_value}) + "\n");
  console.log("finish");
  ws.onclose();
}
ws.onclose = () => {
  console.log("close cloud date")
}
