import React from "react";
import {
  Group,
  type GroupProps,
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import { DescriptionContext, DescriptionProvider, LabeledGroup } from "./field";
import {
  composeTailwindRenderProps,
  groupBoxStyle,
  groupControlFocusVisibleOutlineStyle,
} from "./utils";

export default {};
export function SwitchGroup({ className, ...props }: GroupProps) {
  return (
    <LabeledGroup>
      <Group
        {...props}
        className={composeTailwindRenderProps(className, groupBoxStyle)}
      />
    </LabeledGroup>
  );
}

export function Switches({
  className,
  ...props
}: React.JSX.IntrinsicElements["div"]) {
  return (
    <div
      data-ui="box"
      className={twMerge(
        "flex flex-col",
        // When any switch item has description, apply all `font-medium` to all switch item labels
        "[&_label]:has-[[data-ui=description]]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

export function SwitchField({
  className,
  ...props
}: React.JSX.IntrinsicElements["div"]) {
  return (
    <DescriptionProvider>
      <div
        {...props}
        data-ui="field"
        className={twMerge(
          "group flex flex-col gap-y-1",
          "[&_[data-ui=description]:not([class*=pe-])]:has-[label[data-position=left]]:pe-[calc(theme(width.8)+16px)]",
          "[&_[data-ui=description]:not([class*=ps-])]:has-[label[data-position=right]]:ps-[calc(theme(width.8)+12px)]",
          "[&_label]:has-[[data-ui=description]]:font-medium",
          "[&_[data-ui=description]]:has-[label[data-disabled]]:opacity-50",
          className,
        )}
      />
    </DescriptionProvider>
  );
}

type SwitchProps = {
  labelPosition?: "left" | "right";
} & AriaSwitchProps;

export function Switch({
  labelPosition = "right",
  children,
  ...props
}: SwitchProps) {
  const descriptionContext = React.useContext(DescriptionContext);

  return (
    <AriaSwitch
      {...props}
      aria-describedby={descriptionContext?.["aria-describedby"]}
      data-position={labelPosition}
      className={composeTailwindRenderProps(props.className, [
        "group/control flex items-center gap-x-3",
        "data-[position=left]:flex-row-reverse",
        "data-[position=left]:justify-between",
        "text-base/6 sm:text-sm/6",
        "disabled:opacity-50 cursor-pointer disabled:cursor-default read-only:cursor-default",
      ])}
    >
      {(renderProps) => (
        <>
          <div
            className={twMerge(
              "h-5 w-8 cursor-default rounded-full px-0.5 shadow-inner",
              "transition duration-200 ease-in-out",
              "flex shrink-0 items-center",
              "bg-zinc-200",
              "",
              "border",

              "group-selected/control:border-accent",
              "group-selected/control:",
              "group-selected/control:bg-accent",
              "group-selected/control:",
              "group-selected/control:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",

              "group-disabled/control:bg-gray-200",
              "group-disabled/control:",
              groupControlFocusVisibleOutlineStyle,
            )}
          >
            <span
              className={twMerge(
                "h-[0.95rem] w-[0.95rem] rounded-full bg-white shadow-sm",
                "translate-x-0 transform transition duration-200 ease-in-out",
                "border",
                "group-selected/control:border-accent",
                "group-selected/control:translate-x-[78%]",
                "group-selected/control:rtl:-translate-x-[78%]",
              )}
            />
          </div>
          {typeof children === "function" ? children(renderProps) : children}
        </>
      )}
    </AriaSwitch>
  );
}
