import { useState } from 'react';

function SettingsPage() {
  const [toggles, setToggles] = useState({
    autoRenewal: true,
    normalizeVolume: true,
    privateSession: false,
    showActivity: true
  });

  const toggleSetting = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="page settings-page">
      <section className="settings-header">
        <h2>Settings</h2>
        <p>Manage your account and tailor your listening experience.</p>
      </section>

      <section className="settings-bento">
        <div className="settings-card profile-card">
          <div className="profile-info-settings">
            <div className="avatar-edit">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBluVY6iyuu5J9Swk3sBeh99q6_jjedU_ze9JG73EuA_JCvJP1stel-acdljHcuopwnk8d21jlruU5PhpF0CwkDBtBYCh4IBROMew9OFEA9kjIEwuQdYQ2IrpnqokDmp8Jnq8thUo7M2PWM4NpyT4QiSa5at-6T7TFDBe8iqECefgSzzseAq0uWPO1DYs8vvw7qmY04KnLnOeNHWjut8RWs-xh9knrRawgVwnkxv_7kR3i3ZsMcdLB0WoiKsvbLyeeSm19YhzmaKrJz"
                alt="Alex Rivera"
              />
              <button className="edit-avatar">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
            <div className="profile-details">
              <h4>Alex Rivera</h4>
              <p>alex.rivera@monolith.fm</p>
              <span className="premium-badge">Premium Member</span>
            </div>
          </div>
          <button className="btn-edit-profile">Edit Profile</button>
        </div>

        <div className="settings-card storage-card">
          <div className="storage-info">
            <span className="storage-label">STORAGE</span>
            <h4>4.2 GB</h4>
            <p>Used for downloads</p>
          </div>
          <div className="storage-bar">
            <div className="storage-fill" style={{ width: '42%' }}></div>
          </div>
          <button className="clear-cache">Clear Cache</button>
        </div>
      </section>

      <section className="settings-section">
        <h5 className="settings-section-title">
          <span className="section-accent"></span>
          Subscription
        </h5>
        <div className="settings-card subscription-card">
          <div className="subscription-header">
            <div>
              <h4>Sonic Monolith Pro</h4>
              <p>Next billing date: October 24, 2024</p>
            </div>
            <button className="btn btn-primary btn-manage">Manage Plan</button>
          </div>
          <div className="subscription-options">
            <div className="option-row">
              <div>
                <h4>Automatic Renewal</h4>
                <p>Stay subscribed without interruption</p>
              </div>
              <div
                className={`toggle ${toggles.autoRenewal ? 'active' : ''}`}
                onClick={() => toggleSetting('autoRenewal')}
              ></div>
            </div>
            <div className="option-row">
              <div>
                <h4>Payment Method</h4>
                <p>Visa ending in •••• 4492</p>
              </div>
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h5 className="settings-section-title">
          <span className="section-accent"></span>
          Audio Quality
        </h5>
        <div className="settings-card quality-card">
          <div className="option-row">
            <div>
              <h4>Streaming Quality</h4>
              <p>Set your preferred quality while streaming</p>
            </div>
            <select className="quality-select" defaultValue="Very High (320kbps)">
              <option>Automatic (Default)</option>
              <option>Standard (96kbps)</option>
              <option>High (160kbps)</option>
              <option>Very High (320kbps)</option>
              <option>Lossless (FLAC)</option>
            </select>
          </div>
          <div className="option-row">
            <div>
              <h4>Download Quality</h4>
              <p>Higher quality uses more storage space</p>
            </div>
            <select className="quality-select" defaultValue="Lossless">
              <option>Standard</option>
              <option>High</option>
              <option>Lossless</option>
            </select>
          </div>
          <div className="option-row">
            <div>
              <h4>Normalize Volume</h4>
              <p>Keep a consistent volume level across all tracks</p>
            </div>
            <div
              className={`toggle ${toggles.normalizeVolume ? 'active' : ''}`}
              onClick={() => toggleSetting('normalizeVolume')}
            ></div>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h5 className="settings-section-title">
          <span className="section-accent"></span>
          Social & Privacy
        </h5>
        <div className="settings-grid-2">
          <div className="settings-card small">
            <div className="option-row">
              <div>
                <h4>Private Session</h4>
                <p>Hide your current activity</p>
              </div>
              <div
                className={`toggle ${toggles.privateSession ? 'active' : ''}`}
                onClick={() => toggleSetting('privateSession')}
              ></div>
            </div>
          </div>
          <div className="settings-card small">
            <div className="option-row">
              <div>
                <h4>Show Listening Activity</h4>
                <p>Let followers see what you play</p>
              </div>
              <div
                className={`toggle ${toggles.showActivity ? 'active' : ''}`}
                onClick={() => toggleSetting('showActivity')}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section className="danger-zone">
        <button className="logout-btn">
          <span className="material-symbols-outlined">logout</span>
          Log Out of Sonic Monolith
        </button>
        <button className="deactivate-btn">Deactivate Account</button>
      </section>
    </div>
  );
}

export default SettingsPage;
