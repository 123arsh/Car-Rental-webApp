import React, { useState, useEffect } from 'react';
import { FaCar, FaPlus, FaUserCircle, FaBars, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';
import AddCar from './components/auth/AddCar'; // Adjust path if needed
import axios from 'axios';
import { useAuth } from './contexts/AuthContext';

const sections = [
  { key: 'requests', label: 'New Requests', icon: <FaClipboardList /> },
  { key: 'addcar', label: 'Add Car', icon: <FaPlus /> },
];

const Sidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => (
  <aside className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-700 to-blue-900 shadow-2xl z-30 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
    <div className="flex items-center gap-2 px-6 py-6 border-b border-blue-800">
      <FaCar className="text-white text-3xl" />
      <span className="text-xl font-bold text-white tracking-wide">Car Rental</span>
    </div>
    <nav className="mt-8 flex flex-col gap-2 px-4">
      {sections.map((section) => (
        <button
          key={section.key}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition
            ${activeSection === section.key
              ? 'bg-white text-blue-800 shadow'
              : 'text-white hover:bg-blue-800 hover:text-white'}`}
          onClick={() => { setActiveSection(section.key); setIsOpen(false); }}
        >
          {section.icon} {section.label}
        </button>
      ))}
    </nav>
  </aside>
);

const TopBar = ({ user, setIsOpen, onLogout }) => (
  <header className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur shadow sticky top-0 z-20">
    <button className="md:hidden text-2xl text-blue-700" onClick={() => setIsOpen(v => !v)}>
      <FaBars />
    </button>
    <div></div>
    <div className="flex items-center gap-3 relative group">
      <span className="font-semibold text-gray-800 text-lg">Welcome, {user?.firstName || 'Admin'}</span>
      <FaUserCircle className="text-3xl text-blue-700" />
      <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg py-2 px-4 opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
        <button onClick={onLogout} className="flex items-center gap-2 text-red-600 hover:text-red-800">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  </header>
);

const RequestsSection = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [comment, setComment] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:7700/detail/pending');
      setPending(res.data.detail);
    } catch {
      setError('Failed to fetch pending verifications');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (id, action) => {
    setActionLoading(id + action);
    setError('');
    setSuccess('');
    try {
      await axios.patch(`http://localhost:7700/detail/${action}/${id}`, {
        adminComment: comment[id] || ''
      });
      setSuccess(`Verification ${action}d successfully!`);
      fetchPending();
    } catch {
      setError('Action failed.');
    }
    setActionLoading(null);
  };

  return (
    <div className="max-w-5xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2">
      {loading ? (
        <div className="col-span-2 text-center text-blue-600 font-semibold">Loading requests...</div>
      ) : pending.length === 0 ? (
        <div className="col-span-2 text-center text-gray-600">No pending verifications.</div>
      ) : (
        pending.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition group flex flex-col gap-3">
            <h3 className="text-xl font-bold text-blue-800 mb-2">{item.firstName} {item.lastName}</h3>
            <p className="text-gray-700">Email: {item.email}</p>
            <p className="text-gray-500">Phone: {item.phNumber}</p>
            <p className="text-gray-500">Start: {item.startDate} | End: {item.endDate}</p>
            <div className="flex gap-4 mt-2">
              <div>
                <span className="font-medium">Aadhar:</span><br/>
                <img src={`http://localhost:7700/docImages/${item.adharCard}`} alt='Aadhar' className='w-32 h-20 object-contain border rounded'/>
              </div>
              <div>
                <span className="font-medium">License:</span><br/>
                <img src={`http://localhost:7700/docImages/${item.drivingLicence}`} alt='License' className='w-32 h-20 object-contain border rounded'/>
              </div>
            </div>
            <textarea
              className="border rounded p-2 w-full mt-2"
              placeholder="Admin comment (optional)"
              value={comment[item._id] || ''}
              onChange={e => setComment({ ...comment, [item._id]: e.target.value })}
            />
            <div className="flex gap-2 mt-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                disabled={actionLoading === item._id + 'approve'}
                onClick={() => handleAction(item._id, 'approve')}
              >{actionLoading === item._id + 'approve' ? 'Approving...' : 'Approve'}</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
                disabled={actionLoading === item._id + 'reject'}
                onClick={() => handleAction(item._id, 'reject')}
              >{actionLoading === item._id + 'reject' ? 'Rejecting...' : 'Reject'}</button>
            </div>
            {success && <div className="text-green-600 text-sm mt-1">{success}</div>}
            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
          </div>
        ))
      )}
    </div>
  );
};

const DashboardContent = ({ activeSection }) => {
  if (activeSection === 'addcar') {
    return <AddCar />;
  }
  if (activeSection === 'requests') {
    return <RequestsSection />;
  }
  return null;
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('requests');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    logout && logout();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`md:ml-64 transition-all duration-300 ${sidebarOpen ? 'ml-64' : ''}`}>
        <TopBar user={user} setIsOpen={setSidebarOpen} onLogout={handleLogout} />
        <main className="p-8 animate-fade-in">
          <DashboardContent activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 