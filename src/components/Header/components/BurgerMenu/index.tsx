import SvgIcon from "../../../../based/SvgIcon";

type BurgerMenuProps = {
  toggleMenu: () => void;
};

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ toggleMenu }) => {
  return (
    <button
      className="lg:hidden flex flex-col gap-1.5 p-2"
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      <SvgIcon
        src={"/assets/svgs/burger-menu.svg"}
        ariaLabel="text"
        width={20}
        height={20}
        className="size-[20px] shrink-0 "
      />
    </button>
  );
};
