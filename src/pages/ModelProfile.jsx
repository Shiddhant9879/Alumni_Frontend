export default function ModelProfile({ student, onBack }) {
  return (
    <div className="module-page">
      <div className="app-card" style={{ marginLeft: "200px" }}>
        <h3>{student.name}</h3>

        <table style={{ width: "100%" }}>
          <tbody>
            <tr><td>Branch</td><td>{student.branch}</td></tr>
            <tr><td>Passing Year</td><td>{student.year}</td></tr>
            <tr><td>CGPA</td><td>{student.cgpa}</td></tr>
            <tr><td>Industry</td><td>{student.industry}</td></tr>
            <tr><td>Experience</td><td>{student.experience} years</td></tr>
            <tr><td>Company</td><td>{student.company}</td></tr>
            <tr><td>Skills</td><td>{student.skills}</td></tr>
            <tr><td>Achievements</td><td>{student.achievements}</td></tr>
          </tbody>
        </table>

        <button onClick={onBack} style={{ marginTop: "15px" }}>
          Back
        </button>
      </div>
    </div>
  );
}
