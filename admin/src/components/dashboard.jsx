import React, { useState, useEffect } from 'react';
import { FaCar, FaPlus, FaUserCircle, FaBars, FaSignOutAlt, FaClipboardList, FaHome, FaIdCard, FaCheckCircle, FaTimesCircle, FaCarSide } from 'react-icons/fa';
import AddCar from './auth/AddCar';
import OccupiedCars from "./navigation/occupiedCars";
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const sections = [
  { key: 'dashboard', label: 'Admin Dashboard', icon: <FaHome /> },
  { key: 'requests', label: 'Requests', icon: <FaClipboardList /> },
  { key: 'accepted', label: 'Accepted Requests', icon: <FaCheckCircle /> },
  { key: 'rejected', label: 'Rejected Requests', icon: <FaTimesCircle /> },
  { key: 'occupied', label: 'Occupied Cars', icon: <FaCarSide /> },
  { key: 'addcar', label: 'Add Cars', icon: <FaPlus /> },
];

const Sidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => (
  <aside className={`
    fixed top-0 left-0 h-full bg-gradient-to-b from-blue-700 to-blue-900 shadow-2xl z-30
    transition-transform duration-300
    w-64
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `}>
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

const TopBar = ({ user, sidebarOpen, setIsOpen, onLogout }) => (
  <header className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur shadow sticky top-0 z-20">
    {!sidebarOpen && (
      <button className="text-2xl text-blue-700" onClick={() => setIsOpen(true)}>
        <FaBars />
      </button>
    )}
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

const DashboardHome = () => {
  const [carCount, setCarCount] = useState(0);
  const [stats, setStats] = useState({ requests: 0, accepted: 0, rejected: 0, occupied: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const carRes = await axios.get('http://localhost:7700/car/list');
        setCarCount(carRes.data.cars?.length || 0);
        const reqRes = await axios.get('http://localhost:7700/detail/detail');
        const all = reqRes.data.detail || [];
        setStats({
          requests: all.length,
          accepted: all.filter(d => d.verificationStatus === 'approved').length,
          rejected: all.filter(d => d.verificationStatus === 'rejected').length,
          occupied: all.filter(d => d.occupied).length,
        });
      } catch {/* ignore error */}
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-blue-800 mb-4 flex items-center justify-center gap-2">
        <FaHome className="text-blue-500" /> Admin Dashboard
      </h2>
      <p className="text-gray-700 text-lg mb-8">Welcome to the Car Rental Admin Dashboard. Use the sidebar to manage requests, cars, and more.</p>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow p-6 flex flex-col items-center">
            <FaCar className="text-4xl text-blue-700 mb-2" />
            <div className="text-2xl font-bold text-blue-900">{carCount}</div>
            <div className="text-gray-700 font-medium">Total Cars</div>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-300 rounded-xl shadow p-6 flex flex-col items-center">
            <FaClipboardList className="text-4xl text-purple-700 mb-2" />
            <div className="text-2xl font-bold text-purple-900">{stats.requests}</div>
            <div className="text-gray-700 font-medium">Total Requests</div>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-green-300 rounded-xl shadow p-6 flex flex-col items-center">
            <FaCheckCircle className="text-4xl text-green-700 mb-2" />
            <div className="text-2xl font-bold text-green-900">{stats.accepted}</div>
            <div className="text-gray-700 font-medium">Accepted</div>
          </div>
          <div className="bg-gradient-to-br from-red-100 to-red-300 rounded-xl shadow p-6 flex flex-col items-center">
            <FaTimesCircle className="text-4xl text-red-700 mb-2" />
            <div className="text-2xl font-bold text-red-900">{stats.rejected}</div>
            <div className="text-gray-700 font-medium">Rejected</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-xl shadow p-6 flex flex-col items-center">
            <FaCarSide className="text-4xl text-yellow-700 mb-2" />
            <div className="text-2xl font-bold text-yellow-900">{stats.occupied}</div>
            <div className="text-gray-700 font-medium">Occupied Cars</div>
          </div>
        </div>
      )}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">Key Features</h3>
        <ul className="flex flex-wrap justify-center gap-6 text-left">
          <li className="flex items-center gap-2 bg-blue-50 rounded-lg px-4 py-2 shadow"><FaCar className="text-blue-500" /> Modern Fleet Management</li>
          <li className="flex items-center gap-2 bg-green-50 rounded-lg px-4 py-2 shadow"><FaCheckCircle className="text-green-500" /> Instant Request Approval</li>
          <li className="flex items-center gap-2 bg-purple-50 rounded-lg px-4 py-2 shadow"><FaClipboardList className="text-purple-500" /> Real-time Request Tracking</li>
          <li className="flex items-center gap-2 bg-yellow-50 rounded-lg px-4 py-2 shadow"><FaCarSide className="text-yellow-500" /> Occupied Car Monitoring</li>
          <li className="flex items-center gap-2 bg-red-50 rounded-lg px-4 py-2 shadow"><FaTimesCircle className="text-red-500" /> Rejection Insights</li>
        </ul>
      </div>
    </div>
  );
};

