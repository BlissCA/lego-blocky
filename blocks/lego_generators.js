Blockly.JavaScript['lego_connect'] = function(block) {
  return `await lego.connect();\n`;
};

Blockly.JavaScript['lego_disconnect'] = function(block) {
  return `await lego.disconnect();\n`;
};

Blockly.JavaScript['lego_set_output'] = function(block) {
  const device = block.getFieldValue('DEVICE');
  const port = block.getFieldValue('PORT');
  const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || 0;

  return `await lego.setOutput("${device}", ${port}, ${value});\n`;
};

Blockly.JavaScript['lego_read_packet'] = function(block) {
  const device = block.getFieldValue('DEVICE');
  return [`lego.readPacket("${device}")`, Blockly.JavaScript.ORDER_NONE];
};
