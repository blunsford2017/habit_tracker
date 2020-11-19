const newHabitButton = $("button");

newHabitButton.on('click', handleClick);

function handleClick() {
    // take the input
    const habit = $('input:text');
    // add days of the week that change color when clicked
    habit + [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Satday",
    ]
    // add delete button

    // added below new habit button continually
    $('body').append();
}
