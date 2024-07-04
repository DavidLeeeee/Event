document.addEventListener("DOMContentLoaded", () => {
  const boxOptions = {
    outerBox: {
      capture: false,
      useStopPropagation: false,
      useStopImmediatePropagation: false,
      usePreventDefault: false,
    },
    middleBox: {
      capture: false,
      useStopPropagation: false,
      useStopImmediatePropagation: false,
      usePreventDefault: false,
    },
    innerBox1: {
      capture: false,
      useStopPropagation: false,
      useStopImmediatePropagation: false,
      usePreventDefault: false,
    },
    innerBox2: {
      capture: false,
      useStopPropagation: false,
      useStopImmediatePropagation: false,
      usePreventDefault: false,
    },
  };

  // 이벤트 리스너를 추가하는 함수
  function addEventListenerToSelector(selector, eventType, handler) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.addEventListener(eventType, handler, boxOptions[element.className].capture);  // Use the capture option
    });
  }

  // Click Event Handler
  function handleClick(event) {
    const className = event.currentTarget.className;
    const options = boxOptions[className];
    const optionSetterName = event.target.className;

    if (options.usePreventDefault) {
      event.preventDefault();
    }

    if (options.useStopImmediatePropagation) {
      event.stopImmediatePropagation();
    } else if (options.useStopPropagation) {
      event.stopPropagation();
    }

    const optionSelectedBoxName = document.getElementById("selectedBoxName");
    optionSelectedBoxName.textContent = optionSetterName;

    updateConsole(`클릭됨: ${className}`);
  }

  // Console Log Update
  function updateConsole(message) {
    const logEntry = document.createElement("div");
    logEntry.textContent = message;
    document.querySelector(".console-body").appendChild(logEntry);
  }

  // Add Event Listener
  addEventListenerToSelector(
    ".outerBox, .middleBox, .innerBox1, .innerBox2",
    "click",
    handleClick
  );

  // Console Empty
  const clearButton = document.getElementById("clear-button");
  clearButton.addEventListener("click", () => {
    document.querySelector(".console-body").textContent = "";
  });


  // Remove event listeners function
  function removeEventListenerFromSelector(selector, eventType, handler) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.removeEventListener(eventType, handler, boxOptions[element.className].capture);
    });
  }
  // Reattach event listeners
  function reattachEventListeners() {
    removeEventListenerFromSelector(
      ".outerBox, .middleBox, .innerBox1, .innerBox2",
      "click",
      handleClick
    );
    addEventListenerToSelector(
      ".outerBox, .middleBox, .innerBox1, .innerBox2",
      "click",
      handleClick
    );
  }

  
  // Option Button Event Handler
  document
    .querySelectorAll(".outerBox, .middleBox, .innerBox1, .innerBox2")
    .forEach((element) => {
      element.addEventListener("click", (event) => {
        const selectedBox = event.target.className;
        const optionButtons = document.querySelectorAll(".option button");
        optionButtons.forEach((button) => {
          button.onclick = () => {
            const optionName = button.textContent.trim();
            let optionValue;
            switch (optionName) {
              case "stopPropagation()":
                boxOptions[selectedBox].useStopPropagation =
                  !boxOptions[selectedBox].useStopPropagation;
                optionValue = boxOptions[selectedBox].useStopPropagation;
                break;
              case "stopImmediatePropagation()":
                boxOptions[selectedBox].useStopImmediatePropagation =
                  !boxOptions[selectedBox].useStopImmediatePropagation;
                optionValue = boxOptions[selectedBox].useStopImmediatePropagation;
                break;
              case "preventDefault()":
                boxOptions[selectedBox].usePreventDefault =
                  !boxOptions[selectedBox].usePreventDefault;
                optionValue = boxOptions[selectedBox].usePreventDefault;
                break;
              case "Toggle(Bubble/Capture)":
                boxOptions[selectedBox].capture =
                  !boxOptions[selectedBox].capture;
                optionValue = boxOptions[selectedBox].capture;
                reattachEventListeners();  
                break;
            }
            updateConsole(
              `${selectedBox} & ${optionName} 설정: ${optionValue}`
            );
          };
        });
      });
    });
});


// 가장 단순한 방법 : 클릭할 때, 맨 처음 ConsoleBody를 초기화
