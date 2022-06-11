export function rand_nth(a: Array<String>): String {
    return a[Math.floor(Math.random() * a.length)];
}



// var ii = { "val": "1", "next": { "val": "2", "next": { "val": "3", "next": { "val": "4", "next": { "val": "5", "next": null } } } } }; 
// var arr = [ii.val]
// while(ii.next !== null){
//     ii = ii.next;
// return arr.push(ii.val)



// function linkedlist_to_jsarray(ii) {
//     var arr = [ii.val]
//     while(ii.next !== null){
//         ii = ii.next;
//     return arr.push(ii.val)
// }

// }


// function linkedlist_to_jsarray_test() {
//     console.log(
//         linkedlist_to_jsarray(example_linked_list);
//     )
// }

