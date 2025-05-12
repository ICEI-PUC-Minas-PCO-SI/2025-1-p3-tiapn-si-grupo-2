import './UserNav.css'
import defaultUserPicture from '../../assets/person-circle-outline.svg'

export default function UserNav({userName, userPic}) {
    return (
        <nav className="user-nav">
            {/* <div className="user-nav__icon-box">
                <svg className="user-nav__icon">
                    <use xlink:href="img/sprite.svg#icon-bookmark"></use>
                </svg> 
                <span className="user-nav__notification">7</span>
            </div> */}

            {/* <div className="user-nav__icon-box">
                <svg className="user-nav__icon">
                    <use xlink:href="img/sprite.svg#icon-chat"></use>
                </svg> 

                <span className="user-nav__notification">13</span>
            </div> */}

            <div className="user-nav__user">
                <img src={userPic ? userPic : defaultUserPicture} alt="User photo" className="user-nav__user-photo" />

                <span className="user-nav__user-name">{userName}</span>
            </div>
        </nav>
    )
}