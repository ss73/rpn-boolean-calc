// Globals
var stmts = new Array();
var stack = new Array();

function setup() {
  attachClick('b-true', () => {stmts.push(true); updateInput()});
  attachClick('b-false', () => {stmts.push(false); updateInput()});
  attachClick('b-and', () => {stmts.push('and'); updateInput()});
  attachClick('b-or', () => {stmts.push('or'); updateInput()});
  attachClick('b-not', () => {stmts.push('not'); updateInput()});
  attachClick('b-eval', () => {eval()});
  attachClick('b-clear', () => {clear()});
}

function attachClick(id, action) {
  document.getElementById(id).onclick = action;
}

function updateInput() {
  var txt = "";
  stmts.forEach((item, index) => {txt += item + ' '});
  document.getElementById('inp').value = txt;
}

function updateStack() {
  var txt = "";
  stack.forEach((item, index) => {txt += item + ' '});
  document.getElementById('stack').value = txt;
}

function clear() {
  stmts = [];
  stack = [];
  updateInput();
  updateStack();
}

function eval() {
  stmt = stmts.length > 0 ? String(stmts.shift()).trim() : "none";
  updateInput();
  console.log(stmt + " " + stack);
  //console.log(stack);
  if(stmt == "and") {
    var a = stack.pop();
    var b = stack.pop();
    stack.push(a && b);
  }
  else if (stmt == "or") {
    var a = stack.pop();
    var b = stack.pop();
    stack.push(a || b)
  }
  else if (stmt == "not") {
    stack.push(!stack.pop())
  }
  else if (stmt == "true") {
    stack.push(true);
  }
  else if (stmt == "false") {
    stack.push(false);
  }
  else if (stmt == "none") {
    console.log("No statements to parse");
  }
  updateStack();
}

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  setup();
});
