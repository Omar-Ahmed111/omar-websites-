import { useState } from 'react';
import './DepartmentManager.css';
import EmployeeForm from './EmployeeForm';

function DepartmentManager({
  departments,
  onAddDepartment,
  onUpdateDepartment,
  onDeleteDepartment,
  onSelectDepartment,
  selectedDepartment,
  employees,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee
}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.location) {
      onAddDepartment(formData);
      setFormData({ name: '', location: '' });
      setShowForm(false);
    }
  };

  const deptEmployees = selectedDepartment
    ? employees.filter(e => e.departmentId === selectedDepartment.id)
    : [];

  return (
    <div className="department-manager">
      <div className="departments-panel">
        <div className="panel-header">
          <h2>🏛️ إدارة الأقسام</h2>
          <button
            className="add-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ إغلاق' : '➕ إضافة قسم'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="department-form">
            <div className="form-group">
              <label htmlFor="dept-name">اسم القسم</label>
              <input
                id="dept-name"
                type="text"
                placeholder="أدخل اسم القسم"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dept-location">الموقع</label>
              <input
                id="dept-location"
                type="text"
                placeholder="أدخل موقع القسم"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <button type="submit" className="submit-btn">💾 حفظ القسم</button>
          </form>
        )}

        <div className="departments-list">
          {departments.length === 0 ? (
            <div className="empty-state">
              <p>لا توجد أقسام. ابدأ بإضافة قسم جديد!</p>
            </div>
          ) : (
            departments.map(dept => (
              <div
                key={dept.id}
                className={`department-item ${selectedDepartment?.id === dept.id ? 'selected' : ''}`}
                onClick={() => onSelectDepartment(dept)}
              >
                <div className="dept-info">
                  <h3>{dept.name}</h3>
                  <p>📍 {dept.location}</p>
                </div>
                <div className="dept-actions">
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('هل تريد حذف هذا القسم؟')) {
                        onDeleteDepartment(dept.id);
                      }
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedDepartment && (
        <div className="employees-panel">
          <div className="panel-header">
            <h2>👥 موظفو القسم: {selectedDepartment.name}</h2>
            <span className="emp-count">{deptEmployees.length} موظف</span>
          </div>

          <EmployeeForm
            departmentId={selectedDepartment.id}
            onAddEmployee={onAddEmployee}
          />

          <div className="employees-list">
            {deptEmployees.length === 0 ? (
              <div className="empty-state">
                <p>لا يوجد موظفون في هذا القسم</p>
              </div>
            ) : (
              deptEmployees.map(emp => (
                <div key={emp.id} className="employee-item">
                  <div className="emp-info">
                    <h4>{emp.name}</h4>
                    <p>الوظيفة: {emp.position}</p>
                    <p>الدرجة: {emp.grade}</p>
                    {emp.notes && <p>ملاحظات: {emp.notes}</p>}
                  </div>
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
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentManager;

