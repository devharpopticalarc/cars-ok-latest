export default function Car({ onViewDetailsClick, model, price, id, img }: { onViewDetailsClick: (id: string) => void, model: string, price: string, id: string, img: string }) {

  function Star() {
    return <svg height="22" width="20" style={{ marginRight: '0.3em' }} data-rating="5">
      <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" fill='red' />
    </svg>
  }
  return (
    <div style={{ margin: '1em', display: 'flex', flexDirection: 'column', width: 'max-content', boxShadow: '0 0 8px 1px rgb(150, 150, 150)' }}>
      {/* <img className='mb-1' src="https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/wp-content/uploads/2017/03/2018-Bugatti-Chiron-119.jpg?crop=1xw:1xh;center,center&resize=480:*" alt="Avatar" style={{ width: '100%', maxWidth: '15em' }} /> */}
      <div style={{ display: 'flex', height: '12em', width: '15em', alignItems: 'center', overflow: 'hidden' }}>
        <img src={img} alt="Avatar" style={{ width: '100%', maxWidth: '15em' }} />
      </div>
      <div style={{ padding: '0.5em' }}>
        <div style={{ marginBottom: '0.5em', fontSize: '1.5em', fontWeight: '700', overflow: 'hidden', width: '8em', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{model}</div>
        <div className='flex' style={{ marginBottom: '0.5em' }}>
          <Star />
          <Star />
          <Star />
        </div>
        <div style={{ fontWeight: '500', fontSize: '0.8em', color: 'rgb(0, 0, 0, 0.5)' }}>Price starting at</div>
        <div style={{ fontWeight: '700', marginBottom: '0.5em' }}>${price}</div>
        <button onClick={() => { onViewDetailsClick(id) }} style={{ cursor: 'pointer', backgroundColor: '#1383b3', padding: '0.3em', color: 'white', fontWeight: '700', border: '2px solid #1383b3' }} >View Details</button>
      </div>
    </div>

  );
}