import ItemSideBar from "../ItemSideBar/ItemSideBar";
import { IoBuild, IoHomeSharp, IoConstructSharp, IoPersonSharp, IoLogOutSharp, IoPeopleSharp } from "react-icons/io5";
import { useAuth } from '../../contexts/AuthContext'

const ListSideBar = (props) => {
  const {user, loading} = useAuth();

  return (
    <>
      <div className="flex flex-col justify-between h-11/12">
        <ul>
          <ItemSideBar isOpen={props.isOpen} tagItem={IoHomeSharp} nameItem="Home" route="/" />
          <ItemSideBar isOpen={props.isOpen} tagItem={IoPersonSharp} nameItem="Clientes" route="/clientes" />
          {user.TipoUsuario == 1 ? (<ItemSideBar isOpen={props.isOpen} tagItem={IoPeopleSharp} nameItem="Funcionários" route="/funcionarios" />) : ''}
          <ItemSideBar isOpen={props.isOpen} tagItem={IoConstructSharp} nameItem="Equipamentos" route="/equipamentos" />
          
          
          <ItemSideBar
            isOpen={props.isOpen}
            tagItem={IoBuild}
            nameItem="Manutenções Ativas"
            route="/manutencoes"
          />

        </ul>
        <ItemSideBar isOpen={props.isOpen} tagItem={IoLogOutSharp} nameItem="Sair" route="/login" />
      </div>
    </>
  );
};

export default ListSideBar;
