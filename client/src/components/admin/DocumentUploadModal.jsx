import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';

export function DocumentUploadModal({ isOpen, onClose, onDocumentUploaded }) {
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const sampleImage = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800';

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file) => {
    if (file.size > 20 * 1024 * 1024) {
      setErrorMsg('File is too large. Please select a file under 20MB.');
      return;
    }

    setErrorMsg(null);
    setFileName(file.name);
    if (!title) {
      // Clean up file extension for suggested title
      const suggestedTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(suggestedTitle);
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFileUrl(reader.result);
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read file from disk.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a document title.');
      return;
    }
    if (!issuer.trim()) {
      setErrorMsg('Please enter the issuing hospital, doctor, or lab name.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const selectedImage = fileUrl || sampleImage;
      const isFilePdf = fileUrl?.startsWith('data:application/pdf') || fileName.toLowerCase().endsWith('.pdf');

      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          type: isFilePdf ? 'PDF Document' : 'Medical Document',
          issuer: issuer.trim(),
          date,
          description: description.trim(),
          fileUrl: selectedImage,
          previewImage: selectedImage
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload document');
      }

      if (onDocumentUploaded) {
        onDocumentUploaded(data.document);
      }

      // Reset Form State
      setTitle('');
      setIssuer('');
      setDescription('');
      setFileUrl('');
      setFileName('');
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-black p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
              <Upload className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-black">Upload Medical Document</h3>
              <p className="text-xs text-neutral-500">Publish verified clinical records, invoices & reports</p>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-black text-sm">
            <X className="h-4 w-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-neutral-100 border border-black text-black text-xs font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* File Picker / Drop Zone */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-black block">Choose Document File (Image or PDF)</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-5 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all ${
                dragOver
                  ? 'border-black bg-neutral-100 scale-101'
                  : fileUrl
                  ? 'border-black bg-neutral-50'
                  : 'border-neutral-300 hover:border-black bg-neutral-50 hover:bg-neutral-100'
              }`}
            >
              {fileUrl ? (
                <div className="space-y-2">
                  {fileUrl.startsWith('data:application/pdf') || fileName.toLowerCase().endsWith('.pdf') ? (
                    <div className="mx-auto h-24 max-w-[200px] rounded-xl border border-neutral-300 bg-white flex flex-col items-center justify-center p-3 shadow-xs">
                      <div className="h-10 w-10 rounded-lg bg-black text-white flex items-center justify-center mb-1">
                        <FileText className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase bg-neutral-100 px-1.5 py-0.5 rounded text-black border border-neutral-200">
                        PDF Ready
                      </span>
                    </div>
                  ) : (
                    <div className="relative mx-auto h-28 max-w-[200px] rounded-xl overflow-hidden border border-neutral-300 bg-white">
                      <img
                        src={fileUrl}
                        alt="Uploaded preview"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                  <div className="text-xs font-bold text-black flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-black" />
                    <span className="truncate max-w-[250px]">{fileName || 'Document Loaded'}</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 underline">Click to choose another file</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-200 text-black">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-bold text-black">
                    Click to browse or drag & drop document file here
                  </div>
                  <p className="text-[11px] text-neutral-500">Supports PNG, JPG, JPEG, PDF up to 20MB</p>
                </div>
              )}
            </div>
          </div>

          <Input
            label="Document Title *"
            required
            placeholder="e.g. Chemotherapy Inpatient Hospital Bill"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Issuing Hospital / Lab / Vendor *"
              required
              placeholder="e.g. Apollo Hospital / Central Lab"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
            />

            <Input
              label="Date *"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <Textarea
            label="Clinical Description / Notes"
            rows={2}
            placeholder="Describe clinical procedure, pathology findings, or billing items..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={loading} icon={Upload}>
              Publish Document
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
