/**
 * 
 * 
var x = "global";
var y = function () {
    console.log(this.x);
};
y();
y.bind(this);
y();
new y();
-----------------------------

function foo() {
  console.log(i); // ReferenceError: Cannot access 'i' before initialization
  let i = 42;
}

foo();


-----------------------------

function list (){
    return [].slice.call(arguments)
} 
var temp=list.bind(null,37)
var temp2=temp()
console.log(temp2)

-----------------------------

which of them is corrwct
h2 - p
h2 + p
h2 p
h2 > p

*/

/**
 * 
 * 
 * // data:{ [{id: 403, title: 'Task 403', priority: 'High', type: 'Improvement', complete: 100},
//         {
//             id: 532,
//             title: 'Task 532',
//             priority: 'Medium',
//             type: 'Improvement',
//             complete: 30
//         },
//         {id: 240, title: 'Task 240', priority: 'High', type: 'Story', complete: 66}
//     ], status: 'SUCCESS'
// }

create a table with this data and sort as per number when clicked on table header
 */

/** Q: Create Array.insertAt() example: 
 *  arr = [1, 2, 3, 4, 5];
 newArr = arr.insert(2, 6);
 console.log(newArr); // [1,2,6,3,4,5]
 */
