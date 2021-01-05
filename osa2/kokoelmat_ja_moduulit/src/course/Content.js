import Part from "./Part"

const Content = (p) => {
    let parts = p.parts

    return (
        <div>
            {parts.map(part =>
                <Part key={part.id}
                      name={part.name}
                      exercises={part.exercises}></Part>
            )}
        </div>
    )
}

export default Content