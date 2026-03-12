import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div style={styles.wrapper}>
      <Sidebar />
      <div style={styles.content}>
        <h1>Dashboard</h1>
        <p>Select a module from the left.</p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
  },
  content: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#f5f5f5",
  },
};
