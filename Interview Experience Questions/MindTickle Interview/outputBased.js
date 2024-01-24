(function () {
  console.log(1);

  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(console.log(5));
    }, 500);
  });

  setTimeout(function () {
    console.log(2);
  }, 1000);

  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(console.log(6));
    }, 0);
  });

  setTimeout(function () {
    console.log(3);
  }, 0);

  console.log(8);

  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(console.log(10));
    }, 1000);
  });

  console.log(7);

  for (i = 0; i < 100000; i++) {}

  console.log(4);
})();

//Real output after printing
/**
1
8
7
4
6
3
5
2
10
*/

// -----------------------------------------------
/**
(function() {
    console.log(1); 
    promise - 500ms - console.log(5)
    setTimeout(function(){console.log(2)}, 1000); 
    promise - 0ms - console.log(6)
    setTimeout(function(){console.log(3)}, 0); 
    console.log(8);
    promise - 1000ms - console.log(10)
    console.log(7);
    for(i=0; i<100000; i++){}
    console.log(4);
    })();




Ans:
1
8
7
4

6
5
10

3
2
*/

/**
 * 
1
8
7
4

6
3
5
2
10
 */
