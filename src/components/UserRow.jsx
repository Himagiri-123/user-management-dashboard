
export default function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.department}</td>
      <td>
        <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={() => onEdit(user)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(user)}>Delete</button>
      </td>
    </tr>
  );
}