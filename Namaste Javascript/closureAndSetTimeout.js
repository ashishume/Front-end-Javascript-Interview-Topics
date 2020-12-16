function x() {
  for (var i = 1; i < 6; i++) {
    function closeHandler(i) {
      setTimeout(() => {
        console.log(i);
      }, i * 1000);
    }
    closeHandler(i); //its written like this because we make a copy of "i" and pass as arguments so
    // that i gets a new value everytime the function is called
  }
}

x();
