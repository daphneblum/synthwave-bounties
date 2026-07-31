import './Sortcontrol.css';

const OPTIONS = [
    { value: 'newest', label: 'NEWEST' },
    { value: 'top', label: 'TOP VOTED' },
];

export default function SortControl({ value, onChange }) {
    return (
        <div className='sort-control' role='group' aria-label='Sort posts'>
            <span className='sort-label'>sort://</span>
            {OPTIONS.map((opt) => (
                <button
                    key={opt.value}
                    className={`sort-option ${value === opt.value ? 'active' : ''}`}
                    onClick={() => onChange(opt.value)}    
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}