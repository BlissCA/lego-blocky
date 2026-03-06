function getDeviceByName(name) {
  if (!window.deviceManager) return null;
  return window.deviceManager.devices.find(d => d.name === name) || null;
}

window.lego = {

  async connect() {
    await window.deviceManager.connectLegoInterfaceB();
  },

  async disconnect() {
    await window.deviceManager.disconnectAll();
  },

  async setOutput(deviceName, port, value) {
    const dev = getDeviceByName(deviceName);
    if (!dev) {
      console.warn("Device not found:", deviceName);
      return;
    }

    try {
      const writer = dev.port.writable.getWriter();
      const cmd = new Uint8Array([port & 0xFF, value & 0xFF]);
      await writer.write(cmd);
      writer.releaseLock();
      dev.log(`Output: port=${port}, value=${value}`);
    } catch (err) {
      dev.log(`Output error: ${err.message}`);
    }
  },

  readPacket(deviceName) {
    const dev = getDeviceByName(deviceName);
    if (!dev) return null;
    return dev.lastPacket || null;
  }
};

window.runCode = function(workspace) {
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  try { eval(code); }
  catch (err) { alert("Error:\n" + err); }
};
