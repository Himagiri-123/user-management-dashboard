
export default function SearchBar({ searchQuery, onSearchChange, filterDepartment, onOpenFilter }) {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input 
        type="text" 
        placeholder="Search by Name or Email..." 
        style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button className="btn btn-primary" onClick={onOpenFilter}>
        Filter by Dept {filterDepartment && `(${filterDepartment})`}
      </button>
    </div>
  );
}