import React from 'react'



function Answer(props) {
    
        return(
            <button value={`${props.selected}`} className="btn btn-light btn-block" onClick={props.handleClick}>
                <span className="number"> {props.answer} </span>
            </button>
        )
    }

export default Answer


// let CountData = 0
// console.log('CD', parseInt(CountData))
// console.log('count', parseInt(count))
// function addTogether() {
//     CountData = CountData + parseInt(count);
//     localStorage.setItem('key', CountData);
// }
// addTogether();
// console.log('new CD', CountData);
// console.log('new CD in storage', localStorage.getItem('key', CountData));

       // setCount(count);
            // let CountData = 0
            // console.log('CD', parseInt(CountData))
            // console.log('count', parseInt(count))
            // function addTogether() {
            //     CountData = CountData + parseInt(count);
            //     localStorage.setItem('key', CountData);
            // }
            // addTogether();
            // console.log('new CD', CountData);
            // console.log('new CD in storage', localStorage.getItem('key', CountData));

 // function increment(e) {
    //     if (e.target.value === '1') {
    //         setCount(first => first = 1);
            
    //         // console.log("clicked", questions.choice1)

    //     } else if (e.target.value === '2') {
    //         setCount(Second => Second = 2)
    //         // console.log("clicked", questions.choice2)
    //         console.log(count);

    //     } else if (e.target.value === '3') {
    //         setCount(Third => Third = 3)
    //         // console.log("clicked", questions.choice3)
    //         console.log(count);

    //     } else if (e.target.value === '4') {
    //         setCount(Fourth => Fourth = 4)
    //         // console.log("clicked", questions.choice4)
    //         console.log(count);

    //     } else if (e.target.value === '5') {
    //         setCount(Fifth => Fifth = 5)
    //         // console.log("clicked", questions.choice5)
    //         console.log(count);
    //     }
    // }