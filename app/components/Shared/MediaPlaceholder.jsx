"use client";

export default function MediaPlaceholder({
  label,
  assetType = "media",
  slotId,
  ratio = "16/9",
  status = "planned",
  className = "",
}) {
  return (
    <div
      className={`media-placeholder ${className}`}
      style={{ "--placeholder-ratio": ratio }}
      data-asset-type={assetType}
      data-slot-id={slotId}
      data-status={status}
      aria-label={`${label} placeholder`}
    >
      <div className='media-placeholder-inner'>
        <p className='media-placeholder-label'>{label}</p>
        <p className='media-placeholder-meta'>
          {assetType} | {slotId} | {status}
        </p>
      </div>
    </div>
  );
}
