import { useState, useEffect } from 'react';
import './App.css';
import LicenseVerification from './components/LicenseVerification';
import DepartmentManager from './components/DepartmentManager';
import EmployeeManager from './components/EmployeeManager';
import Dashboard from './components/Dashboard';

function App() {
  const [isLicenseVerified, setIsLicenseVerified] = useState(false);
  const [currentLicense, setCurrentLicense] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // تحميل البيانات من localStorage
  useEffect(() => {
    const savedLicense = localStorage.getItem('currentLicense');
    const savedDepartments = localStorage.getItem('departments');
    const savedEmployees = localStorage.getItem('employees');

    if (savedLicense) {
      setCurrentLicense(JSON.parse(savedLicense));
      setIsLicenseVerified(true);
    }
    if (savedDepartments) {
      setDepartments(JSON.parse(savedDepartments));
    }
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  // حفظ البيانات في localStorage
  useEffect(() => {
    if (isLicenseVerified && currentLicense) {
      localStorage.setItem('currentLicense', JSON.stringify(currentLicense));
    }
  }, [isLicenseVerified, currentLicense]);

  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleLicenseVerified = (license) => {
    setCurrentLicense(license);
    setIsLicenseVerified(true);
  };

  const handleLogout = () => {
    setIsLicenseVerified(false);
    setCurrentLicense(null);
    setActiveTab('dashboard');
    setSelectedDepartment(null);
    localStorage.removeItem('currentLicense');
  };

  const addDepartment = (department) => {
    const newDept = {
      ...department,
      id: Date.now()
    };
    setDepartments([...departments, newDept]);
  };

  const updateDepartment = (id, updatedDept) => {
    setDepartments(departments.map(d => d.id === id ? { ...d, ...updatedDept } : d));
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter(d => d.id !== id));
    setEmployees(employees.filter(e => e.departmentId !== id));
    if (selectedDepartment?.id === id) {
      setSelectedDepartment(null);
    }
  };

  const addEmployee = (employee) => {
    const newEmp = {
      ...employee,
      id: Date.now()
    };
    setEmployees([...employees, newEmp]);
  };

  const updateEmployee = (id, updatedEmp) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, ...updatedEmp } : e));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  if (!isLicenseVerified) {
    return <LicenseVerification onVerified={handleLicenseVerified} />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>🏢 منطقة التأمين الاجتماعي بالفيوم</h1>
          <p>نظام إدارة الموظفين المتقدم</p>
        </div>
        <div className="header-info">
          <span className="license-info">🔐 الكود: {currentLicense?.code}</span>
          <button className="logout-btn" onClick={handleLogout}>🚪 تسجيل الخروج</button>
        </div>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 لوحة التحكم
        </button>
        <button
          className={`nav-btn ${activeTab === 'departments' ? 'active' : ''}`}
          onClick={() => setActiveTab('departments')}
        >
          🏛️ الأقسام
        </button>
        <button
          className={`nav-btn ${activeTab === 'employees' ? 'active' : ''}`}
          onClick={() => setActiveTab('employees')}
        >
          👥 الموظفون
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'dashboard' && (
          <Dashboard
            departments={departments}
            employees={employees}
            onSelectDepartment={(dept) => {
              setSelectedDepartment(dept);
              setActiveTab('employees');
            }}
          />
        )}
        {activeTab === 'departments' && (
          <DepartmentManager
            departments={departments}
            onAddDepartment={addDepartment}
            onUpdateDepartment={updateDepartment}
            onDeleteDepartment={deleteDepartment}
            onSelectDepartment={setSelectedDepartment}
            selectedDepartment={selectedDepartment}
            employees={employees}
            onAddEmployee={addEmployee}
            onUpdateEmployee={updateEmployee}
            onDeleteEmployee={deleteEmployee}
          />
        )}
        {activeTab === 'employees' && (
          <EmployeeManager
            departments={departments}
            employees={employees}
            selectedDepartment={selectedDepartment}
            onAddEmployee={addEmployee}
            onUpdateEmployee={updateEmployee}
            onDeleteEmployee={deleteEmployee}
          />
        )}
      </main>
    </div>
  );
}

export default App;

