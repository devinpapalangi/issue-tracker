import React from "react";
import { default as ReactSkeleton } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  count?: number;
  width?: string;
  height?: string;
}
const Skeleton = (props: Props) => {
  return <ReactSkeleton {...props} />;
};

export default Skeleton;
