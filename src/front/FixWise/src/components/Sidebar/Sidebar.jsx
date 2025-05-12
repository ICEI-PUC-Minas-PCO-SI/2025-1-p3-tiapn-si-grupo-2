import './Sidebar.css'
import { ReactComponent as HomeIcon }  from '../../assets/home-outline.svg'
import { ReactComponent as ConstructIcon }  from '../../assets/construct-outline.svg'
import { ReactComponent as PeopleIcon }  from '../../assets/people-outline.svg'
import { ReactComponent as PersonIcon }  from '../../assets/person-outline.svg'


export default function Sidebar() {
    return (
        <nav className="sidebar">
            <ul className="side-nav">
                <li className="side-nav__item side-nav__item--active">
                    <a href="#" className="side-nav__link">
                        {/* <img src={homeIcon} alt="ícone casa" className="side-nav__icon" /> */}
                        <HomeIcon className="side-nav__icon"/>

                        <span>Início</span>
                    </a>
                </li>

                <li className="side-nav__item">
                    <a href="#" className="side-nav__link">
                        <PersonIcon className="side-nav__icon"/>

                        <span>Usuários</span>
                    </a>
                </li>

                <li className="side-nav__item">
                    <a href="#" className="side-nav__link">
                        <PeopleIcon className="side-nav__icon"/>

                        <span>Clientes</span>
                    </a>
                </li>

                <li className="side-nav__item">
                    <a href="#" className="side-nav__link">
                        <ConstructIcon className="side-nav__icon"/>

                        <span>Equipamentos</span>
                    </a>
                </li>
            </ul>

            <div className="legal">
                &copy; 2019 by Trillo. All rights reserved.
            </div>
        </nav>
    );
}