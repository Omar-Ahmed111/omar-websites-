import { useState } from 'react';
import './EmployeeForm.css';

function EmployeeForm({ departmentId, onAddEmployee }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    position: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.grade && formData.position) {
      onAddEmployee({
        ...formData,
        departmentId
      });
      setFormData({
        name: '',
        grade: '',
        position: '',
        notes: ''
      });
      setShowForm(false);
    }
  };

  return (
    <div className="employee-form-container">
      <button
        className="toggle-form-btn"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? '✕ إغلاق' : '➕ إضافة موظف'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label htmlFor="emp-name">اسم الموظف</label>
            <input
              id="emp-name"
              type="text"
              placeholder="أدخل اسم الموظف"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="emp-grade">الدرجة</label>
              <input
                id="emp-grade"
                type="text"
                placeholder="مثال: أول، ثاني"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emp-position">الوظيفة</label>
              <input
                id="emp-position"
                type="text"
                placeholder="مثال: مفتش، موظف"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="emp-notes">ملاحظات (اختياري)</label>
            <textarea
              id="emp-notes"
              placeholder="أضف ملاحظات إضافية..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="2"
            />
          </div>

          <button type="submit" className="submit-btn">💾 حفظ الموظف</button>
        </form>
      )}
    </div>
  );
}

export default EmployeeForm;

