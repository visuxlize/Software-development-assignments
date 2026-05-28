// All our colors live here so the whole app stays dark mode and consistent.
// If something looks off, change it here first instead of in every page file.

export const colors = {
  bg: '#0f1117',           // main page background
  surface: '#181b26',      // cards, inputs, modals
  surfaceRaised: '#1f2433', // slightly lighter boxes (tool cards, chips)
  border: '#2e3548',        // normal borders
  borderBright: '#3d4660',  // borders that need to stand out more
  text: '#e8ecf4',          // main readable text
  textMuted: '#9aa3b5',     // subtitles, labels in tables
  textDim: '#6b7589',       // placeholders, footer text
  accent: '#6b9fff',        // primary buttons, active tab
  accentDark: '#4a7ad4',    // button hover feel (we use as solid bg)
  success: '#4ade80',
  successBg: '#1a3328',
  successBorder: '#2d5c45',
  danger: '#f87171',
  dangerBg: '#3a2228',
  dangerBorder: '#6b3a42',
  warning: '#f5b84a',
  warningBg: '#3a3020',
  warningBorder: '#6b5528',
  navBg: '#12151f',
  overlay: 'rgba(0, 0, 0, 0.65)',
}

// --- layout ---

export const page = {
  maxWidth: '960px',
  margin: '0 auto',
  padding: '1.75rem 1.25rem',
  color: colors.text,
}

export const h1 = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '4px',
  color: colors.text,
}

export const sub = {
  fontSize: '13px',
  color: colors.textMuted,
  marginBottom: '1.5rem',
}

export const mutedText = {
  color: colors.textMuted,
  fontSize: '13px',
}

export const grid2 = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
}

export const grid3 = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '1rem',
  marginBottom: '1rem',
}

export const divider = {
  border: 'none',
  borderTop: `1px solid ${colors.border}`,
  margin: '1rem 0',
}

// --- cards and tables ---

export const card = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  padding: '1.25rem',
  marginBottom: '1rem',
}

export const cardTitle = {
  fontSize: '11px',
  fontWeight: 'bold',
  color: colors.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: '0.75rem',
}

export const statCard = {
  ...card,
  textAlign: 'center',
  margin: 0,
}

export const table = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '13px',
}

export const th = {
  textAlign: 'left',
  padding: '7px 10px',
  fontSize: '11px',
  fontWeight: 'bold',
  color: colors.textMuted,
  textTransform: 'uppercase',
  borderBottom: `2px solid ${colors.borderBright}`,
}

export const td = {
  padding: '9px 10px',
  borderBottom: `1px solid ${colors.border}`,
  verticalAlign: 'middle',
  color: colors.text,
}

export const mono = {
  fontFamily: 'monospace',
  fontSize: '12px',
  color: colors.textMuted,
}

// --- forms ---

export const label = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 'bold',
  marginBottom: '5px',
  color: colors.text,
}

export const input = {
  width: '100%',
  padding: '8px 10px',
  border: `1px solid ${colors.border}`,
  borderRadius: '6px',
  fontSize: '14px',
  marginBottom: '1rem',
  boxSizing: 'border-box',
  background: colors.surfaceRaised,
  color: colors.text,
}

// --- login page (no nav bar on this screen) ---

export const loginPage = {
  minHeight: '100vh',
  background: colors.bg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const loginBox = {
  width: '100%',
  maxWidth: '380px',
  padding: '1rem',
}

export const loginCard = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  padding: '1.5rem',
}

export const loginInput = { ...input, padding: '9px 10px' }

export const loginIdInput = {
  ...loginInput,
  fontSize: '15px',
  fontFamily: 'monospace',
  letterSpacing: '0.08em',
}

// clickable test account chips on login
export const demoChip = {
  fontFamily: 'monospace',
  fontSize: '12px',
  background: colors.surfaceRaised,
  border: `1px solid ${colors.border}`,
  borderRadius: '4px',
  padding: '4px 8px',
  cursor: 'pointer',
  color: colors.text,
}

// tool picker buttons on checkout page
export const toolCard = {
  border: `1px solid ${colors.border}`,
  borderRadius: '6px',
  padding: '10px 12px',
  background: colors.surfaceRaised,
  cursor: 'pointer',
  color: colors.text,
}

// --- nav bar ---

