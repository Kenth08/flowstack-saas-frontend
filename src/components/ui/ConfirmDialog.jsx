import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'
import Button from './Button'

// ---------------------------------------------------------------------------
// ConfirmDialog — a small confirmation modal for destructive/irreversible
// actions (revoke invite, remove member, delete account, ...). Built on <Modal>.
//
//   const [confirm, setConfirm] = useState(null)
//   <ConfirmDialog
//     open={!!confirm}
//     title="Remove member?"
//     description="They'll lose access to this workspace immediately."
//     confirmLabel="Remove"
//     tone="danger"
//     onConfirm={() => { doRemove(confirm); setConfirm(null) }}
//     onClose={() => setConfirm(null)}
//   />
// ---------------------------------------------------------------------------
export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger', // 'danger' | 'primary'
  loading = false,
  onConfirm,
  onClose,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            disabled={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex gap-3">
        {tone === 'danger' && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
            <AlertTriangle className="h-5 w-5" />
          </span>
        )}
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </Modal>
  )
}
