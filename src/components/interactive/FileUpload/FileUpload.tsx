// FileUpload.tsx
import React, { forwardRef, useState, useCallback, useRef, useId, useMemo } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './FileUpload.css';

export type FileUploadVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type FileUploadSize = 'sm' | 'md' | 'lg';

export interface UploadedFile {
  /** Unique id (generated). */
  id: string;
  /** The File object from the input/drop. */
  file: File;
  /** Upload status. */
  status: 'pending' | 'uploading' | 'success' | 'error';
  /** Error message (when status is 'error'). */
  error?: string;
  /** Upload progress (0–100, when status is 'uploading'). */
  progress?: number;
}

export interface FileUploadProps {
  /** Controlled file list. */
  files?: UploadedFile[];
  /** Uncontrolled initial files. */
  defaultFiles?: UploadedFile[];
  onFilesChange?: (files: UploadedFile[]) => void;
  /** Allow multiple files. Default: true. */
  multiple?: boolean;
  /** Accepted file types (e.g. "image/*", ".pdf", "image/png,image/jpeg"). */
  accept?: string;
  /** Maximum file size in bytes. Files exceeding this are rejected. */
  maxSize?: number;
  /** Maximum number of files (when multiple). */
  maxFiles?: number;
  /** Disabled state. */
  disabled?: boolean;
  /** Drop zone label text. */
  label?: string;
  /** Drop zone hint text (e.g. "PNG, JPG up to 5MB"). */
  hint?: string;
  /** Show the file list below the drop zone. Default: true. */
  showFileList?: boolean;
  /** Variant. */
  variant?: FileUploadVariant;
  /** Size. */
  size?: FileUploadSize;
  /** Theme override for the accent (drag-over highlight + buttons). */
  color?: string;
  /** Text color override. */
  textColor?: string;
  /** Border color override. */
  borderColor?: string;
  /** Border radius override. */
  borderRadius?: string | number;
  /** Shadow level. */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  id?: string;
}

/* ---------- helpers ---------- */

let fileCounter = 0;
const generateFileId = () => `file-${Date.now()}-${++fileCounter}`;

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

/** Validate a file against accept + maxSize. Returns an error message or null. */
const validateFile = (file: File, accept?: string, maxSize?: number): string | null => {
  if (maxSize && file.size > maxSize) {
    return `File exceeds max size (${formatFileSize(maxSize)})`;
  }
  if (accept) {
    const patterns = accept.split(',').map((p) => p.trim());
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();
    const matches = patterns.some((pattern) => {
      if (pattern.startsWith('.')) {
        return fileName.endsWith(pattern);
      }
      if (pattern.endsWith('/*')) {
        const prefix = pattern.slice(0, -1);
        return fileType.startsWith(prefix);
      }
      return fileType === pattern;
    });
    if (!matches) {
      return `File type not accepted (${accept})`;
    }
  }
  return null;
};