const RequestsSection = ({ onAction }) => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [comment, setComment] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [previewImg, setPreviewImg] = useState(null);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:7700/detail/pending');
      setPending(res.data.detail);
    } catch {/* ignore error */}
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
      setSuccess(`Request ${action}d successfully!`);
      fetchPending();
      onAction && onAction();
    } catch {/* ignore error */}
    setActionLoading(null);
  };

  return (
    <div className="max-w-5xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2">
      {loading ? (
        <div className="col-span-2 text-center text-blue-600 font-semibold">Loading requests...</div>
      ) : pending.length === 0 ? (
        <div className="col-span-2 text-center text-gray-600">No pending requests.</div>
      ) : (
        pending.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-blue-200 transition group flex flex-col gap-4 border border-blue-100 relative animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Pending</span>
              <span className="text-gray-400 text-xs">Request ID: {item._id.slice(-6)}</span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-blue-800 mb-1 flex items-center gap-2">
                  <FaUserCircle className="text-blue-400" /> {item.firstName} {item.lastName}
                </h3>
                <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-2">
                  <span><b>Email:</b> {item.email}</span>
                  <span><b>Phone:</b> {item.phNumber}</span>
                  <span><b>Start:</b> {item.startDate}</span>
                  <span><b>End:</b> {item.endDate}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-6 mb-2">
              <div className="flex flex-col items-center">
                <span className="font-medium text-xs mb-1">Aadhar</span>
                <img src={`http://localhost:7700/docImages/${item.adharCard}`} alt='Aadhar' className='w-28 h-20 object-contain border-2 border-blue-200 rounded-lg shadow cursor-pointer' onClick={() => setPreviewImg(`http://localhost:7700/docImages/${item.adharCard}`)} />
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-xs mb-1">License</span>
                <img src={`http://localhost:7700/docImages/${item.drivingLicence}`} alt='License' className='w-28 h-20 object-contain border-2 border-green-200 rounded-lg shadow cursor-pointer' onClick={() => setPreviewImg(`http://localhost:7700/docImages/${item.drivingLicence}`)} />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-medium text-gray-700">Admin Comment (optional)</label>
              <textarea
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
                placeholder="Add a comment for the user (optional)"
                value={comment[item._id] || ''}
                onChange={e => setComment({ ...comment, [item._id]: e.target.value })}
                rows={2}
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={actionLoading === item._id + 'approve'}
                onClick={() => handleAction(item._id, 'approve')}
              >{actionLoading === item._id + 'approve' ? (<span className="flex items-center gap-2"><span className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></span> Approving...</span>) : (<><FaCheckCircle /> Approve</>)}
              </button>
              <button className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={actionLoading === item._id + 'reject'}
                onClick={() => handleAction(item._id, 'reject')}
              >{actionLoading === item._id + 'reject' ? (<span className="flex items-center gap-2"><span className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></span> Rejecting...</span>) : (<><FaTimesCircle /> Reject</>)}
              </button>
            </div>
            {success && <div className="text-green-600 text-sm mt-2 text-center">{success}</div>}
            {error && <div className="text-red-600 text-sm mt-2 text-center">{error}</div>}
          </div>
        ))
      )}
      {/* Image Preview Modal */}
      {previewImg && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setPreviewImg(null)}>
          <img src={previewImg} alt="Preview" className="max-w-3xl max-h-[80vh] rounded-2xl shadow-2xl border-4 border-white" />
        </div>
      )}
    </div>
  );
};

