import { useState } from 'react';
import './LicenseVerification.css';

function LicenseVerification({ onVerified }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // محاكاة التحقق من الكود
    // في التطبيق الفعلي، سيتم إرسال الطلب إلى خادم التحقق
    setTimeout(() => {
      if (code.length === 9 && /^\d+$/.test(code)) {
        const mockLicense = {
          code: code,
          isActive: true,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          verifiedAt: new Date().toISOString()
        };
        onVerified(mockLicense);
      } else {
        setError('الكود غير صحيح! يجب أن يكون 9 أرقام.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="license-verification">
      <div className="verification-card">
        <div className="verification-icon">🔐</div>
        <h1>تحقق من الترخيص</h1>
        <p>أدخل كود الترخيص الخاص بك للوصول إلى النظام</p>

        <form onSubmit={handleSubmit} className="verification-form">
          <div className="form-group">
            <label htmlFor="code">كود الترخيص (9 أرقام)</label>
            <input
              id="code"
              type="text"
              inputMode="numeric"
              placeholder="مثال: 123456789"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.replace(/\D/g, '').slice(0, 9));
                setError('');
              }}
              maxLength="9"
              disabled={loading}
              className={error ? 'error' : ''}
            />
            {code.length > 0 && (
              <span className="char-count">{code.length}/9</span>
            )}
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading || code.length !== 9} className="submit-btn">
            {loading ? '⏳ جاري التحقق...' : '✅ التحقق'}
          </button>
        </form>

        <div className="info-box">
          <h3>💡 معلومات مهمة</h3>
          <ul>
            <li>الكود يتكون من 9 أرقام فقط</li>
            <li>كل كود صالح لمدة محددة من الوقت</li>
            <li>الكود الواحد لا يمكن استخدامه على أكثر من جهاز واحد</li>
            <li>تأكد من صحة الكود قبل الإدخال</li>
          </ul>
        </div>
      </div>

      <div className="background-animation">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
}

export default LicenseVerification;

