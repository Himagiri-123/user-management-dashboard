export default function FilterPopup({ isOpen, onClose, currentFilter, onApplyFilter }) {
  if (!isOpen) return null;

  const handleApply = (e) => {
    onApplyFilter(e.target.value);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '300px' }}>
        <h3>Filter by Department</h3>
        <select 
          className="form-group" 
          style={{ width: '100%', padding: '10px', marginBottom: '20px' }} 
          value={currentFilter} 
          onChange={handleApply}
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="Sales">Sales</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
        </select>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}