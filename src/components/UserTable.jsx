
import UserRow from './UserRow';

export default function UserTable({ users, handleSort, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>ID ↕</th>
            <th onClick={() => handleSort('firstName')} style={{ cursor: 'pointer' }}>First Name ↕</th>
            <th onClick={() => handleSort('lastName')} style={{ cursor: 'pointer' }}>Last Name ↕</th>
            <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>Email ↕</th>
            <th onClick={() => handleSort('department')} style={{ cursor: 'pointer' }}>Department ↕</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
            ))
          ) : (
            <tr><td colSpan="6" style={{ textAlign: 'center' }}>No users found!</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}