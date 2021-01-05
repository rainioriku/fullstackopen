const Total = (props) => {
    let parts = props.parts
    console.log("parts: ", parts)

    const total = parts.reduce((accumulator, currVal) => {
        console.log("accumulator type: ", typeof(accumulator))
        console.log("currval type: ", typeof(currVal))
        console.log("currval: ", parseInt(currVal.exercises))

        return accumulator += parseInt(currVal.exercises)
    }, 0)


    return (
        <div>
            <p>
                <b>
                    total of {total} exercises
                </b>
            </p>    
        </div>
    )
}

export default Total