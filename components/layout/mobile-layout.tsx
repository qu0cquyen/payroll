import { cn } from "#/utils/cn";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const MobileLayout = (
  props: Props & { spacingTop?: number; spacingBottom?: number }
) => {
  const {
    className,
    spacingTop = 0,
    spacingBottom = 0,
    children,
    ...rest
  } = props;

  return (
    <div
      {...rest}
      style={{
        marginTop: `${spacingTop}px`,
        marginBottom: `${spacingBottom}px`,
      }}
      className={cn(
        "overflow-hidden pt-safe-offset-[44px] pb-safe-or-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MobileLayout;

const Top = (props: Props) => {
  const { className, children, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "fixed left-0 right-0 top-0 z-40 bg-white pt-safe",
        className
      )}
    >
      {children}
    </div>
  );
};

const Content = (props: Props) => {
  const { className, children, ...rest } = props;
  return (
    <div {...rest} className={cn("p-4", className)}>
      {children}
    </div>
  );
};

const Bottom = (props: Props) => {
  const { className, children, ...rest } = props;
  return (
    <div
      {...rest}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-10 bg-white px-4 pt-4 pb-safe-or-4",
        className
      )}
    >
      {children}
    </div>
  );
};

MobileLayout.Top = Top;

MobileLayout.Content = Content;

MobileLayout.Bottom = Bottom;
