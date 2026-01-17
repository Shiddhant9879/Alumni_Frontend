export default function ProfileTable({ profiles, onBack }) {
  return (
    <div className="module-page">
      <div className="app-card" style={{ marginLeft: "200px" }}>
        <h3>Saved Alumni Profiles</h3>

        {profiles.length === 0 ? (
          <p>No profiles available.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Branch</th>
                <th>Year</th>
                <th>CGPA</th>
                <th>Industry</th>
                <th>Experience</th>
                <th>Company</th>
                <th>Skills</th>
                <th>Achievements</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p, i) => (
                <tr key={i}>
                  <td>{p.branch}</td>
                  <td>{p.year}</td>
                  <td>{p.cgpa}</td>
                  <td>{p.industry}</td>
                  <td>{p.experience}</td>
                  <td>{p.company}</td>
                  <td>{p.skills}</td>
                  <td>{p.achievements}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button onClick={onBack} style={{ marginTop: "15px" }}>
          Back to Profile Entry
        </button>
      </div>
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};
