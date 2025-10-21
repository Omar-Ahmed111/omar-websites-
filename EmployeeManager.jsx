import { useState } from 'react';
import './EmployeeManager.css';
import EmployeeForm from './EmployeeForm';

function EmployeeManager({
  departments,
  employees,
  selectedDepartment,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee
}) {
  const [filterDept, setFilterDept] = useState(selectedDepartment?.id || 'all');

  const filteredEmployees = filterDept === 'all'
    ? employees
    : employees.filter(e => e.departmentId === parseInt(filterDept));

  const getDepartmentName = (deptId) => {
    const dept = departments.find(d => d.id === deptId);
    return dept ? dept.name : 'غير محدد';
  };

  return (
    <div className="employee-manager">
      <div className="manager-header">
        <h2>👥 إدارة الموظفين</h2>
        <div className="filter-section">
          <label htmlFor="dept-filter">تصفية حسب القسم:</label>
          <select
            id="dept-filter"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="all">جميع الأقسام</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <EmployeeForm
        departmentId={selectedDepartment?.id || departments[0]?.id}
        onAddEmployee={onAddEmployee}
      />

      <div className="employees-container">
        {filteredEmployees.length === 0 ? (
          <div className="empty-state">
            <p>لا يوجد موظفون حالياً</p>
          </div>
        ) : (
          <div className="employees-grid">
            {filteredEmployees.map(emp => (
              <div key={emp.id} className="employee-card">
                <div className="card-header">
                  <h3>{emp.name}</h3>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (confirm('هل تريد حذف هذا الموظف؟')) {
                        onDeleteEmployee(emp.id);
                      }
                    }}
                  >
                    🗑️
                  </button>
                </div>

                <div className="card-content">
                  <div className="info-row">
                    <span className="label">القسم:</span>
                    <span className="value">{getDepartmentName(emp.departmentId)}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">الوظيفة:</span>
                    <span className="value">{emp.position}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">الدرجة:</span>
                    <span className="value">{emp.grade}</span>
                  </div>
                  {emp.notes && (
                    <div className="info-row">
                      <span className="label">ملاحظات:</span>
                      <span className="value">{emp.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeManager;

