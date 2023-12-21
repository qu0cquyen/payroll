import { cn } from "#/utils/cn";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const AppBar = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <div
      {...rest}
      className={cn(
        "border-neutral-darkest/10 h-[44px] border-b px-4 py-1",
        className
      )}
    >
      <div className={"relative top-0 flex h-full items-center justify-center"}>
        {children}
      </div>
    </div>
  );
};

const Center = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <div
      {...rest}
      className={cn(
        "line-clamp-1 w-[calc(100%-92px)] text-center text-lg font-bold",
        className
      )}
    >
      {children}
    </div>
  );
};

const Left = (props: Props & { href?: string }) => {
  const { children, className, ...rest } = props;

  let value: React.ReactNode = <ArrowLeftIcon />;

  if (children) {
    value = children;
  }

  if (props.href) {
    value = (
      <Link className={"active:opacity-50"} href={{ pathname: props.href }}>
        <ArrowLeftIcon
          width={24}
          height={24}
          className={"text-neutral-darkest hover:cursor-pointer"}
        />
      </Link>
    );
  }

  return (
    <div
      {...rest}
      className={cn(
        "center absolute bottom-0 left-0 top-1.5 h-6 focus:outline-none focus:ring-2 focus:ring-offset-2 active:opacity-50",
        className
      )}
    >
      {value}
    </div>
  );
};

const Right = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <div
      {...rest}
      className={cn(
        "center absolute bottom-0 right-0 top-0 cursor-pointer font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 active:opacity-50",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AppBar;

AppBar.Left = Left;
AppBar.Center = Center;
AppBar.Right = Right;
