const boxOptions = {
  outerBox: {
    useStopPropagation: false,
    useStopImmediatePropagation: false,
    usePreventDefault: false,
  },
  middleBox: {
    useStopPropagation: false,
    useStopImmediatePropagation: false,
    usePreventDefault: false,
  },
  innerBox1: {
    useStopPropagation: false,
    useStopImmediatePropagation: false,
    usePreventDefault: false,
  },
  innerBox2: {
    useStopPropagation: false,
    useStopImmediatePropagation: false,
    usePreventDefault: false,
  },
};
let captureMode = false;

document.addEventListener("DOMContentLoaded", () => {
  addEventToSelector(
    "click", //Event Type
    ".outerBox, .middleBox, .innerBox1, .innerBox2", //DOM
    handleClick //function
  );

  /* 이벤트 등록 / 제거 함수 */
  function addEventToSelector(eventType, selector, handler) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.addEventListener(eventType, handler, captureMode);
      // const isMiddleBox = element.classList.contains("outerBox");
      // element.addEventListener(
      //   eventType,
      //   handler,
      //   isMiddleBox ? true : captureMode
      // );
    });
  }

  function removeEventFromSelector(eventType, selector, handler) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.removeEventListener(eventType, handler, captureMode);
    });
  }

  function handleClick(event) {
    const className = event.currentTarget.className; //발생 요소
    const options = boxOptions[className];
    const optionSetterName = event.target.className; //클릭한 요소

    if (options.usePreventDefault) {
      event.preventDefault();
    }
    if (options.useStopImmediatePropagation) {
      event.stopImmediatePropagation();
    }
    if (options.useStopPropagation) {
      event.stopPropagation();
    }
    /*
    if (className === "middleBox") {
      setTimeout(() => {
        const optionSelectedBoxName =
          document.getElementById("selectedBoxName");
        optionSelectedBoxName.textContent = optionSetterName;

        updateConsole(`클릭됨: ${className}`);
      }, 1000); // 1초 지연
    } else {
      const optionSelectedBoxName = document.getElementById("selectedBoxName");
      optionSelectedBoxName.textContent = optionSetterName;

      updateConsole(`클릭됨: ${className}`);
    }
    */
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

  // Console Empty
  const clearButton = document.getElementById("clear-button");
  clearButton.addEventListener("click", () => {
    document.querySelector(".console-body").textContent = "";
  });

  // Option Button Event Handler
  document
    .querySelectorAll(".outerBox, .middleBox, .innerBox1, .innerBox2")
    .forEach((element) => {
      element.addEventListener("click", (event) => {
        const selectedBox = event.target.className; //선택된 박스
        const optionButtons = document.querySelectorAll(".option button"); //선택한 옵션
        optionButtons.forEach((button) => {
          button.onclick = () => {
            const optionName = button.getAttribute("data-option");
            let optionValue; //값 안내하기
            switch (optionName) {
              case "stopPropagation":
                boxOptions[selectedBox].useStopPropagation =
                  !boxOptions[selectedBox].useStopPropagation;
                optionValue = boxOptions[selectedBox].useStopPropagation;
                break;
              case "stopImmediatePropagation":
                boxOptions[selectedBox].useStopImmediatePropagation =
                  !boxOptions[selectedBox].useStopImmediatePropagation;
                optionValue =
                  boxOptions[selectedBox].useStopImmediatePropagation;
                break;
              case "preventDefault":
                boxOptions[selectedBox].usePreventDefault =
                  !boxOptions[selectedBox].usePreventDefault;
                optionValue = boxOptions[selectedBox].usePreventDefault;
                break;
              case "toggleEventPhase":
                removeEventFromSelector(
                  "click",
                  ".outerBox, .middleBox, .innerBox1, .innerBox2",
                  handleClick
                );
                /*
                 * 전파 모드 변경 시에는 이벤트를 제거한 뒤 부착해야한다. (새로 이벤트 등록이 필요)
                 * 전파 모드가 다르다면, 이벤트 제거가 불가능하다. 즉, captureMode가 같아야 리스너 제거 가능
                 */
                captureMode = !captureMode;
                addEventToSelector(
                  "click",
                  ".outerBox, .middleBox, .innerBox1, .innerBox2",
                  handleClick
                );
                optionValue = captureMode ? "Capture" : "Bubble";
                break;
            }
            updateConsole(
              `${selectedBox} & ${optionName} 설정: ${optionValue}`
            );
            console.log(boxOptions);
          };
        });
      });
    });
});

// 가장 단순한 방법 : 클릭할 때, 맨 처음 ConsoleBody를 초기화
