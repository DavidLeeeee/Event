document.addEventListener("DOMContentLoaded", () => {
  const boxOptions = {
    outerBox: {
      useCapture: false,
      useTimeout: false,
      useStopPropagation: false,
      useStopImmediatePropagation: false,
      usePreventDefault: false,
    },
    middleBox: {
      useCapture: false,
      useTimeout: false,
      useStopPropagation: false,
      useStopImmediatePropagation: false,
      usePreventDefault: false,
    },
    innerBox1: {
      useCapture: false,
      useTimeout: false,
      useStopPropagation: false,
      useStopImmediatePropagation: false,
      usePreventDefault: false,
    },
    innerBox2: {
      useCapture: false,
      useTimeout: false,
      useStopPropagation: false,
      useStopImmediatePropagation: false,
      usePreventDefault: false,
    },
  };

  // 이벤트 리스너를 추가하는 함수
  function addEventListenerToSelector(selector, eventType, handler) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.addEventListener(eventType, handler);
    });
  }

  // 클릭 이벤트 핸들러
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

    if (options.useTimeout) {
      setTimeout(() => {
        const optionSelectedBoxName =
          document.getElementById("selectedBoxName");
        optionSelectedBoxName.textContent = optionSetterName;
      }, 1000);
    } else {
      const optionSelectedBoxName = document.getElementById("selectedBoxName");
      optionSelectedBoxName.textContent = optionSetterName;
    }

    updateConsole(`클릭됨: ${className}`);
  }

  // 콘솔 로그 업데이트
  function updateConsole(message) {
    const logEntry = document.createElement("div");
    logEntry.textContent = message;
    document.querySelector(".console-body").appendChild(logEntry);
  }

  // 이벤트 리스너를 여러 박스에 추가
  addEventListenerToSelector(
    ".outerBox, .middleBox, .innerBox1, .innerBox2",
    "click",
    handleClick
  );

  // 클리어 버튼 이벤트 핸들러
  const clearButton = document.getElementById("clear-button");
  clearButton.addEventListener("click", () => {
    document.querySelector(".console-body").textContent = "";
  });

  // 옵션 버튼 이벤트 핸들러
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
              case "Set Timeout":
                boxOptions[selectedBox].useTimeout =
                  !boxOptions[selectedBox].useTimeout;
                optionValue = boxOptions[selectedBox].useTimeout;
                break;
              case "Add stopPropagation()":
                boxOptions[selectedBox].useStopPropagation =
                  !boxOptions[selectedBox].useStopPropagation;
                optionValue = boxOptions[selectedBox].useStopPropagation;
                break;
              case "Add stopImmediatePropagation()":
                boxOptions[selectedBox].useStopImmediatePropagation =
                  !boxOptions[selectedBox].useStopImmediatePropagation;
                optionValue =
                  boxOptions[selectedBox].useStopImmediatePropagation;
                break;
              case "Add preventDefault()":
                boxOptions[selectedBox].usePreventDefault =
                  !boxOptions[selectedBox].usePreventDefault;
                optionValue = boxOptions[selectedBox].usePreventDefault;
                break;
              case "Toggle(Bubble/Capture)":
                boxOptions[selectedBox].useCapture =
                  !boxOptions[selectedBox].useCapture;
                optionValue = boxOptions[selectedBox].useCapture;
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
