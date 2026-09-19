import React, { useState } from 'react';
import { FileText, ShieldCheck, Eye, Plus, Trash2, X, Download, ExternalLink, ZoomIn, ZoomOut, RotateCcw, FileCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export function DocumentGallery({ documents, onOpenUpload, onDocumentDeleted }) {
  const { isAdmin } = useAuth();
  const [previewDoc, setPreviewDoc] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const docList = documents || [];

  const isPdf = (doc) => {
    if (!doc) return false;
    const url = (doc.fileUrl || doc.previewImage || '').toLowerCase();
    const type = (doc.type || '').toLowerCase();
    const title = (doc.title || '').toLowerCase();
    return url.startsWith('data:application/pdf') ||
           url.endsWith('.pdf') ||
           url.includes('/pdf') ||
           type.includes('pdf') ||
           title.endsWith('.pdf');
  };

  const handleOpenDoc = (doc) => {
    setPreviewDoc(doc);
    setZoomLevel(1);
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this medical document?')) return;
    try {
      const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' });
      if (res.ok && onDocumentDeleted) {
        onDocumentDeleted(id);
      }
    } catch (err) {
      console.error('Failed to delete document:', err);
    }
  };

  const handleDownload = (doc) => {
    if (!doc) return;
    const link = document.createElement('a');
    link.href = doc.fileUrl || doc.previewImage;
    link.download = `${doc.title || 'medical_document'}.${isPdf(doc) ? 'pdf' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = (doc) => {
    if (!doc) return;
    const url = doc.fileUrl || doc.previewImage;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="documents" className="py-12 max-w-7xl mx-auto px-4 sm:px-8 border-t border-neutral-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-black bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-300 font-mono">
            Medical Portfolio & Audit
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black mt-2">
            Verified Medical Documents & Clinical Records
          </h2>
          <p className="text-sm text-neutral-600 mt-1 max-w-xl">
            Public medical records, hospital certifications, pathology scans, and verified audit documentation.
          </p>
        </div>

        {isAdmin && (
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={onOpenUpload}
            className="text-xs font-bold"
          >
            Upload Document
          </Button>
        )}
      </div>

      {/* Documents Grid or Zero State */}
      {docList.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-black">
            <FileText className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-black">No Medical Documents Uploaded Yet</h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            Hospital certifications, pathology scans, and verified records will be published here for public inspection.
          </p>
          {isAdmin && (
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={onOpenUpload}
              className="mt-2 text-xs"
            >
              Upload First Document
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {docList.map((doc) => {
            const isDocPdf = isPdf(doc);
            return (
              <div
                key={doc.id}
                className="group flex flex-col justify-between overflow-hidden bg-white rounded-3xl border border-neutral-300 shadow-xs hover:border-black transition-all duration-150"
              >
                {/* Thumbnail Header */}
                <div
                  className="relative h-48 w-full bg-neutral-100 overflow-hidden cursor-pointer flex items-center justify-center border-b border-neutral-200"
                  onClick={() => handleOpenDoc(doc)}
                >
                  {isDocPdf ? (
                    <div className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                      <div className="h-14 w-14 rounded-2xl bg-black text-white flex items-center justify-center shadow-xs">
                        <FileText className="h-7 w-7" />
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-neutral-200 text-black">
                        PDF Clinical Document
                      </span>
                    </div>
                  ) : (
                    <img
                      src={doc.previewImage || doc.fileUrl}
                      alt={doc.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-xl bg-white text-black text-xs font-bold shadow-md flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5 text-black" />
                      {isDocPdf ? 'View PDF Document' : 'View Clinical Image'}
                    </span>
                  </div>

                  {isAdmin && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(doc.id);
                        }}
                        className="p-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 transition-colors shadow-xs"
                        title="Delete Document"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-black">
                        {isDocPdf ? 'PDF' : 'Image'}
                      </span>
                      <span className="text-[11px] text-neutral-500 truncate">{doc.issuer}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-black line-clamp-2 leading-snug">
                      {doc.title}
                    </h4>
                    {doc.description && (
                      <p className="mt-1.5 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2.5 border-t border-neutral-200 text-xs text-neutral-600 font-mono flex items-center justify-between">
                    <span>{doc.date}</span>
                    <button
                      onClick={() => handleOpenDoc(doc)}
                      className="text-black font-sans font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-black" /> View Audit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Comprehensive PDF & Image Viewer Modal */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl bg-white border border-black shadow-2xl flex flex-col max-h-[94vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Viewer Header */}
            <div className="flex flex-wrap items-center justify-between p-4 sm:p-5 border-b border-neutral-200 bg-white gap-3">
              <div className="space-y-0.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-neutral-100 text-black border border-neutral-300">
                    {isPdf(previewDoc) ? 'PDF Clinical Record' : 'Medical Image / Scan'}
                  </span>
                  <span className="text-xs text-neutral-600 font-mono flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-black" /> Hospital Verified
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-black truncate">{previewDoc.title}</h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {!isPdf(previewDoc) && (
                  <div className="hidden sm:flex items-center gap-1 border border-neutral-300 rounded-xl p-1 bg-neutral-50 mr-2">
                    <button
                      onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.25))}
                      className="p-1 rounded-lg hover:bg-neutral-200 text-black"
                      title="Zoom Out"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-[11px] font-mono px-1 min-w-[40px] text-center font-bold text-black">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.25))}
                      className="p-1 rounded-lg hover:bg-neutral-200 text-black"
                      title="Zoom In"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(1)}
                      className="p-1 rounded-lg hover:bg-neutral-200 text-black"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  icon={ExternalLink}
                  onClick={() => handleOpenNewTab(previewDoc)}
                  className="text-xs"
                >
                  Open in New Tab
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  icon={Download}
                  onClick={() => handleDownload(previewDoc)}
                  className="text-xs"
                >
                  Download
                </Button>

                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-2 rounded-xl text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
                  title="Close Viewer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Viewer Content Area */}
            <div className="flex-1 overflow-auto bg-neutral-100 p-3 sm:p-6 flex items-center justify-center min-h-[360px] max-h-[64vh]">
              {isPdf(previewDoc) ? (
                <div className="w-full h-full min-h-[500px] flex flex-col rounded-2xl overflow-hidden border border-neutral-300 bg-white shadow-inner">
                  <iframe
                    src={previewDoc.fileUrl || previewDoc.previewImage}
                    title={previewDoc.title}
                    className="w-full h-full min-h-[500px] border-0"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center overflow-auto p-2">
                  <img
                    src={previewDoc.fileUrl || previewDoc.previewImage}
                    alt={previewDoc.title}
                    style={{ transform: `scale(${zoomLevel})` }}
                    className="max-h-[58vh] w-auto max-w-full object-contain mx-auto rounded-xl shadow-xs transition-transform duration-150 origin-center"
                  />
                </div>
              )}
            </div>

            {/* Viewer Footer Details */}
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                {previewDoc.description && (
                  <p className="text-neutral-700 font-medium">{previewDoc.description}</p>
                )}
                <div className="flex flex-wrap gap-4 font-mono text-neutral-600">
                  <span>Issuer: <strong className="text-black font-sans">{previewDoc.issuer || 'Hospital / Lab'}</strong></span>
                  <span>Date: <strong className="text-black font-sans">{previewDoc.date || 'N/A'}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setPreviewDoc(null)}
                  className="text-xs"
                >
                  Close Viewer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
