import cart from "../../../assets/plataforma/icons/icon-cart.svg";
import profile from "../../../assets/plataforma/icons/icon-profile.svg";
import logoutIcon from "../../../assets/plataforma/icons/icon-logout.svg";
import local from "../../../assets/plataforma/icons/icon-local.svg";
import arrow from "../../../assets/plataforma/icons/icon-arrow.svg";
import config from "../../../assets/plataforma/icons/icon-config.svg";
import cartAddProduto from "../../../assets/plataforma/icons/icon-cart-add.svg";
import buyuLogoAmarelo from "../../../assets/plataforma/logos/logotipo-amarelo.svg";
import InputPesquisa from "./InputPesquisa";
import SideBar from "../../../components/SideBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ onClick, endereco, fecharCarrinho }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const nomeUsuario = sessionStorage.getItem("nomeUsuario");
  const [totalCalculado, setTotal] = useState(0);
  const [showSideBar, setShowSideBar] = useState(false);

  const [carrinhoItens, setCarrinhoItens] = useState(
    JSON.parse(sessionStorage.getItem("carrinho")) || []
  );

  const calcularTotal = () => {
    const totalCalculado = carrinhoItens.reduce(
      (acc, item) => acc + item.valorUnitario,
      0
    );
    setTotal(totalCalculado);
  };


  const navigate = useNavigate();

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  const abrirMenu = () => {
    setMenuAberto(true);
  };
  
  const abrirMenuCarrinho = () => {
    setShowSideBar(true);
  };

  const fecharMenuCarrinho = () => {
    setShowSideBar(false);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("idUsuario");
    sessionStorage.removeItem("nomeUsuario");
    sessionStorage.removeItem("shoppingsProximo");
    sessionStorage.removeItem("endereco");
    navigate("/acesso");
  };

  useEffect(() => {
    calcularTotal();
  }, [carrinhoItens]);

  return (
    <>
      <header className="bg-secundary z-50 text-white shadow-md w-full fixed top-0 p-4">
        <div className="container mx-auto flex items-center">
          <div
            onClick={() => navigate("/inicio")}
            className="text-2xl uppercase cursor-pointer font-bold"
          >
            <img className="w-32" src={buyuLogoAmarelo} alt="" />
          </div>
          <div className="flex items-center mx-auto gap-5">
            <div className="flex gap-1">
              <img src={local} alt="" />
              <p className="cursor-pointer underline" onClick={onClick}>
                {endereco ? endereco : "Digitar minha localização"}
              </p>
            </div>
            <InputPesquisa
              bgColor={"#F7F7F7"}
              backgroundColor="#F7F7F7"
              width={"40vw"}
              height={"30px"}
              placeholder={"Pesquise por item ou loja"}
            />
            <div
              onClick={menuAberto ? fecharMenu : abrirMenu}
              className="flex justify-center items-center gap-2 cursor-pointer bg-secundary p-2"
            >
              <img src={profile} alt="" />
              <p>{nomeUsuario}</p>
              <img src={arrow} className="size-3" alt="" />
              {menuAberto && (
                <div className="absolute mt-36 text-secundary bg-white rounded shadow-md">
                  <div
                    onClick={() => navigate("/perfil")}
                    className="p-2 gap-2 flex items-center"
                  >
                    <img className="size-4" src={config} alt="" />
                    <p>Configurações</p>
                  </div>
                  <div onClick={logout} className="p-2 gap-2 flex items-center">
                    <img className="size-6" src={logoutIcon} alt="" />
                    <p>Sair</p>
                  </div>
                </div>
              )}
            </div>
            <div onClick={showSideBar ? fecharMenuCarrinho : abrirMenuCarrinho} className={`flex gap-5 cursor-pointer w-28 rounded-3xl justify-center p-2 ${carrinhoItens.length > 0 ? "bg-primary" : ""}`}>
              {carrinhoItens.length > 0 ? (
                <>
                  <div  className="flex gap-2">
                    <img
                      src={cartAddProduto}
                      alt=""
                      className="w-6"
                    />
                    <div>
                      <p className="text-xs">{totalCalculado.toFixed(2)}</p>
                      <p className="text-xs">{carrinhoItens.length} itens</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div  className="flex gap-2 cursor-pointer">
                    <img
                      src={cart}
                      alt=""
                      className="w-6"
                    />
                    <div>
                      <p className="text-xs">R$ 0,00</p>
                      <p className="text-xs">0 itens</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <div >
      {showSideBar && (
          <div className="flex justify-end">
            <SideBar fecharCarrinho={fecharMenuCarrinho} show={showSideBar} />
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
