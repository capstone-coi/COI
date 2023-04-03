

var connectionId = -1;
var readBuffer = "";

function onRead(readInfo) {
    var uint8View = new Uint8Array(readInfo.data);
    var value = String.fromCharCode(uint8View[0]);
    readBuffer += value;
    console.log(readBuffer);
    // Keep on reading.
    navigator.serial.read(connectionId, 1, onRead);
};

function onOpen(openInfo) {
  connectionId = openInfo.connectionId;
  console.log("connectionId: " + connectionId);
  if (connectionId == -1) {
    setStatus('Could not open');
    return;
  }
  setStatus('Connected');

  navigator.serial.read(connectionId, 1, onRead);
};

function setStatus(status) {
  document.getElementById('status').innerText = status;
}

function buildPortPicker(ports) {
  var eligiblePorts = ports.filter(function(port) {
    return !port.match(/[Bb]luetooth/) && port.match(/\/dev\/tty/);
  });

  var portPicker = document.getElementById('port-picker');
  eligiblePorts.forEach(function(port) {
    var portOption = document.createElement('option');
    portOption.value = portOption.innerText = port;
    portPicker.appendChild(portOption);
  });

  portPicker.onchange = function() {
    if (connectionId != -1) {
        navigator.serial.close(connectionId, openSelectedPort);
      return;
    }
    openSelectedPort();
  };
}

function openSelectedPort() {
  var portPicker = document.getElementById('port-picker');
  var selectedPort = portPicker.options[portPicker.selectedIndex].value;
  navigator.serial.open(selectedPort, onOpen);
}

onload = function() {
    document.getElementById("connect-button").addEventListener('click', async () => {
        console.log("Connect button clicked");
        await navigator.serial.requestPort();
        console.log("Port requested");
        await navigator.serial.getPorts().then(async (ports) => {
            console.log(ports);
            buildPortPicker(ports);
            openSelectedPort();
        });
        console.log("Ports gotten");
    });    
}