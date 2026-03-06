//
// lego_blocks.js
// LEGO Interface B blocks with dynamic device dropdowns
//

// ------------------------------------------------------------
// 1. Block definitions
// ------------------------------------------------------------
Blockly.defineBlocksWithJsonArray([

  // Connect a new LEGO Interface B
  {
    "type": "lego_connect",
    "message0": "connect new LEGO Interface B",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 60,
    "tooltip": "Connect a new LEGO Interface B",
    "helpUrl": ""
  },

  // Disconnect all devices
  {
    "type": "lego_disconnect",
    "message0": "disconnect all LEGO devices",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 60,
    "tooltip": "Disconnect all devices",
    "helpUrl": ""
  },

  // Set output (motor/relay)
  {
    "type": "lego_set_output",
    "message0": "device %1 set output %2 to %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DEVICE",
        "options": [["No devices", "NONE"]]
      },
      {
        "type": "field_dropdown",
        "name": "PORT",
        "options": [
          ["A", "0"],
          ["B", "1"],
          ["C", "2"],
          ["D", "3"]
        ]
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 60,
    "tooltip": "Set motor/relay output",
    "helpUrl": ""
  },

  // Read last packet
  {
    "type": "lego_read_packet",
    "message0": "device %1 read last packet",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DEVICE",
        "options": [["No devices", "NONE"]]
      }
    ],
    "output": null,
    "colour": 60,
    "tooltip": "Read the last 19‑byte packet",
    "helpUrl": ""
  }

]);
  

// ------------------------------------------------------------
// 2. Dynamic device dropdown injection
// ------------------------------------------------------------
//
// This updates the DEVICE dropdown in all LEGO blocks whenever
// a device connects or disconnects.
//
function updateLegoDeviceDropdowns() {
  const devices = window.deviceManager?.devices || [];
  const names = devices.length
    ? devices.map(d => [d.name, d.name])
    : [["No devices", "NONE"]];

  const blockTypes = ["lego_set_output", "lego_read_packet"];

  blockTypes.forEach(type => {
    const block = Blockly.Blocks[type];
    if (!block) return;

    // Register an extension for this block type
    const extName = `dynamic_devices_${type}`;

    if (!Blockly.Extensions.isRegistered(extName)) {
      Blockly.Extensions.register(extName, function() {
        const field = this.getField("DEVICE");
        if (field) field.menuGenerator_ = names;
      });
    }

    // Apply the extension to the block
    Blockly.Extensions.apply(extName, block, false);
  });

  // Refresh all existing blocks in the workspace
  if (window.workspace) {
    window.workspace.getAllBlocks(false).forEach(block => {
      if (block.getField("DEVICE")) {
        const field = block.getField("DEVICE");
        field.menuGenerator_ = names;
        field.setValue(names[0][1]); // select first device or NONE
      }
    });
  }
}

// Update dropdowns when devices connect or disconnect
document.addEventListener("serial-connected", updateLegoDeviceDropdowns);
document.addEventListener("serial-disconnected", updateLegoDeviceDropdowns);