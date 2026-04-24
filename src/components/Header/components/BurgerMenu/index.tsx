import SvgIcon from "../../../../based/SvgIcon";

type BurgerMenuProps = {
  toggleMenu: () => void;
};

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ toggleMenu }) => {
  return (
    <button
      className="lg:hidden flex items-center justify-center p-2"
      onClick={toggleMenu}
      aria-label="Open menu"
    >
      <SvgIcon
        src={"/assets/svgs/burger-menu.svg"}
        ariaLabel="Open menu"
        width={20}
        height={20}
        className="size-[20px] shrink-0 text-[#F6EFE9]"
      />
    </button>
  );
};
