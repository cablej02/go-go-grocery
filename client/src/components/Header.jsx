import Navbar from './Navbar'

const styles ={
    backgroundImage:`url('/headerBanner.png')`,
    backgroundSize:'cover',
    backgroundPosition:'center',
    height:'150px',
    position:'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    zIndex: 1001, 
}

const Header = () => {
    return (
        <header 
            className="pt-1 bg-dark border-bottom d-flex flex-column align-items-end"
            style={styles}
        >
            <div className="container d-flex align-items-end justify-content-between">
                <h1
                    className='display-2 fw-normal text-light bg-dark border border-primary rounded-5 p-2'
                    style={{
                        textShadow:`-2px -2px var(--bs-primary), 2px -2px var(--bs-primary), -2px 2px var(--bs-primary), 1px 1px var(--bs-primary)`
                    }}
                >Go Go Grocery</h1>
                <Navbar />
            </div>
        </header>
    );
}

export default Header;