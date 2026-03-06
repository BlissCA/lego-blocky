//
// lego_blocks.js
// LEGO Interface B blocks with dynamic device dropdowns
//

// ------------------------------------------------------------
// Dynamic dropdown function
// ------------------------------------------------------------
function getDeviceDropdown() {
  const devices = window.deviceManager?.devices || [];
  return devices.length
    ? devices.map(d => [d.name, d.name])
    : [["No devices", "NONE"]];
}

// ------------------------------------------------------------
// Block definitions
// ------------------------------------------------------------
Blockly.defineBlocksWithJsonArray([

  {
    "type": "lego_connect",
    "message0": "connect new LEGO Interface B",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 60,
    "tooltip": "Connect a new LEGO Interface B",
    "helpUrl": ""
  },

  {
    "type": "lego_disconnect",
    "message0": "disconnect all LEGO devices",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 60,
    "tooltip": "Disconnect all LEGO devices",
    "helpUrl": ""
  },

  {
    "type": "lego_set_output",
    "message0": "device %1 set output %2 to %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DEVICE",
        "options": getDeviceDropdown
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
    "tooltip": "Set motor/relay output on the selected device",
    "helpUrl": ""
  },

  {
    "type": "lego_read_packet",
    "message0": "device %1 read last packet",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DEVICE",
        "options": getDeviceDropdown
      }
    ],
    "output": null,
    "colour": 60,
    "tooltip": "Read the last 19-byte packet from the selected device",
    "helpUrl": ""
  }

]);
