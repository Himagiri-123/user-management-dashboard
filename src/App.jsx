
import { useState, useEffect, useMemo } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './api/userService';


import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import FilterPopup from './components/FilterPopup';
import UserForm from './components/UserForm';
import ConfirmDelete from './components/ConfirmDelete';

import './index.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const response = await getUsers();
      const mappedUsers = response.data.map((user) => {
        const nameParts = user.name.split(" ");
        return {
          id: user.id,
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "", 
          email: user.email,
          department: "IT",
        };
      });
      setUsers(mappedUsers);
      setLoading(false);
    } catch (err) { setError("Failed to load users."); setLoading(false); }
  };

  const handleFormSubmit = async (formData) => {
    if (editingUser) {
      try {
        await updateUser(editingUser.id, formData);
        setUsers(users.map(u => u.id === editingUser.id ? { ...formData, id: editingUser.id } : u));
      } catch (err) { alert("Failed to update user."); }
    } else {
      try {
        const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
        const createdUser = { ...formData, id: maxId + 1 };
        setUsers([createdUser, ...users]);
      } catch (err) { alert("Failed to add user."); }
    }
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(userToDelete.id);
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setIsDeleteOpen(false);
      setUserToDelete(null);
    } catch (err) { alert("Failed to delete user."); }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const processedUsers = useMemo(() => {
    let result = [...users];
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.firstName.toLowerCase().includes(lowerQuery) || u.lastName.toLowerCase().includes(lowerQuery) || u.email.toLowerCase().includes(lowerQuery)
      );
    }
    if (filterDepartment) result = result.filter(u => u.department === filterDepartment);
    
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [users, searchQuery, filterDepartment, sortConfig]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleUsers = processedUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container">
      <Header onAddUser={() => { setEditingUser(null); setIsFormOpen(true); }} />

      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={(val) => { setSearchQuery(val); setCurrentPage(1); }} 
        filterDepartment={filterDepartment} 
        onOpenFilter={() => setIsFilterOpen(true)} 
      />

      {loading && <p>Loading users data...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <>
          <UserTable 
            users={visibleUsers} 
            handleSort={handleSort} 
            onEdit={(user) => { setEditingUser(user); setIsFormOpen(true); }} 
            onDelete={(user) => { setUserToDelete(user); setIsDeleteOpen(true); }} 
          />
          <Pagination 
            totalItems={processedUsers.length} 
            itemsPerPage={itemsPerPage} 
            currentPage={currentPage} 
            onPageChange={setCurrentPage} 
            onItemsPerPageChange={(num) => { setItemsPerPage(num); setCurrentPage(1); }} 
          />
        </>
      )}

      <UserForm isOpen={isFormOpen} onClose={() => { setIsFormOpen(false); setEditingUser(null); }} onSubmit={handleFormSubmit} initialData={editingUser} />
      <ConfirmDelete isOpen={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setUserToDelete(null); }} onConfirm={confirmDelete} />
      <FilterPopup isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} currentFilter={filterDepartment} onApplyFilter={(val) => { setFilterDepartment(val); setCurrentPage(1); }} />
    </div>
  );
}

export default App;