/* ---------- component ---------- */

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      files: controlledFiles,
      defaultFiles = [],
      onFilesChange,
      multiple = true,
      accept,
      maxSize,
      maxFiles,
      disabled = false,
      label = 'Drop files here or click to browse',
      hint,
      showFileList = true,
      variant = 'primary',
      size = 'md',
      color,
      textColor,
      borderColor,
      borderRadius,
      shadow,
      className = '',
      style,
      ariaLabel = 'File upload',
      id,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = `${generatedId}-input`;

    const isControlled = controlledFiles !== undefined;
    const [internalFiles, setInternalFiles] = useState<UploadedFile[]>(defaultFiles);
    const files = isControlled ? controlledFiles : internalFiles;
    const [isDragging, setIsDragging] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const updateFiles = useCallback(
      (newFiles: UploadedFile[]) => {
        if (!isControlled) {
          setInternalFiles(newFiles);
        }
        onFilesChange?.(newFiles);
      },
      [isControlled, onFilesChange],
    );

    const addFiles = useCallback(
      (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0 || disabled) return;
        const incoming = Array.from(fileList);
        const newEntries: UploadedFile[] = [];
        for (const file of incoming) {
          const error = validateFile(file, accept, maxSize);
          newEntries.push({
            id: generateFileId(),
            file,
            status: error ? 'error' : 'pending',
            error: error ?? undefined,
          });
        }
        let updated: UploadedFile[];
        if (multiple) {
          updated = [...files, ...newEntries];
          if (maxFiles && updated.length > maxFiles) {
            updated = updated.slice(0, maxFiles);
          }
        } else {
          updated = newEntries.slice(0, 1);
        }
        updateFiles(updated);
      },
      [files, multiple, maxFiles, accept, maxSize, disabled, updateFiles],
    );

    const removeFile = useCallback(
      (fileId: string) => {
        updateFiles(files.filter((f) => f.id !== fileId));
      },
      [files, updateFiles],
    );

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        setDragCounter(0);
        if (disabled) return;
        addFiles(e.dataTransfer.files);
      },
      [addFiles, disabled],
    );

    const handleDragEnter = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;
        setDragCounter((c) => c + 1);
        setIsDragging(true);
      },
      [disabled],
    );

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter((c) => {
        const next = c - 1;
        if (next <= 0) setIsDragging(false);
        return next;
      });
    }, []);

    // Theme resolution
    const resolvedColor = resolveThemeValue(color);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);
    const resolvedShadow = shadow !== undefined ? resolveThemeValue(`shadow-${shadow}`) : undefined;

    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedColor && { '--fileupload-custom-accent': resolvedColor }),
      ...(resolvedTextColor && {
        '--fileupload-custom-text-color': resolvedTextColor,
      }),
      ...(resolvedBorderColor && {
        '--fileupload-custom-border': resolvedBorderColor,
      }),
      ...(borderRadius !== undefined && {
        '--fileupload-custom-border-radius':
          typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }),
      ...(resolvedShadow && { '--fileupload-custom-shadow': resolvedShadow }),
    };

    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;
    const ariaProps = getAriaProps({ label: ariaLabel });

    const classes = [
      'fileupload-component',
      `fileupload-component--${variant}`,
      `fileupload-component--${size}`,
      isDragging && 'fileupload-component--dragging',
      disabled && 'fileupload-component--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        id={id || generatedId}
        className={classes}
        style={mergedStyle}
        {...ariaProps}
        {...rest}
      >
        <div
          className="fileupload-component__dropzone"
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && inputRef.current?.click()}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          aria-label={label}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          <div className="fileupload-component__dropzone-icon">📎</div>
          <div className="fileupload-component__dropzone-text">
            <span className="fileupload-component__dropzone-label">{label}</span>
            {hint && <span className="fileupload-component__dropzone-hint">{hint}</span>}
          </div>
        </div>

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="fileupload-component__input"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = ''; // allow re-selecting the same file
          }}
          aria-hidden="true"
          tabIndex={-1}
        />

        {showFileList && files.length > 0 && (
          <ul className="fileupload-component__file-list" role="list">
            {files.map((item) => (
              <li
                key={item.id}
                className={`fileupload-component__file-item fileupload-component__file-item--${item.status}`}
              >
                <div className="fileupload-component__file-info">
                  <span className="fileupload-component__file-name" title={item.file.name}>
                    {item.file.name}
                  </span>
                  <span className="fileupload-component__file-size">
                    {formatFileSize(item.file.size)}
                  </span>
                  {item.error && (
                    <span className="fileupload-component__file-error">{item.error}</span>
                  )}
                </div>
                <button
                  type="button"
                  className="fileupload-component__file-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(item.id);
                  }}
                  aria-label={`Remove ${item.file.name}`}
                  tabIndex={0}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

FileUpload.displayName = 'FileUpload';

export { formatFileSize };
