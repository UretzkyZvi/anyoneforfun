"use client";

import { Dialog } from "@headlessui/react";
import { motion, stagger, useAnimate } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import navigationItems from "~/lib/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface AnimationDefinition {
  selector: string;
  animate: Record<string, any>;
  transition?: Record<string, any>;
}

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const baseTransition = { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 };
    const menuAnimations: AnimationDefinition[][] = isOpen
      ? [
          [
            {
              selector: "nav",
              animate: { transform: "translateX(0%)" },
              transition: baseTransition,
            },
          ],
          [
            {
              selector: "li",
              animate: {
                transform: "scale(1)",
                opacity: 1,
                filter: "blur(0px)",
              },
              transition: { delay: 0.05, duration: 0.6 },
            },
          ],
        ]
      : [
          [
            {
              selector: "li",
              animate: {
                transform: "scale(0.5)",
                opacity: 0,
                filter: "blur(10px)",
              },
              transition: { delay: 0.05, duration: 0.6 },
            },
          ],
          [
            {
              selector: "nav",
              animate: { transform: "translateX(-100%)" },
              transition: baseTransition,
            },
          ],
        ];

    const iconAnimations: AnimationDefinition[] = [
      {
        selector: "path.top",
        animate: { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        transition: baseTransition,
      },
      {
        selector: "path.middle",
        animate: { opacity: isOpen ? 0 : 1 },
        transition: baseTransition,
      },
      {
        selector: "path.bottom",
        animate: {
          d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346",
        },
        transition: baseTransition,
      },
    ];

    // Flatten the menu and icon animations into a single array before calling animate
    animate(menuAnimations.flat().concat(iconAnimations) as any);
  }, [isOpen]);

  return scope;
}

const menuVariants = {
  open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
  closed: { x: "-100%", opacity: 0 },
};

const menuItemVariants = {
  open: { opacity: 1, transition: { delay: 0.2 } },
  closed: { opacity: 0 },
};

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const scope = useMenuAnimation(mobileMenuOpen);

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-zinc-800">
      <nav
        className="flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Anyone</span>
            <img className="h-8 w-auto" src="/logo_anyone.svg" alt="logo" />
          </a>
        </div>
        <div className="flex">
          <Button
            variant="default"
            className="border-primary ring-primary border-spacing-2 rounded-3xl border bg-white text-zinc-800 ring-2"
            onClick={()=>router.push('/')}
          >
            <Search className="h-6 w-6" />
            Find your home
          </Button>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden "
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel
          as={motion.div}
          initial="closed"
          animate={mobileMenuOpen ? "open" : "closed"}
          variants={menuVariants}
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-green-300 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div ref={scope} className="-my-6 divide-y divide-gray-500/10">
              <nav className="space-y-2 py-6">
                <motion.ul
                  initial="closed"
                  animate={mobileMenuOpen ? "open" : "closed"}
                >
                  {navigationItems.navigation.map((item) => (
                    <motion.li
                      key={item.name}
                      variants={menuItemVariants}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      <a href={item.href}>{item.name}</a>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
export default Header;
