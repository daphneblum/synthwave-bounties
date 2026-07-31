import './SearchBar.css';

export default function SearchBar({ value, onChange }) {
    return (
        <div className='search-bar'>
            <span className='search-prompt'>grep&gt;</span>
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder='Search bounty titles...'
                aria-label='Search posts by title'
            />
        </div>
    );
}