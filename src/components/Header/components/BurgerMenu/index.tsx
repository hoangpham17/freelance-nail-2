import SvgIcon from "../../../../based/SvgIcon";

type BurgerMenuProps = {
  toggleMenu: () => void;
  isMenuOpen: boolean;
};

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ toggleMenu, isMenuOpen }) => {
  return (
    <button
      className="lg:hidden flex items-center justify-center p-2"
      onClick={toggleMenu}
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    >
      {isMenuOpen ? (
        <SvgIcon
          src={"/assets/svgs/x-close.svg"}
          ariaLabel="Close menu"
          width={20}
          height={20}
          className="size-[20px] shrink-0"
        />
      ) : (
        <SvgIcon
          src={"/assets/svgs/burger-menu.svg"}
          ariaLabel="Open menu"
          width={20}
          height={20}
          className="size-[20px] shrink-0"
        />
      )}
    </button>
  );
};