const AcceptedRequestsSection = () => {
  const [accepted, setAccepted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchAccepted = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:7700/detail/detail');
        setAccepted(res.data.detail.filter(d => d.verificationStatus === 'approved'));
      } catch {/* ignore error */}
      setLoading(false);
    };
    fetchAccepted();
  }, []);

  const handleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleRemoveSelected = async () => {
    if (selected.length === 0) return;
    setActionLoading(true);
    try {
      await Promise.all(selected.map(id => axios.delete(`http://localhost:7700/detail/${id}`)));
      setAccepted(accepted.filter(doc => !selected.includes(doc._id)));
      setSelected([]);
    } catch {/* ignore error */}
    setActionLoading(false);
  };

  const handleRemoveAll = async () => {
    if (accepted.length === 0) return;
    setActionLoading(true);
    try {
      await Promise.all(accepted.map(doc => axios.delete(`http://localhost:7700/detail/${doc._id}`)));
      setAccepted([]);
      setSelected([]);
    } catch {/* ignore error */}
    setActionLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex gap-4 mb-4">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
          onClick={handleRemoveSelected}
          disabled={actionLoading || selected.length === 0}
        >
          Remove Selected
        </button>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition disabled:opacity-50"
          onClick={handleRemoveAll}
          disabled={actionLoading || accepted.length === 0}
        >
          Remove All
        </button>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {loading ? (
          <div className="col-span-2 text-center text-blue-600 font-semibold">Loading accepted requests...</div>
        ) : accepted.length === 0 ? (
          <div className="col-span-2 text-center text-gray-600">No accepted requests found.</div>
        ) : (
          accepted.map((doc) => (
            <div key={doc._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition group flex flex-col gap-3 relative">
              <input
                type="checkbox"
                className="absolute top-4 right-4 w-5 h-5"
                checked={selected.includes(doc._id)}
                onChange={() => handleSelect(doc._id)}
              />
              <h3 className="text-xl font-bold text-green-700 mb-2">{doc.firstName} {doc.lastName}</h3>
              <p className="text-gray-700">Email: {doc.email}</p>
              <p className="text-gray-500">Phone: {doc.phNumber}</p>
              <div className="flex gap-4 mt-2">
                <div>
                  <span className="font-medium">Aadhar:</span><br/>
                  <img src={`http://localhost:7700/docImages/${doc.adharCard}`} alt='Aadhar' className='w-32 h-20 object-contain border rounded'/>
            </div>
            <div>
                  <span className="font-medium">License:</span><br/>
                  <img src={`http://localhost:7700/docImages/${doc.drivingLicence}`} alt='License' className='w-32 h-20 object-contain border rounded'/>
                </div>
              </div>
              <div className="mt-2 text-green-700 font-semibold">Accepted</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const RejectedRequestsSection = () => {
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchRejected = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:7700/detail/detail');
        setRejected(res.data.detail.filter(d => d.verificationStatus === 'rejected'));
      } catch {/* ignore error */}
      setLoading(false);
    };
    fetchRejected();
  }, []);

  const handleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleRemoveSelected = async () => {
    if (selected.length === 0) return;
    setActionLoading(true);
    try {
      await Promise.all(selected.map(id => axios.delete(`http://localhost:7700/detail/${id}`)));
      setRejected(rejected.filter(doc => !selected.includes(doc._id)));
      setSelected([]);
    } catch {/* ignore error */}
    setActionLoading(false);
  };

  const handleRemoveAll = async () => {
    if (rejected.length === 0) return;
    setActionLoading(true);
    try {
      await Promise.all(rejected.map(doc => axios.delete(`http://localhost:7700/detail/${doc._id}`)));
      setRejected([]);
      setSelected([]);
    } catch {/* ignore error */}
    setActionLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex gap-4 mb-4">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
          onClick={handleRemoveSelected}
          disabled={actionLoading || selected.length === 0}
        >
          Remove Selected
        </button>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition disabled:opacity-50"
          onClick={handleRemoveAll}
          disabled={actionLoading || rejected.length === 0}
        >
          Remove All
        </button>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {loading ? (
          <div className="col-span-2 text-center text-blue-600 font-semibold">Loading rejected requests...</div>
        ) : rejected.length === 0 ? (
          <div className="col-span-2 text-center text-gray-600">No rejected requests found.</div>
        ) : (
          rejected.map((doc) => (
            <div key={doc._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition group flex flex-col gap-3 relative">
              <input
                type="checkbox"
                className="absolute top-4 right-4 w-5 h-5"
                checked={selected.includes(doc._id)}
                onChange={() => handleSelect(doc._id)}
              />
              <h3 className="text-xl font-bold text-red-700 mb-2">{doc.firstName} {doc.lastName}</h3>
              <p className="text-gray-700">Email: {doc.email}</p>
              <p className="text-gray-500">Phone: {doc.phNumber}</p>
              <div className="flex gap-4 mt-2">
                <div>
                  <span className="font-medium">Aadhar:</span><br/>
                  <img src={`http://localhost:7700/docImages/${doc.adharCard}`} alt='Aadhar' className='w-32 h-20 object-contain border rounded'/>
            </div>
            <div>
                  <span className="font-medium">License:</span><br/>
                  <img src={`http://localhost:7700/docImages/${doc.drivingLicence}`} alt='License' className='w-32 h-20 object-contain border rounded'/>
                </div>
              </div>
              <div className="mt-2 text-red-700 font-semibold">Rejected</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const UserDocsSection = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:7700/detail/detail');
        setDocs(res.data.detail);
      } catch {/* ignore error */}
      setLoading(false);
    };
    fetchDocs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2">
      {loading ? (
        <div className="col-span-2 text-center text-blue-600 font-semibold">Loading user documents...</div>
      ) : docs.length === 0 ? (
        <div className="col-span-2 text-center text-gray-600">No user documents found.</div>
      ) : (
        docs.map((doc) => (
          <div key={doc._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition group flex flex-col gap-3">
            <h3 className="text-xl font-bold text-blue-800 mb-2">{doc.firstName} {doc.lastName}</h3>
            <p className="text-gray-700">Email: {doc.email}</p>
            <p className="text-gray-500">Phone: {doc.phNumber}</p>
            <div className="flex gap-4 mt-2">
              <div>
                <span className="font-medium">Aadhar:</span><br/>
                <img src={`http://localhost:7700/docImages/${doc.adharCard}`} alt='Aadhar' className='w-32 h-20 object-contain border rounded'/>
            </div>
            <div>
                <span className="font-medium">License:</span><br/>
                <img src={`http://localhost:7700/docImages/${doc.drivingLicence}`} alt='License' className='w-32 h-20 object-contain border rounded'/>
              </div>
            </div>
        </div>
        ))
      )}
    </div>
  );
};

const DashboardContent = ({ activeSection }) => {
  if (activeSection === 'dashboard') {
    return <DashboardHome />;
  }
  if (activeSection === 'addcar') {
    return <AddCar />;
  }
  if (activeSection === 'requests') {
    return <RequestsSection />;
  }
  if (activeSection === 'accepted') {
    return <AcceptedRequestsSection />;
  }
  if (activeSection === 'rejected') {
    return <RejectedRequestsSection />;
  }
  if (activeSection === 'userdocs') {
    return <UserDocsSection />;
  }
  if (activeSection === 'occupied') {
    return <OccupiedCars />;
  }
  return null;
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
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
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <TopBar user={user} sidebarOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={handleLogout} />
        <main className="p-8 animate-fade-in">
          <DashboardContent activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;