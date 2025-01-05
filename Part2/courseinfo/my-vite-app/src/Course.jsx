const Course = ({ course }) => {
    return (
      <div>
        {course.map((course) => {
          const { id, name, parts } = course;
          return (
            <div key={id}>
              <h1>{name}</h1>
              <ul>
                {parts.map((part) => (
                  <li key={part.id}>
                    {part.name} {part.exercises}
                  </li>
                ))}
              </ul>
              <h4>
                Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
              </h4>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default Course;