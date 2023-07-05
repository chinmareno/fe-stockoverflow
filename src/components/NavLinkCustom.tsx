import { styled } from "@stitches/react";
import * as Dialog from "@radix-ui/react-dialog";
import { NavLink, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import TooltipCustom from "./TooltipCustom";
import useIsAccountOpenStore from "@/store/useIsAccountOpenStore";

const NavLinkCustom = ({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) => {
  const { pathname } = useLocation();
  const { setIsProfileOpen } = useIsAccountOpenStore();
  return (
    <TooltipCustom tooltip={to}>
      <NavLink
        onClick={() => {
          setIsProfileOpen(false);
        }}
        className={
          pathname === `/items/${to}`
            ? "scale-110"
            : " opacity-50 hover:scale-110"
        }
        to={to}
      >
        <Dialog.Root>
          <Trigger>
            <TriggerShadow />
            <TriggerEdge />
            <TriggerLabel>{children}</TriggerLabel>
          </Trigger>
          <Dialog.Portal forceMount></Dialog.Portal>
        </Dialog.Root>
      </NavLink>
    </TooltipCustom>
  );
};

const TriggerPart = styled("span", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: 8,
});

const TriggerShadow = styled(TriggerPart, {
  background: "hsl(0deg 0% 0% / 0.1)",
  transform: "translateY(2px)",
  transition: "transform 250ms ease-out",
});

const TriggerEdge = styled(TriggerPart, {
  background: `linear-gradient(
      to left,
      hsl(0deg 0% 69%) 0%,
      hsl(0deg 0% 85%) 8%,
      hsl(0deg 0% 85%) 92%,
      hsl(0deg 0% 69%) 100%
    )`,
});

const TriggerLabel = styled("span", {
  display: "block",
  position: "relative",
  borderRadius: 8,
  color: "#569AFF",
  fontSize: "14px",
  padding: "16px 24px",
  background: "#fafafa",
  transform: "translateY(-4px)",
  width: "100%",
  userSelect: "none",
  transition: "transform 250ms ease-out",
});

const Trigger = styled(Dialog.Trigger, {
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
  background: "transparent",
  position: "relative",
  padding: 0,
  transition: "filter 250ms ease-out",

  "&:hover": {
    filter: "brightness(110%)",

    [`& ${TriggerLabel}`]: {
      transform: "translateY(-6px)",
    },

    [`& ${TriggerShadow}`]: {
      transform: "translateY(4px)",
    },
  },

  "&:active": {
    [`& ${TriggerLabel}`]: {
      transform: "translateY(-2px)",
      transition: "transform 34ms",
    },

    [`& ${TriggerShadow}`]: {
      transform: "translateY(1px)",
      transition: "transform 34ms",
    },
  },
});

export default NavLinkCustom;
