import { alert } from '../styles'

// Small banner for success or error text after you submit a form.
// We reuse this so every page looks the same.
export default function Message({ text, type = 'success' }) {
  if (!text) {
    return null
  }

  return <div style={alert(type)}>{text}</div>
}
