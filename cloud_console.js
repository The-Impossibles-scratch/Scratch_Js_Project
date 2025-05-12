const ws = new WebSoket("wss://clouddate.scratch.mit.edu");
ws.onopen = () => {
  ws.send(JSONstringify({"method":"handshake","user":"The_Impossibles-sys","project_id":""}) + "\n");
  console.log("start");
  ws.send(JSONstringify({"method":"handshake","user":"The_Impossibles-sys","project_id":"","name":"☁︎Test by Js","value":"1234567890"}) + "\n");
  console.log("finish");
}
ws.onclose = () => {
  console.log("close cloud date")
}
