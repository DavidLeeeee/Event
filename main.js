document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(
    ".outerBox, .middleBox, .innerBox1, .innerBox2"
  );
  const consoleBody = document.querySelector(".console-body");
  const clearButton = document.getElementById("clear-button");
  clearButton.addEventListener("click", () => {
    consoleBody.textContent = "";
  });
  boxes.forEach((box) => {
    box.addEventListener("click", (event) => {
      const boxClass = event.currentTarget.className;
      updateConsole(`클릭됨: ${boxClass}`);
    });
  });

  function updateConsole(message) {
    const logEntry = document.createElement("div");
    logEntry.textContent = message;
    consoleBody.appendChild(logEntry);
  }
});

// 가장 단순한 방법 : 클릭할 때, 맨 처음 ConsoleBody를 초기화
