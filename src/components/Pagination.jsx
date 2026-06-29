
export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange, onItemsPerPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '10px', background: 'white', borderRadius: '8px' }}>
      
      <div>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Rows per page:</label>
        <select value={itemsPerPage} onChange={(e) => onItemsPerPageChange(Number(e.target.value))} style={{ padding: '5px', borderRadius: '4px' }}>
  <option value={10}>10</option>
  <option value={25}>25</option>
  <option value={50}>50</option>
  <option value={100}>100</option>
</select>
      </div>

     
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <button 
          className="btn" 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          style={{ background: currentPage === 1 ? '#e2e8f0' : '#2563eb', color: currentPage === 1 ? '#64748b' : 'white' }}
        >
          Previous
        </button>
        
        <span style={{ fontWeight: 'bold', padding: '0 10px' }}>
          Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
        </span>
        
        <button 
          className="btn" 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages || totalPages === 0}
          style={{ background: currentPage === totalPages || totalPages === 0 ? '#e2e8f0' : '#2563eb', color: currentPage === totalPages || totalPages === 0 ? '#64748b' : 'white' }}
        >
          Next
        </button>
      </div>

    </div>
  );
}