export const navBar = {
  background: colors.navBg,
  borderBottom: `1px solid ${colors.border}`,
  padding: '0 1.5rem',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export function navLink(isActive) {
  return {
    color: isActive ? colors.text : colors.textMuted,
    background: isActive ? colors.surfaceRaised : 'transparent',
    border: isActive ? `1px solid ${colors.border}` : '1px solid transparent',
    textDecoration: 'none',
    fontSize: '13px',
    padding: '6px 10px',
    borderRadius: '4px',
  }
}

export const navLogo = {
  color: colors.text,
  fontWeight: 'bold',
  fontSize: '15px',
  textDecoration: 'none',
}

export const navLogoutBtn = {
  background: 'none',
  border: 'none',
  color: colors.textMuted,
  cursor: 'pointer',
  fontSize: '13px',
}

// --- buttons ---

export function btn(variant = 'primary') {
  const base = {
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: '1px solid transparent',
    textDecoration: 'none',
    display: 'inline-block',
    color: colors.text,
  }

  if (variant === 'primary') {
    return { ...base, background: colors.accentDark, color: '#fff', borderColor: colors.accent }
  }
  if (variant === 'success') {
    return { ...base, background: '#2d6b4a', color: '#fff', borderColor: colors.successBorder }
  }
  if (variant === 'danger') {
    return { ...base, background: '#8b3a3a', color: '#fff', borderColor: colors.dangerBorder }
  }
  if (variant === 'outline') {
    return { ...base, background: colors.surfaceRaised, borderColor: colors.borderBright }
  }
  if (variant === 'sm') {
    return {
      ...base,
      padding: '5px 10px',
      fontSize: '12px',
      background: colors.surfaceRaised,
      borderColor: colors.border,
    }
  }
  if (variant === 'smPrimary') {
    return { ...base, padding: '5px 10px', fontSize: '12px', background: colors.accentDark, color: '#fff' }
  }
  if (variant === 'smDanger') {
    return { ...base, padding: '5px 10px', fontSize: '12px', background: '#8b3a3a', color: '#fff' }
  }

  return { ...base, background: colors.accentDark, color: '#fff' }
}

// colored status pills (available, checked out, etc.)
export function badge(type) {
  const base = {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
  }

  if (type === 'available') {
    return { ...base, background: colors.successBg, color: colors.success, border: `1px solid ${colors.successBorder}` }
  }
  if (type === 'checked_out' || type === 'checkout') {
    return { ...base, background: colors.warningBg, color: colors.warning, border: `1px solid ${colors.warningBorder}` }
  }
  if (type === 'damaged') {
    return { ...base, background: colors.dangerBg, color: colors.danger, border: `1px solid ${colors.dangerBorder}` }
  }
  if (type === 'supervisor') {
    return { ...base, background: '#243045', color: colors.accent, border: `1px solid ${colors.borderBright}` }
  }
  if (type === 'employee') {
    return { ...base, background: colors.surfaceRaised, color: colors.textMuted, border: `1px solid ${colors.border}` }
  }
  if (type === 'return') {
    return { ...base, background: colors.successBg, color: colors.success, border: `1px solid ${colors.successBorder}` }
  }

  return { ...base, background: colors.surfaceRaised, color: colors.textMuted, border: `1px solid ${colors.border}` }
}

// green or red banner after form submit
export function alert(type) {
  const isSuccess = type === 'success'
  return {
    padding: '10px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    marginBottom: '1rem',
    border: `1px solid ${isSuccess ? colors.successBorder : colors.dangerBorder}`,
    borderLeft: `4px solid ${isSuccess ? colors.success : colors.danger}`,
    background: isSuccess ? colors.successBg : colors.dangerBg,
    color: isSuccess ? colors.success : colors.danger,
  }
}

// tabs on supervisor page
export function tabBtn(active) {
  return {
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    background: active ? colors.accentDark : 'transparent',
    color: active ? '#fff' : colors.textMuted,
    borderBottom: active ? `2px solid ${colors.accent}` : `2px solid ${colors.border}`,
  }
}

// modal popup (dark box on top of dimmed screen)
export const modalOverlay = {
  position: 'fixed',
  inset: 0,
  background: colors.overlay,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
}

export const modalBox = {
  background: colors.surface,
  border: `1px solid ${colors.borderBright}`,
  borderRadius: '8px',
  padding: '1.5rem',
  width: '100%',
  maxWidth: '420px',
  color: colors.text,
}

export const modalCloseBtn = {
  background: 'none',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  color: colors.textMuted,
}
