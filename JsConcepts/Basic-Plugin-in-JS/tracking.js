(function () {
  function listenClickEvents(event) {
    const clickedElement = event.target;
    const elementType = clickedElement.tagName;
    const elementText = clickedElement.textContent;
    const elementId = clickedElement.id;
    userInteraction("click", {
      type: "element",
      elementType,
      elementText,
      elementId,
    });
    // do some cool stuff....
  }
  function listenTypeEvents(event) {
    const typedText = event.target.value;
    userInteraction("typing", {
      type: "text",
      typedText,
    });
    // do some cool stuff....
  }
  function init(e) {
    document.addEventListener("click", listenClickEvents);

    const textInputs = document.querySelectorAll(
      'input[type="text"], input[type="email"], textarea'
    );

    textInputs.forEach((input) => {
      input.addEventListener("input", listenTypeEvents);
    });
  }

  /** some random methods */
  function userInteraction(eventName, event) {
    console.log(eventName, "==>", event);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
