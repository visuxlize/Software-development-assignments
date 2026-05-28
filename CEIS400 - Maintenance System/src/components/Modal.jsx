import { modalOverlay, modalBox, modalCloseBtn } from '../styles'

// Popup window for adding employees or equipment on the supervisor page.
// onClose runs when you click the X — parent turns off showForm state.
export default function Modal({ title, onClose, children }) {
  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <strong>{title}</strong>
          <button type="button" onClick={onClose} style={modalCloseBtn}>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
