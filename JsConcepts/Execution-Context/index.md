Ref URL: https://www.freecodecamp.org/news/execution-context-how-javascript-works-behind-the-scenes/
# 2 types of execution context
- ## Global Execution Context (GEC)
- ## Function Execution Context (FEC) 

1. ###  GEC: Whenever the JavaScript engine receives a script file, it first creates a default Execution Context known as the Global Execution Context (GEC). There is only one execution context for every js file.

2. ### FEC: Whenever a function is called, the JavaScript engine creates a different type of Execution Context known as a Function Execution Context (FEC) within the GEC to evaluate and execute the code within that function. There could be more FEC in the same GEC