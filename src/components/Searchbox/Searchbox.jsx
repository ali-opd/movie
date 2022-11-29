import './searchBoxStyles.css';

export default function Searchbox({ onChange }) {
  return (
    <div className='py-4'>
      <input required type='text' className='searchbox' onChange={onChange} />
    </div>
  );
}
