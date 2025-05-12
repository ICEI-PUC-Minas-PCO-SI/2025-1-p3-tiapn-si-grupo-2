import './Header.css'
import Input from '../Input/Input.jsx'
import UserNav from '../UserNav/UserNav.jsx';
import { ReactComponent as SearchIcon } from '../../assets/search-outline.svg'
import { ReactComponent as Logo } from '../../assets/logo.svg'

export default function Header(){
    return (
        <>
            <header className="header">
                <Logo className="logo" />
                {/* <img src="img/logo.png" alt="trillo logo" className="logo" /> */}

                <form action="#" className="search">
                    <Input placeholderText="Search hotels"/>

                    <button className="search__button">
                        <SearchIcon className="search__icon" />
                    </button>
                </form>

                <UserNav userName="Daniel"/>
            </header>
        </>
    );
}