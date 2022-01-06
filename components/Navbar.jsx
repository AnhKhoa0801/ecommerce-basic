import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import workflow from "public/workflow.svg";
import Link from "next/link";

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex my-3 gap-3 items-center">
        <div className="ml-4 flex lg:ml-3">
          <Image className="h-8 w-auto" src={workflow} alt="workflow" />
        </div>

        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>

        <div>
          <Link href="/product">
            <a>Product</a>
          </Link>
        </div>

        <div>
          <Link href="/order">
            <a>Order page</a>
          </Link>
        </div>

        <div className="ml-auto flex items-right mr-5">
          {/* Cart */}
          <div className="ml-4 flow-root lg:ml-6">
            <Link href="/cart">
              <a className="group -m-2 p-2 flex items-center">
                <ShoppingBagIcon
                  className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  0
                </span>
              </a>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
