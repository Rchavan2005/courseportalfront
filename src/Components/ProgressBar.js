import "./ProgressBar.css";

function ProgressBar({ progress = 0, showLabel = true }) {
  const safeProgress = Math.min(100, Math.max(0, Number(progress) || 0));

  return (
    <div className="progress-wrapper">
      {showLabel && (
        <div className="progress-label">
          <span>Progress</span>
          <strong>{safeProgress}%</strong>
        </div>
      )}

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${safeProgress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;