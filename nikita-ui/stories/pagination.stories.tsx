import type { Meta } from "@storybook/react";

import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "@/components/pagination.tsx";

import { docs } from "../.storybook/docs";

const meta: Meta = {
  title: "Components/Pagination",
  parameters: {
    layout: "centered",
    docs: {
      ...docs,
      controls: {
        exclude: /.*/gv,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

export function Example() {
  return (
    <Pagination>
      <PaginationPrevious href="?page=2" />
      <PaginationList>
        <PaginationPage href="?page=1">1</PaginationPage>
        <PaginationPage href="?page=2">2</PaginationPage>
        <PaginationPage href="?page=3" current>
          3
        </PaginationPage>
        <PaginationPage href="?page=4">4</PaginationPage>
        <PaginationGap />

        <PaginationPage href="?page=65">65</PaginationPage>
      </PaginationList>
      <PaginationNext href="?page=4" />
    </Pagination>
  );
}
