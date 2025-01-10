import Navbar from './Navbar'

const Header = () => {
    return (
        <header 
            className="pt-1 bg-dark border-bottom"
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1001 }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                <h1 className='display-5 fw-normal'>Go Go Grocery</h1>
                <Navbar />
            </div>
        </header>
    );
}

export default Header;