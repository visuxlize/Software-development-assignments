const s = {
  page: { maxWidth: '960px', margin: '0 auto', padding: '1.75rem 1.25rem' },
  h1: { fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' },
  sub: { fontSize: '13px', color: '#666', marginBottom: '1.5rem' },
  card: { background: '#fff', border: '1px solid #ddd', borderRadius: '6px', padding: '2rem', textAlign: 'center' },
  icon: { fontSize: '32px', marginBottom: '0.75rem' },
  title: { fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#1a1a1a' },
  msg: { fontSize: '13px', color: '#666', lineHeight: '1.6' },
}

export default function Materials() {
  return (
    <div style={s.page}>
      <h1 style={s.h1}>Materials</h1>
      <p style={s.sub}>Warehouse inventory and material requests.</p>
      <div style={s.card}>
        <div style={s.icon}>🔧</div>
        <div style={s.title}>Coming Soon</div>
        <p style={s.msg}>
          The Materials module is not in the current backend design.<br />
          Nicole will need to add a <strong>Material</strong> model to the backend before this page can work.
        </p>
      </div>
    </div>
  )
}
