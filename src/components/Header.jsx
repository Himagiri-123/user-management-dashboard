
export default function Header({ onAddUser }) {
  return (
    <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
      <h2 style={{ margin: 0 }}>User Management Dashboard</h2>
      <button className="btn btn-success" onClick={onAddUser}>
        + Add User
      </button>
    </div>
  );
}