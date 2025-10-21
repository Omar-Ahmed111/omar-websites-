import './Dashboard.css';

function Dashboard({ departments, employees, onSelectDepartment }) {
  const totalDepartments = departments.length;
  const totalEmployees = employees.length;
  const avgEmployeesPerDept = totalDepartments > 0 ? (totalEmployees / totalDepartments).toFixed(1) : 0;

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card stat-departments">
          <div className="stat-icon">🏛️</div>
          <div className="stat-content">
            <div className="stat-number">{totalDepartments}</div>
            <div className="stat-label">إجمالي الأقسام</div>
          </div>
        </div>

        <div className="stat-card stat-employees">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{totalEmployees}</div>
            <div className="stat-label">إجمالي الموظفين</div>
          </div>
        </div>

        <div className="stat-card stat-average">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{avgEmployeesPerDept}</div>
            <div className="stat-label">متوسط الموظفين</div>
          </div>
        </div>

        <div className="stat-card stat-reports">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-number">{departments.length > 0 ? '✅' : '❌'}</div>
            <div className="stat-label">التقارير</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="departments-section">
          <h2>📋 الأقسام</h2>
          {departments.length === 0 ? (
            <div className="empty-message">
              <p>لا توجد أقسام حالياً. ابدأ بإنشاء قسم جديد!</p>
            </div>
          ) : (
            <div className="departments-list">
              {departments.map(dept => {
                const deptEmployees = employees.filter(e => e.departmentId === dept.id);
                return (
                  <div
                    key={dept.id}
                    className="department-item"
                    onClick={() => onSelectDepartment(dept)}
                  >
                    <div className="dept-header">
                      <h3>{dept.name}</h3>
                      <span className="emp-count">{deptEmployees.length} موظف</span>
                    </div>
                    <p className="dept-location">📍 {dept.location}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="quick-actions">
          <h2>⚡ إجراءات سريعة</h2>
          <div className="actions-grid">
            <div className="action-card">
              <div className="action-icon">➕</div>
              <h3>إضافة قسم</h3>
              <p>أنشئ قسم جديد في المنطقة</p>
            </div>
            <div className="action-card">
              <div className="action-icon">👤</div>
              <h3>إضافة موظف</h3>
              <p>أضف موظف جديد للنظام</p>
            </div>
            <div className="action-card">
              <div className="action-icon">📊</div>
              <h3>عرض التقارير</h3>
              <p>اعرض تقارير شاملة</p>
            </div>
            <div className="action-card">
              <div className="action-icon">⚙️</div>
              <h3>الإعدادات</h3>
              <p>قم بتخصيص الإعدادات</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

